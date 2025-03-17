/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("plants").del();
  await knex("plants").insert([
    { id: 1, name: "Bamboo" }, // Fitness Plant
    { id: 2, name: "Bonsai Tree" }, // Productivity Plant
    { id: 3, name: "Money Tree" }, // Finance Plant
    { id: 4, name: "Rose" }, // Self-Care / Love Plant
  ]);
}
