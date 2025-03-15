export async function up(knex) {
  await knex.schema.createTable("habits", (table) => {
    table.increments("id").primary();
    table
      .integer("user_category_id")
      .unsigned()
      .references("id")
      .inTable("user_categories")
      .onDelete("CASCADE");
    table.string("habit_name").notNullable();
    table.date("start_date").notNullable();
    table.integer("streak").defaultTo(0);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("habits");
}
