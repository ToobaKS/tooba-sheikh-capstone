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
      image_url: "fitness.png",
      plant_id: 1,
    },
    {
      id: 2,
      name: "Productivity",
      description:
        "Boost efficiency by tracking work, tasks, and study habits.",
      image_url: "productivity.png",
      plant_id: 2,
    },
    {
      id: 3,
      name: "Finance",
      description:
        "Manage spending, saving, and budgeting habits for financial health.",
      image_url: "finance.png",
      plant_id: 3,
    },
    {
      id: 4,
      name: "Self-Care & Love",
      description:
        "Prioritize self-care, relaxation, and emotional well-being.",
      image_url: "selfcare.png",
      plant_id: 4,
    },
    {
      id: 5,
      name: "Nutrition",
      description: "Stay on top of healthy eating habits and hydration.",
      image_url: "nutrition.png",
      plant_id: 5,
    },
    {
      id: 6,
      name: "Mindfulness",
      description:
        "Track meditation, journaling, and mindful breathing practices.",
      image_url: "mindfulness.png",
      plant_id: 6,
    },
    {
      id: 7,
      name: "Creativity",
      description:
        "Encourage creative expression through art, music, or writing.",
      image_url: "creativity.png",
      plant_id: 7,
    },
    {
      id: 8,
      name: "Sleep",
      description:
        "Improve sleep routines, quality, and tracking rest patterns.",
      image_url: "sleep.png",
      plant_id: 8,
    },
  ]);
}
