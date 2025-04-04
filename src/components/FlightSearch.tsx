import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ChevronDown, Search } from 'lucide-react';
import { airports, Airport } from '../config/airport-codes';
import { SpeedInsights } from "@vercel/speed-insights/next";

type TripType = 'round_trip' | 'one_way' | 'multi_city';

interface SearchFormData {
  from: string;
  to: string;
  date: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first_class';
  tripType: TripType;
  multiCityFlights: Array<{
    from: string;
    to: string;
    date: string;
  }>;
}

const FlightSearch: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SearchFormData>({
    from: '',
    to: '',
    date: '',
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: 'economy',
    tripType: 'round_trip',
    multiCityFlights: [
      { from: '', to: '', date: '' },
      { from: '', to: '', date: '' }
    ]
  });

  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState<Airport[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Airport[]>([]);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const passengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
      if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
        setShowPassengerDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTripTypeChange = (type: TripType) => {
    setFormData(prev => ({
      ...prev,
      tripType: type,
      // Reset return date if switching to one way
      returnDate: type === 'one_way' ? undefined : prev.returnDate
    }));
  };

  const handleFromSearch = (value: string) => {
    setFormData({ ...formData, from: value });
    if (value.length > 1) {
      const filtered = airports.filter(airport => 
        airport.city.toLowerCase().includes(value.toLowerCase()) ||
        airport.code.toLowerCase().includes(value.toLowerCase()) ||
        airport.name.toLowerCase().includes(value.toLowerCase())
      );
      setFromSuggestions(filtered);
      setShowFromSuggestions(true);
    } else {
      setShowFromSuggestions(false);
    }
  };

  const handleToSearch = (value: string) => {
    setFormData({ ...formData, to: value });
    if (value.length > 1) {
      const filtered = airports.filter(airport => 
        airport.city.toLowerCase().includes(value.toLowerCase()) ||
        airport.code.toLowerCase().includes(value.toLowerCase()) ||
        airport.name.toLowerCase().includes(value.toLowerCase())
      );
      setToSuggestions(filtered);
      setShowToSuggestions(true);
    } else {
      setShowToSuggestions(false);
    }
  };

  const handleMultiCityChange = (index: number, field: keyof typeof formData.multiCityFlights[0], value: string) => {
    const updatedFlights = [...formData.multiCityFlights!];
    updatedFlights[index] = { ...updatedFlights[index], [field]: value };
    setFormData({ ...formData, multiCityFlights: updatedFlights });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    navigate('/results', {
      state: {
        searchParams: {
          ...formData,
          passengers: {
            adults: formData.adults,
            children: formData.children,
            infants: formData.infants
          }
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <SpeedInsights />
      <div className="flex items-center space-x-4 mb-6">
        <button
          type="button"
          onClick={() => handleTripTypeChange('round_trip')}
          className={`px-4 py-2 ${
            formData.tripType === 'round_trip'
              ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          Round Trip
        </button>
        <button
          type="button"
          onClick={() => handleTripTypeChange('one_way')}
          className={`px-4 py-2 ${
            formData.tripType === 'one_way'
              ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          One Way
        </button>
        <button
          type="button"
          onClick={() => handleTripTypeChange('multi_city')}
          className={`px-4 py-2 ${
            formData.tripType === 'multi_city'
              ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          Multi-City
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formData.tripType === 'multi_city' ? (
          // Multi-city form
          <div className="space-y-4">
            {formData.multiCityFlights?.map((flight, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={flight.from}
                      onChange={(e) => handleMultiCityChange(index, 'from', e.target.value)}
                      placeholder="Enter city or airport"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                      required
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={flight.to}
                      onChange={(e) => handleMultiCityChange(index, 'to', e.target.value)}
                      placeholder="Enter city or airport"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                      required
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={flight.date}
                      onChange={(e) => handleMultiCityChange(index, 'date', e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                      required
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Regular search form
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative" ref={fromRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.from}
                    onChange={(e) => handleFromSearch(e.target.value)}
                    placeholder="Enter city or airport"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                    required
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {showFromSuggestions && fromSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    {fromSuggestions.map((airport) => (
                      <div
                        key={airport.code}
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setFormData({ ...formData, from: `${airport.city} (${airport.code})` });
                          setShowFromSuggestions(false);
                        }}
                      >
                        <div className="font-medium">{airport.city} ({airport.code})</div>
                        <div className="text-sm text-gray-500">{airport.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative" ref={toRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.to}
                    onChange={(e) => handleToSearch(e.target.value)}
                    placeholder="Enter city or airport"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                    required
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {showToSuggestions && toSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    {toSuggestions.map((airport) => (
                      <div
                        key={airport.code}
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setFormData({ ...formData, to: `${airport.city} (${airport.code})` });
                          setShowToSuggestions(false);
                        }}
                      >
                        <div className="font-medium">{airport.city} ({airport.code})</div>
                        <div className="text-sm text-gray-500">{airport.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                    required
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              {formData.tripType === 'round_trip' && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Return
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                      required
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="relative" ref={passengerRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passengers & Class
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full p-3 border rounded-lg text-left flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
              >
                <div className="flex items-center space-x-2">
                  <Users className="text-gray-400 w-5 h-5" />
                  <span>
                    {formData.adults + formData.children + formData.infants} Passenger(s),{' '}
                    {formData.cabinClass.replace('_', ' ')}
                  </span>
                </div>
                <ChevronDown className="text-gray-400 w-5 h-5" />
              </button>
              {showPassengerDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.adults}
                        onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.children}
                        onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Infants</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.infants}
                        onChange={(e) => setFormData({ ...formData, infants: parseInt(e.target.value) })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cabin Class</label>
                      <select
                        value={formData.cabinClass}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          cabinClass: e.target.value as SearchFormData['cabinClass']
                        })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="economy">Economy</option>
                        <option value="premium_economy">Premium Economy</option>
                        <option value="business">Business</option>
                        <option value="first_class">First Class</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
            >
              Search Flights
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightSearch; 