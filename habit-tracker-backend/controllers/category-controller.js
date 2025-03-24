import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

/**
 * Get all categories
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await knex("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching categories",
      details: error.message,
    });
  }
};

/**
 * Get category by name
 */
export const getCategoryByName = async (req, res) => {
  const { category_name } = req.params;

  try {
    const category = await knex("category")
      .whereRaw("LOWER(name) = LOWER(?)", [category_name])
      .first();

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching category",
      details: error.message,
    });
  }
};
