import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

/**
 * Get all plant types.
 */
export const getAllPlants = async (req, res) => {
  try {
    const plants = await knex("plants").select("*");
    res.status(200).json(plants);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching plants", details: error.message });
  }
};

/**
 * Get all phases for a specific plant.
 */
export const getPlantPhases = async (req, res) => {
  const { id } = req.params;

  try {
    const phases = await knex("plant_phases")
      .where({ plant_id: id })
      .orderBy("phase");

    if (!phases.length) {
      return res.status(404).json({ error: "No phases found for this plant" });
    }

    res.status(200).json(phases);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching plant phases", details: error.message });
  }
};

/**
 * Get current plant phase for a category.
 */
export const getCurrentPlantPhase = async (req, res) => {
  const user_id = req.user.id;
  const { category_id } = req.params;

  try {
    const userCategory = await knex("user_categories")
      .join("categories", "user_categories.category_id", "categories.id")
      .join("plants", "categories.plant_id", "plants.id")
      .where("user_categories.id", category_id)
      .where("user_categories.user_id", user_id)
      .select(
        "user_categories.plant_phase",
        "plants.name as plant_name",
        "categories.name as category_name"
      )
      .first();

    if (!userCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(userCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching plant phase", details: error.message });
  }
};

/**
 * Upgrade plant phase if watering streak is enough.
 */
export const upgradePlantPhase = async (req, res) => {
  const user_id = req.user.id;
  const { category_id } = req.params;

  try {
    // Get user’s current plant phase
    const userCategory = await knex("user_categories")
      .join("categories", "user_categories.category_id", "categories.id")
      .where("user_categories.id", category_id)
      .where("user_categories.user_id", user_id)
      .select("user_categories.plant_phase", "categories.plant_id")
      .first();

    if (!userCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    // Count watering streak
    const wateringStreak = await knex("watering_log")
      .where({ user_category_id: category_id, user_id })
      .count("id as streak")
      .first();

    if (wateringStreak.streak < 5) {
      // Example threshold for upgrade
      return res
        .status(400)
        .json({ error: "Not enough watering days to upgrade phase." });
    }

    // Get next phase of plant
    const nextPhase = await knex("plant_phases")
      .where("plant_id", userCategory.plant_id)
      .where("phase_number", ">", userCategory.plant_phase)
      .orderBy("phase_number", "asc")
      .first();

    if (!nextPhase) {
      return res
        .status(400)
        .json({ message: "Plant has already fully grown!" });
    }

    // Upgrade plant phase in user_categories
    await knex("user_categories")
      .where({ id: category_id, user_id })
      .update({ plant_phase: nextPhase.phase_number });

    res.status(200).json({
      message: "Plant has evolved!",
      newPhase: nextPhase.phase_number,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error upgrading plant phase", details: error.message });
  }
};
