/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("time_capsule").del();
  await knex("time_capsule").insert([
    // 🌿 User 1 (Tooba) - Fitness & Productivity Goals
    {
      id: 1,
      user_id: 1,
      message:
        "Hey Future Me, I hope you're still keeping up with your workouts! Remember why you started. 💪",
      unlock_date: "2025-06-01",
      is_unlocked: false,
    },
    {
      id: 2,
      user_id: 1,
      message:
        "Your hard work today will pay off. Keep going, and trust the process. 🚀",
      unlock_date: "2025-07-15",
      is_unlocked: false,
    },

    // 💰 User 2 (John) - Finance & Self-Care Reflections
    {
      id: 3,
      user_id: 2,
      message:
        "I hope you're feeling better and more in control of your finances. Small steps lead to big changes! 💰",
      unlock_date: "2025-09-10",
      is_unlocked: false,
    },
    {
      id: 4,
      user_id: 2,
      message:
        "Take time to appreciate how far you've come. Be kind to yourself. 🌸",
      unlock_date: "2025-12-31",
      is_unlocked: false,
    },
  ]);
}
