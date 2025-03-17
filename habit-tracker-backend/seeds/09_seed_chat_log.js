/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("chat_log").del();
  await knex("chat_log").insert([
    // 🌿 User 1 (Tooba) - Chatting about Fitness & Productivity
    {
      id: 1,
      user_id: 1,
      user_message: "I feel tired today, should I still work out?",
      bot_response:
        "It's okay to take a rest day! But even a short stretch can help. 💪",
      timestamp: "2025-03-15 08:00:00",
    },
    {
      id: 2,
      user_id: 1,
      user_message: "I'm struggling to focus on my work.",
      bot_response:
        "Try the Pomodoro method! 25 minutes of focus, then a short break. 🍅",
      timestamp: "2025-03-16 10:15:00",
    },

    // 💰 User 2 (John) - Chatting about Finance & Self-Care
    {
      id: 3,
      user_id: 2,
      user_message: "I'm stressed about money this month.",
      bot_response:
        "Take a deep breath. Try breaking your expenses into small, manageable goals. 🏦",
      timestamp: "2025-03-17 09:45:00",
    },
    {
      id: 4,
      user_id: 2,
      user_message: "I feel down today.",
      bot_response:
        "It's okay to have off days. Maybe take a walk or listen to your favorite song. 🌸",
      timestamp: "2025-03-18 14:30:00",
    },
  ]);
}
