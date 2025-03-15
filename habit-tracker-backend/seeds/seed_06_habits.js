/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("habits").del();

  await knex("habits").insert([
    {
      id: 1,
      user_category_id: 1,
      habit_name: "Morning Run",
      start_date: "2025-03-01",
      streak: 5,
    },
    {
      id: 2,
      user_category_id: 1,
      habit_name: "Stretching",
      start_date: "2025-03-05",
      streak: 3,
    },
    {
      id: 3,
      user_category_id: 2,
      habit_name: "Daily Meditation",
      start_date: "2025-03-07",
      streak: 7,
    },
    {
      id: 4,
      user_category_id: 2,
      habit_name: "Gratitude Journal",
      start_date: "2025-03-08",
      streak: 4,
    },
    {
      id: 5,
      user_category_id: 3,
      habit_name: "Reading 10 Pages",
      start_date: "2025-03-09",
      streak: 6,
    },
    {
      id: 6,
      user_category_id: 4,
      habit_name: "Meal Prepping",
      start_date: "2025-03-10",
      streak: 2,
    },

    {
      id: 7,
      user_category_id: 5,
      habit_name: "Yoga",
      start_date: "2025-03-05",
      streak: 1,
    },
  ]);
}
