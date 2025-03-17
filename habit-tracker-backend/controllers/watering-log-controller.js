import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

/**
 * Log watering for a category's plant if completion threshold is met.
 */
export const logWatering = async (req, res) => {
  const user_id = req.user.id;
  const { category_id } = req.params;

  try {
    // Check if the user is eligible to water today
    const progress = await knex("habit_log")
      .join("habits", "habit_log.habit_id", "habits.id")
      .where("habits.user_category_id", category_id)
      .whereRaw("DATE(habit_log.logged_at) = CURDATE()")
      .count("habit_log.id as completed_habits")
      .first();

    const totalHabits = await knex("habits")
      .where({ user_category_id: category_id })
      .count("id as count")
      .first();

    const completionRate =
      totalHabits.count > 0
        ? (progress.completed_habits / totalHabits.count) * 100
        : 0;

    if (completionRate < 60) {
      return res
        .status(400)
        .json({ error: "Not enough progress to water today." });
    }

    // Check if already watered today
    const today = new Date().toISOString().split("T")[0];
    const existingWaterLog = await knex("watering_log")
      .where({ user_category_id: category_id, user_id })
      .whereRaw("DATE(watered_at) = ?", [today])
      .first();

    if (existingWaterLog) {
      return res.status(400).json({ error: "Already watered today." });
    }

    // Log watering
    const [log_id] = await knex("watering_log").insert({
      user_category_id: category_id,
      user_id,
      watered_at: knex.fn.now(),
    });

    const newLog = await knex("watering_log").where({ id: log_id }).first();
    res.status(201).json(newLog);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error logging watering", details: error.message });
  }
};

/**
 * Get watering streak for a category.
 */
export const getWateringStreak = async (req, res) => {
  const user_id = req.user.id;
  const { category_id } = req.params;

  try {
    const wateringStreak = await knex("watering_log")
      .where({ user_category_id: category_id, user_id })
      .count("id as streak")
      .first();

    res.status(200).json({ wateringStreak: wateringStreak.streak });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error fetching watering streak",
        details: error.message,
      });
  }
};
