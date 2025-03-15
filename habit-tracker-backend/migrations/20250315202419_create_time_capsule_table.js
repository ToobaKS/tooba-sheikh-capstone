export async function up(knex) {
  await knex.schema.createTable("time_capsule", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.text("message").notNullable();
    table.timestamp("created_date").defaultTo(knex.fn.now());
    table.timestamp("open_date").notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTable("time_capsule");
}
