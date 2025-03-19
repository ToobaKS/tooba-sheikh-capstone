/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("user_categories").del();
  await knex("user_categories").insert([
    // User 1 (Tooba) - All Categories
    {
      id: 1,
      user_id: 1,
      category_id: 1,
      plant_phase: 1,
      streak: 0,
      watering_count: 0,
      watering_needed: 5,
    }, // Fitness (Bamboo)
    {
      id: 2,
      user_id: 1,
      category_id: 2,
      plant_phase: 1,
      streak: 0,
      watering_count: 0,
      watering_needed: 5,
    }, // Productivity (Bonsai)
    {
      id: 3,
      user_id: 1,
      category_id: 3,
      plant_phase: 1,
      streak: 0,
      watering_count: 0,
      watering_needed: 5,
    }, // Finance (Money Tree)
    {
      id: 4,
      user_id: 1,
      category_id: 4,
      plant_phase: 1,
      streak: 0,
      watering_count: 0,
      watering_needed: 5,
    }, // Self-Care (Rose)

    // User 2 (Alex) - Only Finance Category
    {
      id: 5,
      user_id: 2,
      category_id: 3,
      plant_phase: 1,
      streak: 0,
      watering_count: 0,
      watering_needed: 5,
    }, // Finance (Money Tree)
  ]);
}
