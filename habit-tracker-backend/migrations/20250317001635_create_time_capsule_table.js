/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("time_capsule", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.text("title").notNullable();
    table.text("message").notNullable();
    table.date("unlock_date").notNullable();
    table.boolean("is_unlocked").defaultTo(false);
  });
}

export function down(knex) {
  return knex.schema.dropTable("time_capsule");
}
