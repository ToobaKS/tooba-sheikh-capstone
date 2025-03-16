import initKnex from "knex";
import configuration from "../knexfile.js";
import dotenv from "dotenv";

const knex = initKnex(configuration);

dotenv.config();

/**
 * @desc Get all plants (for dropdown or category linking)
 * @route GET /api/plants
 * @access Public
 */
export const getAllPlants = async (req, res) => {
  try {
    const plants = await knex("plants").select("id", "name", "image");

    res.json(plants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Get all phases of a specific plant
 * @route GET /api/plants/:id/phases
 * @access Public
 */
export const getPlantPhases = async (req, res) => {
  try {
    const { id } = req.params; // Plant ID from URL

    // Check if plant exists
    const plant = await knex("plants").where({ id }).first();
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Fetch all growth phases for this plant
    const phases = await knex("plant_phases")
      .where({ plant_id: id })
      .select("id", "phase_number", "image");

    res.json({ plant, phases });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Get the current phase of a plant for a user's category (by category name)
 * @route GET /api/plants/user-category/name/:category_name
 * @access Protected (JWT Required)
 */
export const getUserPlantPhaseByCategoryName = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Extract user ID from JWT
    const { category_name } = req.params; // ✅ Get category name from request

    // Find the category by name
    const category = await knex("category")
      .where({ name: category_name })
      .select("id", "plant_id")
      .first();

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Get user's category entry (including plant_phase)
    const userCategory = await knex("user_categories")
      .where({ user_id: userId, category_id: category.id })
      .select("plant_phase")
      .first();

    if (!userCategory) {
      return res.status(404).json({ message: "Category not assigned to user" });
    }

    // Get the plant name
    const plant = await knex("plants")
      .where({ id: category.plant_id })
      .select("id", "name")
      .first();

    if (!plant) {
      return res
        .status(404)
        .json({ message: "Plant not found for this category" });
    }

    // Get the plant phase based on stored `plant_phase`
    const plantPhase = await knex("plant_phases")
      .where({
        plant_id: plant.id,
        phase_number: userCategory.plant_phase, // ✅ Use stored plant phase
      })
      .first();

    if (!plantPhase) {
      return res.json({
        plant_name: plant.name,
        phase: null,
        message: "No valid phase found",
      });
    }

    res.json({
      plant_name: plant.name,
      phase: plantPhase.phase_number,
      image: plantPhase.image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
