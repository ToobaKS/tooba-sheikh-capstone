/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("habit_log", (table) => {
    table.increments("id").primary();
    table
      .integer("habit_id")
      .unsigned()
      .references("id")
      .inTable("habits")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.date("completion_date").notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable("habit_log");
}
