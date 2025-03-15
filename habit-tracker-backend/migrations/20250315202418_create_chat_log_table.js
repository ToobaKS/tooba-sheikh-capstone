export async function up(knex) {
  await knex.schema.createTable("chat_log", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.text("chat_message").notNullable();
    table.text("chat_response").notNullable();
    table.timestamp("timestamp").defaultTo(knex.fn.now());
    table.string("session_id").notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTable("chat_log");
}
