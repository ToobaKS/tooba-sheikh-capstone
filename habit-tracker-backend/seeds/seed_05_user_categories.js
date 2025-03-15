/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("user_categories").del();

  await knex("user_categories").insert([
    { id: 1, user_id: 1, category_id: 1, plant_phase: 0 },
    { id: 2, user_id: 1, category_id: 2, plant_phase: 1 },
    { id: 3, user_id: 1, category_id: 3, plant_phase: 2 },
    { id: 4, user_id: 1, category_id: 4, plant_phase: 1 },

    { id: 5, user_id: 2, category_id: 2, plant_phase: 0 },
  ]);
}
