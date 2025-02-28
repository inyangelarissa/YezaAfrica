import React from 'react';
import { Sprout, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Sprout className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">GrowSmart</span>
            </div>
            <p className="text-green-200 mb-4">
              Empowering communities with modern farming knowledge and techniques for a sustainable future.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-green-200 hover:text-white">Home</a></li>
              <li><a href="/methods" className="text-green-200 hover:text-white">Farming Methods</a></li>
              <li><a href="/calculator" className="text-green-200 hover:text-white">Growth Calculator</a></li>
              <li><a href="/community" className="text-green-200 hover:text-white">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-200 hover:text-white">Getting Started Guide</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Plant Database</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Equipment Recommendations</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Success Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-green-200" />
                <a href="mailto:info@growsmart.org" className="text-green-200 hover:text-white">info@growsmart.org</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-green-200" />
                <span className="text-green-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-green-200" />
                <span className="text-green-200">123 Farming Lane<br />Sustainable City, SC 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-300 text-sm">
          <p>&copy; {new Date().getFullYear()} GrowSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;