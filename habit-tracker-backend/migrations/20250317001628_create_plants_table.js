/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("plants", (table) => {
    table.increments("id").primary();
    table.string("name").unique().notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable("plants");
}
