import React, { useState } from 'react';
import { plants } from '../data/plants';
import { calculatePlantNeeds } from '../api/wolframApi';
import { CalculationResult } from '../types';
import { Calculator, Leaf, Droplet, ThermometerSun, AlertCircle } from 'lucide-react';

const CalculatorPage: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState('');
  const [growthStage, setGrowthStage] = useState('seedling');
  const [currentPh, setCurrentPh] = useState(6.0);
  const [currentNutrients, setCurrentNutrients] = useState({
    nitrogen: 1.0,
    phosphorus: 0.5,
    potassium: 1.5,
    calcium: 0.5,
    magnesium: 0.3
  });
  
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  
  const handleCalculate = async () => {
    if (!selectedPlant) {
      setError('Please select a plant to continue');
      return;
    }
    
    setError('');
    setIsCalculating(true);
    
    try {
      const result = await calculatePlantNeeds(
        selectedPlant,
        growthStage,
        currentPh,
        currentNutrients
      );
      
      setCalculationResult(result);
    } catch (err) {
      setError('An error occurred while calculating. Please try again.');
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };
  
  const selectedPlantData = plants.find(p => p.id === selectedPlant);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Hydroponic Growth Calculator</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our Wolfram-powered calculator to determine optimal growing conditions and nutrient solutions for your hydroponic plants.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-green-700" />
                Input Parameters
              </h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="plant" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Plant
                  </label>
                  <select
                    id="plant"
                    value={selectedPlant}
                    onChange={(e) => setSelectedPlant(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">-- Select a plant --</option>
                    {plants.map(plant => (
                      <option key={plant.id} value={plant.id}>{plant.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="growthStage" className="block text-sm font-medium text-gray-700 mb-1">
                    Growth Stage
                  </label>
                  <select
                    id="growthStage"
                    value={growthStage}
                    onChange={(e) => setGrowthStage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="seedling">Seedling</option>
                    <option value="vegetative">Vegetative</option>
                    <option value="flowering">Flowering/Fruiting</option>
                    <option value="harvest">Pre-Harvest</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-1">
                    Current pH Level: {currentPh}
                  </label>
                  <input
                    type="range"
                    id="ph"
                    min="4.0"
                    max="8.0"
                    step="0.1"
                    value={currentPh}
                    onChange={(e) => setCurrentPh(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>4.0</span>
                    <span>6.0</span>
                    <span>8.0</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Current Nutrient Levels (ppm)</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="nitrogen" className="block text-sm text-gray-600 mb-1">
                        Nitrogen: {currentNutrients.nitrogen}
                      </label>
                      <input
                        type="range"
                        id="nitrogen"
                        min="0"
                        max="3"
                        step="0.1"
                        value={currentNutrients.nitrogen}
                        onChange={(e) => setCurrentNutrients({...currentNutrients, nitrogen: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phosphorus" className="block text-sm text-gray-600 mb-1">
                        Phosphorus: {currentNutrients.phosphorus}
                      </label>
                      <input
                        type="range"
                        id="phosphorus"
                        min="0"
                        max="3"
                        step="0.1"
                        value={currentNutrients.phosphorus}
                        onChange={(e) => setCurrentNutrients({...currentNutrients, phosphorus: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="potassium" className="block text-sm text-gray-600 mb-1">
                        Potassium: {currentNutrients.potassium}
                      </label>
                      <input
                        type="range"
                        id="potassium"
                        min="0"
                        max="3"
                        step="0.1"
                        value={currentNutrients.potassium}
                        onChange={(e) => setCurrentNutrients({...currentNutrients, potassium: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="calcium" className="block text-sm text-gray-600 mb-1">
                        Calcium: {currentNutrients.calcium}
                      </label>
                      <input
                        type="range"
                        id="calcium"
                        min="0"
                        max="3"
                        step="0.1"
                        value={currentNutrients.calcium}
                        onChange={(e) => setCurrentNutrients({...currentNutrients, calcium: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="magnesium" className="block text-sm text-gray-600 mb-1">
                        Magnesium: {currentNutrients.magnesium}
                      </label>
                      <input
                        type="range"
                        id="magnesium"
                        min="0"
                        max="3"
                        step="0.1"
                        value={currentNutrients.magnesium}
                        onChange={(e) => setCurrentNutrients({...currentNutrients, magnesium: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate Optimal Conditions'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Results and Plant Info */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {/* Plant Information */}
              {selectedPlantData && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Leaf className="h-5 w-5 mr-2 text-green-700" />
                    {selectedPlantData.name} Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <img 
                        src={selectedPlantData.imageUrl} 
                        alt={selectedPlantData.name} 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="text-gray-700 mb-4">{selectedPlantData.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h3 className="text-sm font-medium text-gray-700">Growth Time</h3>
                          <p className="text-gray-900">{selectedPlantData.growthTime}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h3 className="text-sm font-medium text-gray-700">Ideal pH Range</h3>
                          <p className="text-gray-900">{selectedPlantData.phRange}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h3 className="text-sm font-medium text-gray-700">Nutrient Needs</h3>
                          <p className="text-gray-900">{selectedPlantData.nutrientNeeds}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h3 className="text-sm font-medium text-gray-700">Ideal Temperature</h3>
                          <p className="text-gray-900">{selectedPlantData.idealTemperature}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Calculation Results */}
              {calculationResult && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-green-700" />
                    Calculation Results
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Leaf className="h-4 w-4 mr-2 text-green-600" />
                        Recommended Nutrient Solution
                      </h3>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Nitrogen:</span>
                          <span className="font-medium">{calculationResult.nutrientSolution.nitrogen} ppm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Phosphorus:</span>
                          <span className="font-medium">{calculationResult.nutrientSolution.phosphorus} ppm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Potassium:</span>
                          <span className="font-medium">{calculationResult.nutrientSolution.potassium} ppm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Calcium:</span>
                          <span className="font-medium">{calculationResult.nutrientSolution.calcium} ppm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Magnesium:</span>
                          <span className="font-medium">{calculationResult.nutrientSolution.magnesium} ppm</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between bg-blue-50 p-3 rounded-md mb-4">
                        <div className="flex items-center">
                          <Droplet className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="text-gray-700">Optimal pH Level:</span>
                        </div>
                        <span className="font-medium">{calculationResult.phLevel}</span>
                      </div>
                      
                      <div className="flex items-center justify-between bg-green-50 p-3 rounded-md">
                        <div className="flex items-center">
                          <ThermometerSun className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-gray-700">Water Usage:</span>
                        </div>
                        <span className="font-medium">{calculationResult.waterUsage} liters/day</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Growth Estimate</h3>
                      <p className="bg-yellow-50 p-3 rounded-md mb-4">
                        {calculationResult.growthEstimate}
                      </p>
                      
                      <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                      <ul className="bg-gray-50 p-3 rounded-md space-y-2">
                        {calculationResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Placeholder when no calculation has been performed */}
              {!calculationResult && !selectedPlantData && (
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center h-96">
                  <Calculator className="h-16 w-16 text-gray-300 mb-4" />
                  <h2 className="text-xl font-medium text-gray-700 mb-2">No Calculation Results Yet</h2>
                  <p className="text-gray-500 max-w-md">
                    Select a plant and input your current growing conditions to receive personalized recommendations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;