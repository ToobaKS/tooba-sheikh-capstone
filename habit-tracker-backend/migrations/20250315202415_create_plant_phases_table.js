export async function up(knex) {
  await knex.schema.createTable("plant_phases", (table) => {
    table.increments("id").primary();
    table
      .integer("plant_id")
      .unsigned()
      .references("id")
      .inTable("plants")
      .onDelete("CASCADE");
    table.integer("phase").notNullable();
    table.string("image_url").notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTable("plant_phases");
}
