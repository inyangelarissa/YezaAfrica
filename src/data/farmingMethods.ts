import { FarmingMethod } from '../types';

export const farmingMethods: FarmingMethod[] = [
  {
    id: 'hydroponics',
    name: 'Hydroponics',
    description: 'Hydroponics is a method of growing plants without soil, using mineral nutrient solutions in a water solvent. Plants are supported in an inert medium like perlite, rockwool, or coconut coir, with their roots exposed to a nutrient solution.',
    benefits: [
      'Uses up to 90% less water than traditional farming',
      'Grows plants up to 50% faster than soil-based methods',
      'Can be implemented in urban environments with limited space',
      'No need for pesticides or herbicides',
      'Year-round growing capability'
    ],
    challenges: [
      'Higher initial setup costs',
      'Requires technical knowledge',
      'Dependent on electricity',
      'System failures can quickly damage crops'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    setupCost: 'Medium to High',
    resourceEfficiency: 'Very High',
    suitableFor: ['Urban areas', 'Drought-prone regions', 'Year-round production', 'Small-scale farmers']
  },
  {
    id: 'aquaponics',
    name: 'Aquaponics',
    description: 'Aquaponics combines aquaculture (raising aquatic animals) with hydroponics in a symbiotic environment. Fish waste provides nutrients for plants, and plants filter water for fish.',
    benefits: [
      'Produces both plants and fish as food sources',
      'Creates a self-sustaining ecosystem',
      'Uses 90-95% less water than traditional farming',
      'Eliminates the need for chemical fertilizers',
      'Can be scaled from backyard to commercial size'
    ],
    challenges: [
      'Complex system requiring knowledge of both plants and fish',
      'Higher initial investment',
      'Balancing the ecosystem can be challenging',
      'Power outages can be catastrophic'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581590072233-69e0869d3827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    setupCost: 'High',
    resourceEfficiency: 'Very High',
    suitableFor: ['Food security initiatives', 'Integrated farming', 'Communities seeking protein and vegetable sources']
  },
  {
    id: 'vertical_farming',
    name: 'Vertical Farming',
    description: 'Vertical farming is the practice of growing crops in vertically stacked layers, often incorporating controlled-environment agriculture technology. The primary goal is maximizing crop output in a limited space.',
    benefits: [
      'Maximizes space utilization',
      'Can be implemented in urban environments',
      'Controlled environment means consistent yields',
      'Reduced transportation costs when located near markets',
      'Minimizes water usage through recirculation'
    ],
    challenges: [
      'High energy consumption for lighting',
      'Significant initial investment',
      'Limited to certain crop types',
      'Technical expertise required'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    setupCost: 'High',
    resourceEfficiency: 'High',
    suitableFor: ['Urban areas', 'Limited land availability', 'Year-round production']
  },
  {
    id: 'aeroponics',
    name: 'Aeroponics',
    description: 'Aeroponics is the process of growing plants in an air or mist environment without the use of soil or an aggregate medium. The roots hang in the air and are periodically sprayed with a nutrient-rich solution.',
    benefits: [
      'Uses up to 95% less water than traditional farming',
      'Faster growth rates than hydroponics',
      'Higher yields and better quality produce',
      'Reduced risk of disease transmission',
      'Easier harvesting and maintenance'
    ],
    challenges: [
      'High technical complexity',
      'Expensive setup costs',
      'Requires reliable power and backup systems',
      'Misting system maintenance is critical'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1563634233-f8d3b0a0b1a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    setupCost: 'Very High',
    resourceEfficiency: 'Extremely High',
    suitableFor: ['Advanced growers', 'Research facilities', 'Commercial operations']
  }
];