import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800 mt-16">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <span role="img" aria-label="tv" className="text-2xl">📺</span>
            </div>
            <h3 className="text-white font-bold text-lg">Fire TV</h3>
          </div>
          <p className="text-gray-400 text-sm">
            AI-powered streaming with personalized recommendations based on weather, time, mood, and your preferences.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Content</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Movies</a></li>
            <li><a href="#" className="hover:text-white transition-colors">TV Series</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Documentaries</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Specials</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Platforms</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Netflix</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Prime Video</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Disney+</a></li>
            <li><a href="#" className="hover:text-white transition-colors">HBO Max</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 