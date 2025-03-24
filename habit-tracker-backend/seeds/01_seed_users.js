/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import bcrypt from "bcryptjs";

export async function seed(knex) {
  await knex("users").del();

  const hashedPassword1 = await bcrypt.hash("tooba123", 10);
  const hashedPassword2 = await bcrypt.hash("alex123", 10);
  const hashedPassword3 = await bcrypt.hash("candice123", 10);

  await knex("users").insert([
    {
      id: 1,
      first_name: "Tooba",
      last_name: "Sheikh",
      username: "tooba",
      email: "tooba@example.com",
      password: hashedPassword1,
    },
    {
      id: 2,
      first_name: "Alex",
      last_name: "Doe",
      username: "alexdoe",
      email: "alex@example.com",
      password: hashedPassword2,
    },
    {
      id: 3,
      first_name: "Candice",
      last_name: "Doe",
      username: "candicedoe",
      email: "candice@example.com",
      password: hashedPassword3,
    },
  ]);
}

