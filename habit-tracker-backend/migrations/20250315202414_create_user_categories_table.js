export async function up(knex) {
  await knex.schema.createTable("user_categories", (table) => {
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
    table.integer("plant_phase").defaultTo(0); // Tracks current phase of the plant
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_categories");
}
