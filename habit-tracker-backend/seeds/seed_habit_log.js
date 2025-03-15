/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export default async function seed(knex) {
  await knex("habit_log").del();

  await knex("habit_log").insert([
    {
      id: 1,
      habit_id: 1,
      timestamp: "2025-03-10 08:00:00",
      status: "completed",
    },
    { id: 2, habit_id: 3, timestamp: "2025-03-10 09:30:00", status: "missed" },
    {
      id: 3,
      habit_id: 5,
      timestamp: "2025-03-10 18:00:00",
      status: "completed",
    },
  ]);
}
