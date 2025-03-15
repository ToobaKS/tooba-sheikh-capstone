/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export default async function seed(knex) {
  await knex("plant_phases").del();

  await knex("plant_phases").insert([
    { id: 1, plant_id: 1, phase: 0, image_url: "/public/plants/cactus_0.png" },
    { id: 2, plant_id: 1, phase: 1, image_url: "/public/plants/cactus_1.png" },
    { id: 3, plant_id: 1, phase: 2, image_url: "/public/plants/cactus_2.png" },

    {
      id: 4,
      plant_id: 2,
      phase: 0,
      image_url: "/public/plants/sunflower_0.png",
    },
    {
      id: 5,
      plant_id: 2,
      phase: 1,
      image_url: "/public/plants/sunflower_1.png",
    },
    {
      id: 6,
      plant_id: 2,
      phase: 2,
      image_url: "/public/plants/sunflower_2.png",
    },

    { id: 7, plant_id: 3, phase: 0, image_url: "/public/plants/bamboo_0.png" },
    { id: 8, plant_id: 3, phase: 1, image_url: "/public/plants/bamboo_1.png" },
    { id: 9, plant_id: 3, phase: 2, image_url: "/public/plants/bamboo_2.png" },

    {
      id: 10,
      plant_id: 4,
      phase: 0,
      image_url: "/public/plants/lavender_0.png",
    },
    {
      id: 11,
      plant_id: 4,
      phase: 1,
      image_url: "/public/plants/lavender_1.png",
    },
    {
      id: 12,
      plant_id: 4,
      phase: 2,
      image_url: "/public/plants/lavender_2.png",
    },
  ]);
}
