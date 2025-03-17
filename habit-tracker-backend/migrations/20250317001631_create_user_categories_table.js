/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("user_categories", (table) => {
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
    table.integer("plant_phase").defaultTo(1);
    table.integer("streak").defaultTo(0);
    table.integer("watering_count").defaultTo(0);
    table.integer("watering_needed").defaultTo(5);
    table.timestamp("last_watered").nullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable("user_categories");
}
