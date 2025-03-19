/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("plants").del();
  await knex("plants").insert([
    { id: 1, name: "Bamboo" },
    { id: 2, name: "Bonsai Tree" },
    { id: 3, name: "Money Tree" }, 
    { id: 4, name: "Rose" },
  ]);
}
