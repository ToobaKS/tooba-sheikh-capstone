import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

/**
 * Log habit completion for today.
 */
export const logHabitCompletion = async (req, res) => {
  const user_id = req.user.id;
  const { habit_id } = req.params;

  try {
    // Ensure the habit exists and belongs to the user
    const habit = await knex("habits")
      .join("user_categories", "habits.user_category_id", "user_categories.id")
      .where("habits.id", habit_id)
      .where("user_categories.user_id", user_id)
      .first();

    if (!habit) {
      return res.status(404).json({ error: "Habit not found." });
    }

    const today = new Date().toISOString().split("T")[0];

    // Check if this habit was already logged today
    const existingLog = await knex("habit_log")
      .where({ habit_id })
      .whereRaw("DATE(logged_at) = ?", [today])
      .first();

    if (existingLog) {
      return res.status(400).json({ error: "Habit already logged today." });
    }

    // Insert new log
    const [log_id] = await knex("habit_log").insert({
      habit_id,
      logged_at: knex.fn.now(),
    });

    const newLog = await knex("habit_log").where({ id: log_id }).first();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({
      error: "Error logging habit completion",
      details: error.message,
    });
  }
};

/**
 * Get a user's habit logs.
 */
export const getHabitLogs = async (req, res) => {
  const user_id = req.user.id;

  try {
    const habitLogs = await knex("habit_log")
      .join("habits", "habit_log.habit_id", "habits.id")
      .join("user_categories", "habits.user_category_id", "user_categories.id")
      .where("user_categories.user_id", user_id)
      .select("habit_log.*", "habits.name as habit_name")
      .orderBy("logged_at", "desc");

    res.status(200).json(habitLogs);
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving habit logs",
      details: error.message,
    });
  }
};

/**
 * Get habit logs for a specific week.
 * Allows users to fetch past weeks by sending a `weekOffset` query param.
 */
export const getHabitLogsByWeek = async (req, res) => {
  const user_id = req.user.id;
  const weekOffset = parseInt(req.query.weekOffset) || 0; // Default to current week

  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (6 + weekOffset * 7)); // Move back `weekOffset` weeks
    startDate.setHours(0, 0, 0, 0); // Start of the day

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // 7-day range
    endDate.setHours(23, 59, 59, 999); // End of the day

    const habitLogs = await knex("habit_log")
      .join("habits", "habit_log.habit_id", "habits.id")
      .join("user_categories", "habits.user_category_id", "user_categories.id")
      .where("user_categories.user_id", user_id)
      .whereBetween("habit_log.logged_at", [startDate, endDate])
      .select(
        "habit_log.logged_at",
        "habit_log.habit_id",
        "habits.name as habit_name",
        "user_categories.category_id"
      )
      .orderBy("habit_log.logged_at", "asc");

    res.status(200).json(habitLogs);
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving habit logs for the week",
      details: error.message,
    });
  }
};
