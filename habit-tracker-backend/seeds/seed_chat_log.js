/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export default async function seed(knex) {
  await knex("chat_log").del();

  await knex("chat_log").insert([
    {
      id: 1,
      user_id: 1,
      chat_message: "I feel unmotivated today.",
      chat_response: "It's okay! Just start small!",
      session_id: "session_abc",
    },
    {
      id: 2,
      user_id: 1,
      chat_message: "How do I stay consistent?",
      chat_response: "Try setting small daily goals!",
      session_id: "session_abc",
    },
    {
      id: 3,
      user_id: 2,
      chat_message: "What is the best time to meditate?",
      chat_response: "Early morning or before bed!",
      session_id: "session_xyz",
    },
  ]);
}
