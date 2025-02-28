import React, { useState } from 'react';
import { farmingMethods } from '../data/farmingMethods';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

const FarmingMethodsPage: React.FC = () => {
  const [expandedMethod, setExpandedMethod] = useState<string | null>('hydroponics');
  
  const toggleMethod = (id: string) => {
    setExpandedMethod(expandedMethod === id ? null : id);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Modern Farming Methods</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different sustainable farming techniques that can help you grow more food with fewer resources.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mb-12">
          {farmingMethods.map((method) => (
            <div 
              key={method.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div 
                className={`cursor-pointer ${expandedMethod === method.id ? 'bg-green-50' : ''}`}
                onClick={() => toggleMethod(method.id)}
              >
                <div className="flex items-center justify-between p-6">
                  <h2 className="text-2xl font-bold text-gray-900">{method.name}</h2>
                  <div className="flex items-center">
                    {expandedMethod === method.id ? (
                      <ChevronUp className="h-6 w-6 text-green-700" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>
              
              {expandedMethod === method.id && (
                <div className="p-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <img 
                        src={method.imageUrl} 
                        alt={method.name} 
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-700 mb-1">Setup Cost</h3>
                          <p>{method.setupCost}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-700 mb-1">Resource Efficiency</h3>
                          <p>{method.resourceEfficiency}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700 mb-2">Suitable For</h3>
                        <ul className="space-y-1">
                          {method.suitableFor.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Description</h3>
                      <p className="text-gray-700 mb-6">{method.description}</p>
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Benefits</h3>
                        <ul className="space-y-2">
                          {method.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Challenges</h3>
                        <ul className="space-y-2">
                          {method.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started with Hydroponics</h2>
          <p className="text-gray-700 mb-4">
            Hydroponics is often the most accessible modern farming method for beginners. Here's a simple way to start:
          </p>
          
          <ol className="space-y-4 mb-6">
            <li className="flex">
              <span className="bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</span>
              <div>
                <h3 className="font-semibold">Start with a simple system</h3>
                <p className="text-gray-600">Begin with a deep water culture (DWC) or wick system, which are the easiest to build and maintain.</p>
              </div>
            </li>
            <li className="flex">
              <span className="bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</span>
              <div>
                <h3 className="font-semibold">Choose beginner-friendly plants</h3>
                <p className="text-gray-600">Lettuce, spinach, and herbs like basil are perfect for beginners as they grow quickly and have simple needs.</p>
              </div>
            </li>
            <li className="flex">
              <span className="bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</span>
              <div>
                <h3 className="font-semibold">Monitor water quality</h3>
                <p className="text-gray-600">Check pH levels regularly and ensure your nutrient solution is properly balanced.</p>
              </div>
            </li>
            <li className="flex">
              <span className="bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</span>
              <div>
                <h3 className="font-semibold">Provide adequate lighting</h3>
                <p className="text-gray-600">Use natural sunlight or invest in simple grow lights for indoor systems.</p>
              </div>
            </li>
          </ol>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-700 mb-2">Pro Tip</h3>
            <p>
              Start small and scale up as you gain experience. Many successful hydroponic farmers began with a single plant in a simple setup before expanding their operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingMethodsPage;