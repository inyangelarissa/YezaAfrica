export interface PlantData {
  id: string;
  name: string;
  growthTime: string;
  phRange: string;
  nutrientNeeds: string;
  idealTemperature: string;
  description: string;
  imageUrl: string;
}

export interface CalculationResult {
  nutrientSolution: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    calcium: number;
    magnesium: number;
  };
  phLevel: number;
  waterUsage: number;
  growthEstimate: string;
  recommendations: string[];
}

export interface FarmingMethod {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  challenges: string[];
  imageUrl: string;
  setupCost: string;
  resourceEfficiency: string;
  suitableFor: string[];
}