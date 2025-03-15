export async function up(knex) {
  await knex.schema.createTable("plants", (table) => {
    table.increments("id").primary();
    table.string("type").notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTable("plants");
}
