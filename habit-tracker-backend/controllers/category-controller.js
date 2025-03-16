import initKnex from "knex";
import configuration from "../knexfile.js";
import dotenv from "dotenv";

const knex = initKnex(configuration);

dotenv.config();

/**
 * @desc Get all available categories (for dropdown)
 * @route GET /api/categories
 * @access Public
 */
export const getAllCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await knex("category").select(
      "id",
      "name",
      "description"
    );

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
