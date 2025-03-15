export async function up(knex) {
  await knex.schema.createTable("category", (table) => {
    table.increments("id").primary();
    table
      .integer("plant_id")
      .unsigned()
      .references("id")
      .inTable("plants")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.text("description");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("category");
}
