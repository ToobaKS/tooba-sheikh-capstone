/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("habits", (table) => {
    table.increments("id").primary();
    table
      .integer("user_category_id")
      .unsigned()
      .references("id")
      .inTable("user_categories")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.text("description").nullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable("habits");
}
