/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("category", (table) => {
    table.increments("id").primary();
    table.string("name").unique().notNullable();
    table.text("description");
    table.string("image_url");
    table
      .integer("plant_id")
      .unsigned()
      .references("id")
      .inTable("plants")
      .onDelete("CASCADE");
  });
}

export function down(knex) {
  return knex.schema.dropTable("category");
}
