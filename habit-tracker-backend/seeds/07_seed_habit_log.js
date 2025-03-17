/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("habit_log").del();
  await knex("habit_log").insert([
    // 🌿 User 1 (Tooba) - Fitness Habits (Bamboo)
    { id: 1, habit_id: 1, user_id: 1, completion_date: "2025-03-15" },
    { id: 2, habit_id: 1, user_id: 1, completion_date: "2025-03-16" },
    { id: 3, habit_id: 2, user_id: 1, completion_date: "2025-03-17" },
    { id: 4, habit_id: 3, user_id: 1, completion_date: "2025-03-18" },

    // 🌱 User 1 (Tooba) - Productivity Habits (Bonsai)
    { id: 5, habit_id: 4, user_id: 1, completion_date: "2025-03-15" },
    { id: 6, habit_id: 4, user_id: 1, completion_date: "2025-03-16" },
    { id: 7, habit_id: 5, user_id: 1, completion_date: "2025-03-17" },

    // 💰 User 2 (John) - Finance Habits (Money Tree)
    { id: 8, habit_id: 6, user_id: 2, completion_date: "2025-03-16" },
    { id: 9, habit_id: 7, user_id: 2, completion_date: "2025-03-18" },
  ]);
}
