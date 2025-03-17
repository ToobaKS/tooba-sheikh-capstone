/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("watering_log").del();
  await knex("watering_log").insert([
    // 🌿 User 1 (Tooba) - Watering Fitness Plant (Bamboo)
    {
      id: 1,
      user_id: 1,
      category_id: 1,
      type: "water",
      timestamp: "2025-03-15 08:00:00",
    },
    {
      id: 2,
      user_id: 1,
      category_id: 1,
      type: "sunlight",
      timestamp: "2025-03-16 09:30:00",
    },

    // 🌱 User 1 (Tooba) - Watering Productivity Plant (Bonsai)
    {
      id: 3,
      user_id: 1,
      category_id: 2,
      type: "water",
      timestamp: "2025-03-15 10:00:00",
    },
    {
      id: 4,
      user_id: 1,
      category_id: 2,
      type: "fertilizer",
      timestamp: "2025-03-17 12:00:00",
    },

    // 💰 User 2 (John) - Watering Finance Plant (Money Tree)
    {
      id: 5,
      user_id: 2,
      category_id: 3,
      type: "water",
      timestamp: "2025-03-16 08:30:00",
    },
    {
      id: 6,
      user_id: 2,
      category_id: 3,
      type: "sunlight",
      timestamp: "2025-03-18 11:15:00",
    },
  ]);
}
