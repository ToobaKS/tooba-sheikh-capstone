/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("category").del();
  await knex("category").insert([
    {
      id: 1,
      name: "Fitness",
      description:
        "Track workouts, steps, and physical activity to stay healthy.",
      plant_id: 1,
    }, // Linked to Plant 1
    {
      id: 2,
      name: "Productivity",
      description:
        "Boost efficiency by tracking work, tasks, and study habits.",
      plant_id: 2,
    }, // Linked to Plant 2
    {
      id: 3,
      name: "Finance",
      description:
        "Manage spending, saving, and budgeting habits for financial health.",
      plant_id: 3,
    }, // Linked to Plant 3
    {
      id: 4,
      name: "Self-Care & Love",
      description:
        "Prioritize self-care, relaxation, and emotional well-being.",
      plant_id: 4,
    }, // Linked to Plant 4
  ]);
}
