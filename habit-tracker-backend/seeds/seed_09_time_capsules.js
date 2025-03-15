/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("time_capsule").del();

  await knex("time_capsule").insert([
    {
      id: 1,
      user_id: 1,
      message: "Keep pushing forward!",
      created_date: "2025-03-01",
      open_date: "2025-06-01",
    },
    {
      id: 2,
      user_id: 1,
      message: "You worked so hard for this moment!",
      created_date: "2025-03-05",
      open_date: "2025-07-01",
    },
    {
      id: 3,
      user_id: 2,
      message: "Take care of your future self!",
      created_date: "2025-03-10",
      open_date: "2025-09-01",
    },
  ]);
}
