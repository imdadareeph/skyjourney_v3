import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About SkyJourney</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400">Press Center</a></li>
              <li><a href="#" className="hover:text-blue-400">Travel Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
              <li><a href="#" className="hover:text-blue-400">Booking Guide</a></li>
              <li><a href="#" className="hover:text-blue-400">Travel Updates</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-400">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Accessibility</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-blue-400"><Facebook /></a>
              <a href="#" className="hover:text-blue-400"><Twitter /></a>
              <a href="#" className="hover:text-blue-400"><Instagram /></a>
              <a href="#" className="hover:text-blue-400"><Youtube /></a>
            </div>
            <div className="space-y-4">
              <a href="#" className="block">
                <img
                  src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
              <a href="#" className="block">
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2024 SkyJourney. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <input
                type="text"
                placeholder="SJ - Your search here"
                className="px-4 py-2 rounded-l-lg bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}