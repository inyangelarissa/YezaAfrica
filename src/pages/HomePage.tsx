import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Sun, Leaf, Calculator, Users, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-green-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Hydroponic farm" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Modern Farming for Everyone</h1>
          <p className="text-xl max-w-3xl mb-8">
            Learn sustainable farming techniques that work anywhere, with a focus on hydroponic systems that use less water and space while producing more food.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/methods" className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition duration-300">
              Explore Methods
            </Link>
            <Link to="/calculator" className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition duration-300">
              Try Our Calculator
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Modern Farming Matters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <Droplet className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Water Efficiency</h3>
            <p className="text-gray-600">
              Hydroponic systems use up to 90% less water than traditional farming methods, making them ideal for drought-prone areas.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-yellow-100 p-3 rounded-full mb-4">
              <Sun className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Year-Round Growing</h3>
            <p className="text-gray-600">
              Control your growing environment to produce fresh food throughout the year, regardless of outside weather conditions.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Space Optimization</h3>
            <p className="text-gray-600">
              Grow more food in less space, making modern farming techniques perfect for urban environments and small plots.
            </p>
          </div>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How to Get Started</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <span className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                  Learn About Different Methods
                </h3>
                <p className="text-gray-600 ml-11">
                  Explore various modern farming techniques and find the one that suits your needs and resources.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <span className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                  Plan Your System
                </h3>
                <p className="text-gray-600 ml-11">
                  Use our calculator to determine the optimal conditions for your chosen plants and system design.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <span className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                  Join Our Community
                </h3>
                <p className="text-gray-600 ml-11">
                  Connect with other farmers, share experiences, and get support as you grow your knowledge and crops.
                </p>
              </div>
              
              <div className="mt-6">
                <Link to="/methods" className="inline-flex items-center text-green-700 font-medium hover:text-green-800">
                  Get started now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1585150841942-a8397e3cd5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Hydroponic setup" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of farmers who are already using our resources to improve their yields and sustainability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/calculator" className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition duration-300 flex items-center">
              <Calculator className="mr-2 h-5 w-5" />
              Try Our Calculator
            </Link>
            <Link to="/community" className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition duration-300 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;