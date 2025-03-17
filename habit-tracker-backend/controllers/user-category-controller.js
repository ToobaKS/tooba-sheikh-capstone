import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

/**
 * Get all categories assigned to the logged-in user.
 */
export const getUserCategories = async (req, res) => {
  const user_id = req.user.id;

  try {
    const userCategories = await knex("user_categories")
      .join("category", "user_categories.category_id", "category.id")
      .where("user_categories.user_id", user_id)
      .select(
        "category.id",
        "category.name",
        "category.description",
        "user_categories.plant_phase",
        "user_categories.watering_count"
      );

    res.status(200).json(userCategories);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching user categories",
      details: error.message,
    });
  }
};

/**
 * Assign a user to a category.
 */
export const createUserCategory = async (req, res) => {
  const user_id = req.user.id;
  const { category_name } = req.body;

  try {
    // Find the category ID by name
    const category = await knex("category")
      .whereRaw("LOWER(name) = LOWER(?)", [category_name])
      .first();

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    // Check if the user is already in this category
    const existingEntry = await knex("user_categories")
      .where({ user_id, category_id: category.id })
      .first();

    if (existingEntry) {
      return res
        .status(400)
        .json({ error: "User is already in this category." });
    }

    // Insert new user-category entry
    await knex("user_categories").insert({
      user_id,
      category_id: category.id,
      plant_phase: 1, // Start at phase 1
      watering_count: 0,
    });

    res.status(201).json({ message: "Category added successfully." });
  } catch (error) {
    res.status(500).json({
      error: "Error adding user category",
      details: error.message,
    });
  }
};

/**
 * Remove a category from a user.
 */
export const deleteUserCategory = async (req, res) => {
  const user_id = req.user.id;
  const { category_name } = req.body;

  try {
    // Find the category ID by name
    const category = await knex("category")
      .whereRaw("LOWER(name) = LOWER(?)", [category_name])
      .first();

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    // Check if the user is in this category
    const existingEntry = await knex("user_categories")
      .where({ user_id, category_id: category.id })
      .first();

    if (!existingEntry) {
      return res.status(400).json({ error: "User is not in this category." });
    }

    // Delete the user-category entry
    await knex("user_categories")
      .where({ user_id, category_id: category.id })
      .del();

    res.status(200).json({ message: "Category removed successfully." });
  } catch (error) {
    res.status(500).json({
      error: "Error removing user category",
      details: error.message,
    });
  }
};
