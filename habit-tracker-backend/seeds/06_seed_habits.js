/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("habits").del();
  await knex("habits").insert([
    // User 1 (Tooba) - Fitness (Bamboo) Category
    {
      id: 1,
      user_category_id: 1,
      name: "Morning Workout",
      description: "Do at least 30 minutes of exercise.",
    },
    {
      id: 2,
      user_category_id: 1,
      name: "Evening Walk",
      description: "Walk for 20 minutes outside.",
    },
    {
      id: 3,
      user_category_id: 1,
      name: "Stretching",
      description: "Do a 10-minute stretching routine.",
    },

    // User 1 (Tooba) - Productivity (Bonsai) Category
    {
      id: 4,
      user_category_id: 2,
      name: "Pomodoro Study",
      description: "Complete a 25-minute Pomodoro study session.",
    },
    {
      id: 5,
      user_category_id: 2,
      name: "Write Daily Goals",
      description: "Write down 3 important tasks for the day.",
    },

    // User 2 (Alex) - Finance (Money Tree) Category (Randomly Chosen)
    {
      id: 6,
      user_category_id: 5,
      name: "Check Budget",
      description: "Review weekly spending and budget limits.",
    },
    {
      id: 7,
      user_category_id: 5,
      name: "Save $5",
      description: "Transfer $5 to savings account.",
    },
  ]);
}
