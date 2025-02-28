import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Home, BookOpen, Calculator, Users, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Sprout className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">GrowSmart</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link to="/methods" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              Farming Methods
            </Link>
            <Link to="/calculator" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 flex items-center">
              <Calculator className="h-4 w-4 mr-1" />
              Growth Calculator
            </Link>
            <Link to="/community" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Community
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            <Link 
              to="/methods" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Farming Methods
            </Link>
            <Link 
              to="/calculator" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Growth Calculator
            </Link>
            <Link 
              to="/community" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="h-4 w-4 mr-2" />
              Community
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;