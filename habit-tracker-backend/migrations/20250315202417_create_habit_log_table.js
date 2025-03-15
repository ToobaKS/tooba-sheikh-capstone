export async function up(knex) {
  await knex.schema.createTable("habit_log", (table) => {
    table.increments("id").primary();
    table
      .integer("habit_id")
      .unsigned()
      .references("id")
      .inTable("habits")
      .onDelete("CASCADE");
    table.timestamp("timestamp").defaultTo(knex.fn.now());
    table
      .enu("status", ["completed", "missed", "pending"])
      .notNullable()
      .defaultTo("pending");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("habit_log");
}
