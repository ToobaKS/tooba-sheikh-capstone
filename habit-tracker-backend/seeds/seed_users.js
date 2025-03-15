/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export default async function seed(knex) {
  await knex("users").del();

  await knex("users").insert([
    {
      id: 1,
      email: "tooba@example.com",
      password: "hashed_password_1",
      first_name: "Tooba",
      last_name: "Sheikh",
    },
    {
      id: 2,
      email: "alex@example.com",
      password: "hashed_password_2",
      first_name: "Alex",
      last_name: "Doe",
    },
  ]);
}
