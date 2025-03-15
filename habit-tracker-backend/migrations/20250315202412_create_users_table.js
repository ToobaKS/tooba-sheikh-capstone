export async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("first_name");
    table.string("last_name");
    table.timestamp("created_date").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTable("users");
}
