export function up(knex) {
  return knex.schema
    .createTable("chat_log", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.text("user_message").notNullable();
      table.text("bot_response").notNullable();
      table.timestamp("timestamp").defaultTo(knex.fn.now());
    })
    .then(() =>
      knex.raw(
        "ALTER TABLE chat_log CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
      )
    );
}

export function down(knex) {
  return knex.schema.dropTableIfExists("chat_log");
}
