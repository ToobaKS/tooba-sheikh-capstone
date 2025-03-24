/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("plant_phases", (table) => {
    table.increments("id").primary();
    table
      .integer("plant_id")
      .unsigned()
      .references("id")
      .inTable("plants")
      .onDelete("CASCADE");
    table.integer("phase_number").notNullable();
    table.string("image_url").notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable("plant_phases");
}
