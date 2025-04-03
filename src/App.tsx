import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Plane } from 'lucide-react';
import FlightSearch from './components/FlightSearch';
import FlightResultsPage from './pages/FlightResultsPage';
import DestinationCarousel from './components/DestinationCarousel';
import OtherServices from './components/OtherServices';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <Plane className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">SkyJourney</span>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                <Link to="/flights" className="text-gray-600 hover:text-blue-600">Flights</Link>
                <Link to="/hotels" className="text-gray-600 hover:text-blue-600">Hotels</Link>
                <Link to="/packages" className="text-gray-600 hover:text-blue-600">Packages</Link>
                <Link to="/deals" className="text-gray-600 hover:text-blue-600">Deals</Link>
              </nav>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-blue-600 hover:text-blue-700">Sign In</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Register</button>
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section with Search Form */}
              <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-6xl mx-auto px-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
                    Your Journey Begins Here
                  </h1>
                  <p className="text-xl text-white/90 text-center mb-8">
                    Discover amazing destinations and book your next adventure
                  </p>
                  <FlightSearch />
                </div>
              </div>
              <DestinationCarousel />
              <OtherServices />
            </>
          } />
          <Route path="/results" element={<FlightResultsPage />} />
          <Route path="/flights" element={<FlightResultsPage />} />
          <Route path="/hotels" element={<div className="p-8 text-center">Hotels page coming soon</div>} />
          <Route path="/packages" element={<div className="p-8 text-center">Packages page coming soon</div>} />
          <Route path="/deals" element={<div className="p-8 text-center">Deals page coming soon</div>} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;