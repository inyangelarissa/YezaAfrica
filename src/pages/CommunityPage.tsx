import React from 'react';
import { Users, MessageSquare, Calendar, MapPin, ExternalLink } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Hydroponic Basics Workshop',
      date: 'June 15, 2025',
      time: '10:00 AM - 12:00 PM',
      location: 'Community Center, Downtown',
      description: 'Learn the fundamentals of setting up your first hydroponic system with minimal investment.'
    },
    {
      id: 2,
      title: 'Nutrient Management Masterclass',
      date: 'June 22, 2025',
      time: '2:00 PM - 4:00 PM',
      location: 'Virtual Event',
      description: 'Deep dive into nutrient solutions, pH balancing, and troubleshooting common issues.'
    },
    {
      id: 3,
      title: 'Urban Farming Meetup',
      date: 'July 5, 2025',
      time: '11:00 AM - 1:00 PM',
      location: 'Green Roof Garden, City Hall',
      description: 'Connect with other urban farmers and share experiences with space-efficient growing methods.'
    }
  ];
  
  const successStories = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      location: 'Phoenix, Arizona',
      story: 'I started with a small hydroponic setup in my apartment and now supply lettuce to three local restaurants. The water savings have been incredible in our drought-prone area.',
      imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'James Wilson',
      location: 'Detroit, Michigan',
      story: 'Our community converted an abandoned lot into a vertical farm using recycled materials. We now provide fresh produce to our food desert neighborhood year-round.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Aisha Johnson',
      location: 'New Orleans, Louisiana',
      story: 'After Hurricane Katrina, I rebuilt using aquaponics. Now I teach others how resilient food systems can help communities recover from natural disasters.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Join Our Farming Community</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with other farmers, share experiences, and learn from each other to grow better together.
          </p>
        </div>
        
        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h2>
            <p className="text-gray-600">Active Community Members</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h2>
            <p className="text-gray-600">Questions Answered</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="bg-yellow-100 p-3 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">250+</h2>
            <p className="text-gray-600">Events Hosted</p>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-green-700" />
            Upcoming Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-green-700 text-white p-4">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-start mb-3">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{event.date}</p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p>{event.location}</p>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  
                  <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-200 transition duration-300 w-full">
                    Register for Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Success Stories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="h-6 w-6 mr-2 text-green-700" />
            Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map(story => (
              <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={story.imageUrl} 
                  alt={story.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{story.name}</h3>
                  <p className="text-gray-600 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {story.location}
                  </p>
                  <p className="text-gray-700">{story.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Join the Community */}
        <div className="bg-green-700 text-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="md:flex items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
                <p className="text-green-100 mb-6">
                  Connect with farmers around the world, share your experiences, ask questions, and learn from experts in modern farming techniques.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition duration-300">
                    Join Discord Community
                  </button>
                  <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition duration-300">
                    Follow on Social Media
                  </button>
                </div>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Community gathering" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Resources */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ExternalLink className="h-6 w-6 mr-2 text-green-700" />
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Educational Partners</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <ExternalLink className="h-4 w-4 text-green-600 mr-2" />
                  <a href="#" className="text-green-700 hover:underline">University Extension Programs</a>
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-4 w-4 text-green-600 mr-2" />
                  <a href="#" className="text-green-700 hover:underline">USDA Urban Agriculture Resources</a>
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-4 w-4 text-green-600 mr-2" />
                  <a href="#" className="text-green-700 hover:underline">MIT Open Agriculture Initiative</a>
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-4 w-4 text-green-600 mr-2" />
                  <a href="#" className="text-green-700 hover:underline">Hydroponic Society of America</a>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Funding Opportunities</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <ExternalLink className="h-4 w-4 text-green-600 mr-2" />
                  <a href="#" className="text-green-700 hover:underline">USDA Grants for Urban Agriculture</a>
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-4 w-4 text-green-600 mr-2" />
                  <a href="#" className="text-green-700 hover:underline">Community Development Block Grants</a>
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-4 w-4 text-green-600 mr-2" />
                  <a href="#" className="text-green-700 hover:underline">Sustainable Agriculture Research Grants</a>
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-4 w-4 text-green-600 mr-2" />
                  <a href="#" className="text-green-700 hover:underline">Microloans for Small Farmers</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;