export default {
  places: {
    style: {
      cottage: 'cabaña',
      cabin: 'cabaña rústica',
      lean_to: 'refugio',
      treehouse: 'casa del árbol',
      tent: 'tienda de campaña',
      cave: 'cueva',
      dump: 'basurero',
    },
  },

  rooms: {
    type: {
      Bathroom: 'baño',
      Bedroom: 'dormitorio',
      Kitchen: 'cocina',
      Den: 'estudio',
      LivingRoom: 'sala de estar',
    },

    Bathroom: {
      bathOrShowerStyles: {
        bath: 'bañera',
        shower: 'ducha',
        bath_and_shower: 'bañera y ducha',
        none: 'ninguno',
      },
    },

    Bedroom: {
      bedTypes: {
        twin: 'individual',
        bunk: 'litera',
        queen: 'matrimonial',
        king: 'king',
        cot: 'catre',
        sofabed: 'sofá cama',
      },
    },

    Kitchen: {
      appliances: {
        stove: 'estufa',
        oven: 'horno',
        microwave: 'microondas',
        dishwasher: 'lavavajillas',
      },
    },
  },
}
