/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("plant_phases").del();
  await knex("plant_phases").insert([
    // Bamboo (Fitness)
    {
      id: 1,
      plant_id: 1,
      phase_number: 1,
      image_url: "/images/bamboo_seedling.png",
    },
    {
      id: 2,
      plant_id: 1,
      phase_number: 2,
      image_url: "/images/bamboo_growing.png",
    },
    {
      id: 3,
      plant_id: 1,
      phase_number: 3,
      image_url: "/images/bamboo_full.png",
    },

    //Bonsai Tree (Productivity)
    {
      id: 4,
      plant_id: 2,
      phase_number: 1,
      image_url: "/images/bonsai_seedling.png",
    },
    {
      id: 5,
      plant_id: 2,
      phase_number: 2,
      image_url: "/images/bonsai_growing.png",
    },
    {
      id: 6,
      plant_id: 2,
      phase_number: 3,
      image_url: "/images/bonsai_full.png",
    },

    //Money Tree (Finance)
    {
      id: 7,
      plant_id: 3,
      phase_number: 1,
      image_url: "/images/moneytree_seedling.png",
    },
    {
      id: 8,
      plant_id: 3,
      phase_number: 2,
      image_url: "/images/moneytree_growing.png",
    },
    {
      id: 9,
      plant_id: 3,
      phase_number: 3,
      image_url: "/images/moneytree_full.png",
    },

    //Rose (Self-Care/Love)
    {
      id: 10,
      plant_id: 4,
      phase_number: 1,
      image_url: "/images/rose_seedling.png",
    },
    {
      id: 11,
      plant_id: 4,
      phase_number: 2,
      image_url: "/images/rose_growing.png",
    },
    {
      id: 12,
      plant_id: 4,
      phase_number: 3,
      image_url: "/images/rose_full.png",
    },
  ]);
}
