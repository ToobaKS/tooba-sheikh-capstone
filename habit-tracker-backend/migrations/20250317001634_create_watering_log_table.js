/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("watering_log", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("category")
      .onDelete("CASCADE");
    table.enum("type", ["water", "sunlight", "fertilizer"]).defaultTo("water");
    table.timestamp("timestamp").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("watering_log");
}
