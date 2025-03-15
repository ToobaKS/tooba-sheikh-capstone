/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("plants").del();

  await knex("plants").insert([
    { id: 1, type: "Cactus" },
    { id: 2, type: "Sunflower" },
    { id: 3, type: "Bamboo" },
    { id: 4, type: "Lavender" },
  ]);
}
