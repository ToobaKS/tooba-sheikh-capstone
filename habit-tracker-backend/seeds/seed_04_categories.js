/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("category").del();

  await knex("category").insert([
    {
      id: 1,
      plant_id: 1,
      name: "Fitness",
      description: "Track your workouts and physical activity",
    },
    {
      id: 2,
      plant_id: 2,
      name: "Mindfulness",
      description: "Track meditation, gratitude, and journaling",
    },
    {
      id: 3,
      plant_id: 3,
      name: "Learning",
      description: "Track study habits and personal growth",
    },
    {
      id: 4,
      plant_id: 4,
      name: "Nutrition",
      description: "Track your daily food intake and healthy eating habits",
    },
  ]);
}
