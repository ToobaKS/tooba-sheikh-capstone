/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      first_name: "Tooba",
      last_name: "Sheikh",
      username: "tooba",
      email: "tooba@example.com",
      password: "hashedpassword1",
    },
    {
      id: 2,
      first_name: "Alex",
      last_name: "Doe",
      username: "alexdoe",
      email: "alex@example.com",
      password: "hashedpassword2",
    },
    {
      id: 3,
      first_name: "Candice",
      last_name: "Doe",
      username: "candicedoe",
      email: "candice@example.com",
      password: "hashedpassword3",
    },
  ]);
}
