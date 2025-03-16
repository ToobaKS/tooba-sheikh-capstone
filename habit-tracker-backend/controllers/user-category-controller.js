import initKnex from "knex";
import configuration from "../knexfile.js";
import dotenv from "dotenv";

const knex = initKnex(configuration);

dotenv.config();

/**
 * @desc Create a new category for the logged-in user
 * @route POST /api/user-categories
 * @access Protected (JWT Required)
 */
export const createUserCategory = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from JWT
    const { category_name } = req.body; // Get category name from request

    if (!category_name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Find the category by name
    const category = await knex("category")
      .where({ name: category_name })
      .first();
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Insert into user_categories
    const [userCategory] = await knex("user_categories")
      .insert({ user_id: userId, category_id: category.id })
      .returning("*");

    res.status(201).json({ message: "Category added to user", userCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Delete a category from the user's list
 * @route DELETE /api/user-categories/:id
 * @access Protected (JWT Required)
 */
export const deleteUserCategory = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from JWT
    const { category_name } = req.body; // Get category name from request

    if (!category_name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Find the category by name
    const category = await knex("category")
      .where({ name: category_name })
      .first();
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if user has this category
    const userCategory = await knex("user_categories")
      .where({ user_id: userId, category_id: category.id })
      .first();

    if (!userCategory) {
      return res.status(404).json({ message: "Category not found for user" });
    }

    // Delete from user_categories
    await knex("user_categories")
      .where({ user_id: userId, category_id: category.id })
      .del();

    res.json({ message: "Category removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
