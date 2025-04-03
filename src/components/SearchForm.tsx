import React, { useState } from 'react';
import { Calendar, Users, Search } from 'lucide-react';
import { airports } from '../config/airports';

interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

type TripType = 'roundTrip' | 'oneWay' | 'multiCity';
type CabinClass = 'economy' | 'business' | 'firstClass';

export default function SearchForm() {
  const [tripType, setTripType] = useState<TripType>('roundTrip');
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabinClass, setCabinClass] = useState<CabinClass>('economy');
  const [showPassengerModal, setShowPassengerModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <form onSubmit={handleSearch} className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => setTripType('roundTrip')}
          className={"px-4 py-2 rounded-full " + (
            tripType === 'roundTrip'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          )}
        >
          Round Trip
        </button>
        <button
          type="button"
          onClick={() => setTripType('oneWay')}
          className={"px-4 py-2 rounded-full " + (
            tripType === 'oneWay'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          )}
        >
          One Way
        </button>
        <button
          type="button"
          onClick={() => setTripType('multiCity')}
          className={"px-4 py-2 rounded-full " + (
            tripType === 'multiCity'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          )}
        >
          Multi City
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Select departure</option>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.name} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Select arrival</option>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.name} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {tripType === 'oneWay' ? 'Departure Date' : 'Dates'}
          </label>
          <div className="flex items-center border rounded-lg p-3">
            <Calendar className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="date"
              className="w-full focus:outline-none"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Passengers & Class</label>
          <button
            type="button"
            onClick={() => setShowPassengerModal(!showPassengerModal)}
            className="w-full flex items-center justify-between border rounded-lg p-3"
          >
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-400 mr-2" />
              <span>{totalPassengers} Passenger(s)</span>
            </div>
            <span className="text-sm text-gray-500">
              {cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1)}
            </span>
          </button>

          {showPassengerModal && (
            <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-2 p-4 z-50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Adults</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPassengers(prev => ({...prev, adults: Math.max(1, prev.adults - 1)}))}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{passengers.adults}</span>
                    <button
                      type="button"
                      onClick={() => setPassengers(prev => ({...prev, adults: prev.adults + 1}))}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Children (2-11)</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPassengers(prev => ({...prev, children: Math.max(0, prev.children - 1)}))}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{passengers.children}</span>
                    <button
                      type="button"
                      onClick={() => setPassengers(prev => ({...prev, children: prev.children + 1}))}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Infants (0-2)</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPassengers(prev => ({...prev, infants: Math.max(0, prev.infants - 1)}))}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{passengers.infants}</span>
                    <button
                      type="button"
                      onClick={() => setPassengers(prev => ({...prev, infants: prev.infants + 1}))}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cabin Class</label>
                  <select
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value as CabinClass)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="firstClass">First Class</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto mt-6 px-8 py-3 bg-orange-500 text-white rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
      >
        <Search className="w-5 h-5 mr-2" />
        Search Flights
      </button>
    </form>
  );
}