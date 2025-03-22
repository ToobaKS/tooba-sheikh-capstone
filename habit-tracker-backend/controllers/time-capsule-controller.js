import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

/**
 * Create a new time capsule entry (Protected Route)
 */
const createTimeCapsule = async (req, res) => {
  const { title, message, unlock_date } = req.body;
  const user_id = req.user.id;

  if (!message || !unlock_date) {
    return res
      .status(400)
      .json({ error: "Message and unlock date are required." });
  }

  try {
    const [id] = await knex("time_capsule").insert({
      user_id,
      title,
      message,
      unlock_date,
    });

    const newTimeCapsule = await knex("time_capsule").where({ id }).first();
    res.status(201).json(newTimeCapsule);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating time capsule", details: error.message });
  }
};

/**
 * Get all time capsules for the logged-in user (Protected Route)
 */
const getUserTimeCapsules = async (req, res) => {
  const user_id = req.user.id; 

  try {
    const timeCapsules = await knex("time_capsule")
      .where({ user_id })
      .orderBy("unlock_date", "asc");
    res.status(200).json(timeCapsules);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching time capsules", details: error.message });
  }
};

/**
 * Get a specific time capsule by ID (Protected Route)
 */
const getTimeCapsuleById = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;

  try {
    const timeCapsule = await knex("time_capsule")
      .where({ id, user_id })
      .first();

    if (!timeCapsule) {
      return res
        .status(404)
        .json({ error: "Time capsule not found or does not belong to you." });
    }

    const now = new Date();
    const unlockDate = new Date(timeCapsule.unlock_date);

    if (now < unlockDate) {
      return res.status(403).json({ error: "Time capsule is still locked." });
    }

    res.status(200).json(timeCapsule);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving time capsule", details: error.message });
  }
};

/**
 * Delete a time capsule by ID (Protected Route)
 */
const deleteTimeCapsule = async (req, res) => {
  const user_id = req.user.id; // Extract user ID from JWT token
  const { id } = req.params;

  try {
    const timeCapsule = await knex("time_capsule")
      .where({ id, user_id })
      .first();

    if (!timeCapsule) {
      return res
        .status(404)
        .json({ error: "Time capsule not found or does not belong to you." });
    }

    await knex("time_capsule").where({ id }).del();
    res.status(200).json({ message: "Time capsule deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting time capsule", details: error.message });
  }
};

export { createTimeCapsule, getUserTimeCapsules, getTimeCapsuleById, deleteTimeCapsule};