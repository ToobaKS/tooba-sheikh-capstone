import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

/**
 * Get all habits for a specific user-category.
 */
export const getHabitsByCategory = async (req, res) => {
  const user_id = req.user.id;
  const { category_name } = req.params;

  try {
    // Find the category ID from name
    const category = await knex("category")
      .whereRaw("LOWER(name) = LOWER(?)", [category_name])
      .first();

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    // Find the user's category entry
    const userCategory = await knex("user_categories")
      .where({ user_id, category_id: category.id })
      .first();

    if (!userCategory) {
      return res.status(400).json({ error: "User is not in this category." });
    }

    // Retrieve all habits tied to this category for the user
    const habits = await knex("habits").where({
      user_category_id: userCategory.id,
    });

    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving habits",
      details: error.message,
    });
  }
};

/**
 * Create a new habit for a category.
 */
export const createHabit = async (req, res) => {
  const user_id = req.user.id;
  const { user_category_id, habit_name, description } = req.body;

  try {
    if (!habit_name || !user_category_id) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const [habit_id] = await knex("habits").insert({
      user_category_id,
      name: habit_name,
      description,
    });

    const newHabit = await knex("habits").where({ id: habit_id }).first();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({
      error: "Error creating habit",
      details: error.message,
    });
  }
};

/**
 * Delete a habit.
 */
export const deleteHabit = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;

  try {
    // Find the habit
    const habit = await knex("habits").where({ id }).first();

    if (!habit) {
      return res.status(404).json({ error: "Habit not found." });
    }

    // Check if user owns this habit
    const userCategory = await knex("user_categories")
      .where({ id: habit.user_category_id, user_id })
      .first();

    if (!userCategory) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this habit." });
    }

    await knex("habits").where({ id }).del();
    res.status(200).json({ message: "Habit deleted successfully." });
  } catch (error) {
    res.status(500).json({
      error: "Error deleting habit",
      details: error.message,
    });
  }
};

/**
 * Update a habit (name or description).
 */
export const updateHabit = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Find the habit
    const habit = await knex("habits").where({ id }).first();

    if (!habit) {
      return res.status(404).json({ error: "Habit not found." });
    }

    // Ensure the user owns this habit
    const userCategory = await knex("user_categories")
      .where({ id: habit.user_category_id, user_id })
      .first();

    if (!userCategory) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this habit." });
    }

    // Update habit fields
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (description) updatedFields.description = description;

    if (Object.keys(updatedFields).length === 0) {
      return res
        .status(400)
        .json({ error: "No valid fields provided for update." });
    }

    await knex("habits").where({ id }).update(updatedFields);

    const updatedHabit = await knex("habits").where({ id }).first();
    res.status(200).json(updatedHabit);
  } catch (error) {
    res.status(500).json({
      error: "Error updating habit",
      details: error.message,
    });
  }
};
