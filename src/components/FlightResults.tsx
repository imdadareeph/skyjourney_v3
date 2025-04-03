import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Flight {
  flight_number: string;
  operated_by: string;
  departure: {
    airport: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    time: string;
    date: string;
  };
  duration: string;
  connections: Array<{
    airport?: string;
    flight_number: string;
    aircraft: string;
  }>;
  cabin_classes: {
    economy?: {
      price: number | null;
      currency: string;
      available: boolean;
      sold_out?: boolean;
      fare_details?: {
        hand_baggage: string;
        checked_baggage: string;
        meal: boolean;
        seat_selection: boolean;
        seat_type: string;
        rebooking: string;
        cancellation: string;
        skywards_miles: string;
      };
    };
    business?: {
      price: number;
      currency: string;
      available: boolean;
      fare_details?: {
        hand_baggage: string;
        checked_baggage: string;
        meal: boolean;
        seat_selection: boolean;
        seat_type: string;
        rebooking: string;
        cancellation: string;
        skywards_miles: string;
      };
    };
  };
}

interface FlightResultsProps {
  flights: Flight[];
  onModifySearch: () => void;
}

const FlightResults: React.FC<FlightResultsProps> = ({ 
  flights, 
  onModifySearch
}) => {
  const [expandedFlightIndex, setExpandedFlightIndex] = useState<number | null>(null);
  const filteredFlights = flights;

  const toggleFlightExpansion = (index: number) => {
    setExpandedFlightIndex(expandedFlightIndex === index ? null : index);
  };

  return (
    <div className="flight-results">
      {/* Currency Selector */}
      <div className="p-4 md:p-6 bg-white border-b">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
          <div className="flex items-start gap-4 flex-1 border rounded-lg p-4">
            <div className="mt-1">
              <svg className="w-5 h-5 text-[#0095ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm flex flex-wrap items-center gap-1">
                <span className="text-[#4a4a4a]">You are viewing fares in</span>
                <strong className="text-[#1a1a1a]">AED</strong>
                <span className="text-[#4a4a4a]">. To view fares in another currency, please change it from the drop-down list.</span>
              </div>
              <div className="text-xs text-[#666666] mt-1">
                The online exchange rates provided are indicative and intended as a guide only.
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <div className="text-xs text-[#666666] whitespace-nowrap">Available currencies</div>
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-1.5 border rounded hover:border-[#0095ff] transition-colors">
                <span className="text-sm">Emirati dirham</span>
                <div className="flex items-center gap-1 text-[#1a1a1a]">
                  <span className="text-sm font-medium">AED</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lowest Fare Section */}
      <div className="p-4 md:p-6 bg-white">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
          <div className="flex items-start gap-4 flex-1 border rounded-lg bg-[#f8fcff] p-4">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#0095ff]">
              <svg className="w-6 h-6 text-[#0095ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-[#1a1a1a]">LOWEST FARE</div>
              <div className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">AED 4,225</div>
              <div className="text-sm text-[#4a4a4a]">1 passenger</div>
              <div className="text-[#4a4a4a] text-sm mt-1">
                The fares are inclusive of all applicable taxes and surcharges for 1 Passenger (1 Adult)
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <div className="text-xs text-[#666666] whitespace-nowrap">Available fares</div>
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-1.5 border rounded hover:border-[#0095ff] transition-colors">
                <span className="text-sm">Economy</span>
                <div className="flex items-center gap-1 text-[#1a1a1a]">
                  <span className="text-sm font-medium">AED 4,225</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flight-list p-4 md:p-6 lg:pr-[340px] pb-24 lg:pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl font-semibold">Select departing flight</h2>
            <div className="text-sm text-gray-600 mt-1">
              Dubai (DXB) to London (LHR) | Thursday, 01 May 2025
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onModifySearch}
              className="text-[#0095ff] flex items-center gap-2 hover:text-[#007acc]"
            >
              Modify search
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button className="lg:hidden text-[#0095ff] flex items-center gap-2 hover:text-[#007acc]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              Expand
            </button>
          </div>
        </div>

        {/* Date Selection Bar */}
        <div className="bg-white rounded-lg shadow-sm border mb-6 overflow-x-auto">
          <div className="flex items-center min-w-[800px]">
            <button className="p-4 hover:bg-gray-50 hidden md:block">
              <svg className="w-6 h-6 text-[#0095ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex-1 grid grid-cols-7">
              <div className="text-center p-4 cursor-pointer">
                <div className="text-sm">28 April</div>
                <div className="text-xs text-gray-600">Monday</div>
                <div className="text-[#0095ff] font-medium mt-1">AED 2,085</div>
              </div>
              <div className="text-center p-4 cursor-pointer">
                <div className="text-sm">29 April</div>
                <div className="text-xs text-gray-600">Tuesday</div>
                <div className="text-[#0095ff] font-medium mt-1">AED 2,505</div>
              </div>
              <div className="text-center p-4 cursor-pointer">
                <div className="text-sm">30 April</div>
                <div className="text-xs text-gray-600">Wednesday</div>
                <div className="text-[#0095ff] font-medium mt-1">AED 1,415</div>
              </div>
              <div className="text-center p-4 cursor-pointer bg-[#0095ff] text-white">
                <div className="text-sm">01 May</div>
                <div className="text-xs opacity-90">Thursday</div>
                <div className="font-medium mt-1">AED 2,030</div>
              </div>
              <div className="text-center p-4 cursor-pointer">
                <div className="text-sm">02 May</div>
                <div className="text-xs text-gray-600">Friday</div>
                <div className="text-[#0095ff] font-medium mt-1">AED 1,575</div>
              </div>
              <div className="text-center p-4 cursor-pointer">
                <div className="text-sm">03 May</div>
                <div className="text-xs text-gray-600">Saturday</div>
                <div className="text-[#0095ff] font-medium mt-1">AED 1,415</div>
              </div>
              <div className="text-center p-4 cursor-pointer">
                <div className="text-sm">04 May</div>
                <div className="text-xs text-gray-600">Sunday</div>
                <div className="text-[#0095ff] font-medium mt-1">AED 2,225</div>
              </div>
            </div>

            <button className="p-4 hover:bg-gray-50 hidden md:block">
              <svg className="w-6 h-6 text-[#0095ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#1a1a1a]">Sort by</span>
            <button className="flex items-center gap-1 text-[#1a1a1a] hover:text-[#0095ff]">
              Duration
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {filteredFlights.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500">No flights found for the selected criteria</div>
          </div>
        ) : (
          filteredFlights.map((flight, index) => (
            <div key={index} className="flight-card bg-white hover:shadow-md transition-shadow rounded-lg border mb-4">
              <div 
                className="p-4 md:p-6 cursor-pointer relative group"
                onClick={() => toggleFlightExpansion(index)}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Left: Departure */}
                  <div className="md:col-span-3">
                    <div className="text-2xl font-bold text-[#1a1a1a]">{flight.departure.time}</div>
                    <div className="text-base text-[#4a4a4a]">Dubai</div>
                    <div className="text-sm font-medium text-[#666666]">DXB</div>
                  </div>

                  {/* Middle: Flight Details */}
                  <div className="md:col-span-5">
                    <div className="flex flex-col items-center">
                      <div className="text-base text-[#4a4a4a] mb-1">{flight.duration}</div>
                      <div className="w-full flex items-center justify-center gap-1 relative">
                        <div className="flex-grow border-t border-[#e6e6e6]"></div>
                        <div className="text-[#0095ff] text-sm">
                          {flight.connections.length === 1 && "1 connection"}
                        </div>
                        <div className="flex-grow border-t border-[#e6e6e6]"></div>
                      </div>
                      <div className="text-sm text-[#0095ff] mt-1">
                        {flight.connections.map((conn, idx) => (
                          <div key={idx} className="text-center">
                            {conn.flight_number} ({conn.aircraft})
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Arrival & Price */}
                  <div className="md:col-span-4 flex justify-between items-start pr-16">
                    <div>
                      <div className="text-2xl font-bold text-[#1a1a1a]">{flight.arrival.time}</div>
                      <div className="text-base text-[#4a4a4a]">London</div>
                      <div className="text-sm font-medium text-[#666666]">LHR</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#666666] mb-1">from</div>
                      <div className="text-2xl font-bold text-[#07349c]">
                        AED {flight.cabin_classes.economy?.price?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Updated expand/collapse button */}
                <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md border border-[#e6e6e6] group-hover:border-[#0095ff] transition-colors z-10">
                  {expandedFlightIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#0095ff]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#0095ff]" />
                  )}
                </div>
              </div>

              {/* Updated expanded content */}
              {expandedFlightIndex === index && (
                <div className="border-t bg-gradient-to-b from-[#f8f8f8] to-white p-4 md:p-6">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-[#666666] text-sm mb-6">
                      LO 0279 operated by LOT Polish Airlines
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[200px,1fr,1fr] gap-6">
                      {/* Fare Type Column */}
                      <div>
                        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-6">Fare type</h3>
                        <div className="grid gap-6">
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Hand baggage</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Checked baggage</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                              <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span>Meal</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <path d="M4 18V12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 4V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Seat selection</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <path d="M4 18V12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Seat type</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                              <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span>Rebooking</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                              <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span>Cancellation</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Skywards Miles</span>
                          </div>
                        </div>
                      </div>

                      {/* Economy Column */}
                      <div className="bg-white rounded-lg border p-6">
                        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-6">Economy Class</h3>
                        <div className="grid gap-6">
                          <div className="text-[#1a1a1a] text-base h-5 flex items-center">7 kg</div>
                          <div className="text-[#1a1a1a] text-base h-5 flex items-center">20 kg</div>
                          <div className="text-[#1a1a1a] text-base h-5 flex items-center">✓</div>
                          <div className="text-[#1a1a1a] text-base h-5 flex items-center">✓</div>
                          <div className="text-[#1a1a1a] text-base h-5 flex items-center">Standard seat</div>
                          <div className="text-[#0095ff] text-base h-5 flex items-center hover:underline cursor-pointer">Penalties apply</div>
                          <div className="text-[#0095ff] text-base h-5 flex items-center hover:underline cursor-pointer">Penalties apply</div>
                          <div className="text-[#0095ff] text-base h-5 flex items-center hover:underline cursor-pointer">More info</div>
                        </div>
                        <div className="mt-6">
                          <div className="text-2xl font-bold text-[#1a1a1a] mb-4">
                            AED {flight.cabin_classes.economy?.price?.toLocaleString()}
                          </div>
                          <button className="w-full bg-[#ff5f00] text-white py-3 rounded-lg font-medium hover:bg-[#ff4f00] transition-colors">
                            SELECT
                          </button>
                        </div>
                      </div>

                      {/* Business Column */}
                      <div className="bg-[#00436b] rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-6">Business Class</h3>
                        <div className="grid gap-6">
                          <div className="text-white text-base h-5 flex items-center">15 kg</div>
                          <div className="text-white text-base h-5 flex items-center">40 kg</div>
                          <div className="text-white text-base h-5 flex items-center">✓</div>
                          <div className="text-white text-base h-5 flex items-center">✓</div>
                          <div className="text-white text-base h-5 flex items-center">Lie-flat seat</div>
                          <div className="text-white text-base h-5 flex items-center hover:underline cursor-pointer">Penalties apply</div>
                          <div className="text-white text-base h-5 flex items-center hover:underline cursor-pointer">Penalties apply</div>
                          <div className="text-white text-base h-5 flex items-center hover:underline cursor-pointer">More info</div>
                        </div>
                        <div className="mt-6">
                          <div className="text-sm font-medium text-white mb-1">from</div>
                          <div className="text-2xl font-bold text-white mb-4">
                            AED {flight.cabin_classes.business?.price?.toLocaleString()}
                          </div>
                          <button className="w-full bg-white text-[#00436b] py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                            Check fare
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Booking Summary Sidebar - Now fixed on desktop, modal on mobile */}
      <div className="booking-summary hidden lg:block fixed top-0 right-0 w-80 h-screen bg-white border-l overflow-y-auto ml-6">
        <div className="bg-[#00436b] p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">Booking summary</h3>
          <div className="text-sm opacity-90">All times are local</div>
        </div>
        
        <div className="p-6">
          <div className="text-[#1a1a1a] font-medium">Dubai to London</div>
          <div className="text-[#4a4a4a] text-sm">(return)</div>

          <div className="mt-4">
            <div className="text-[#1a1a1a] font-medium">
              Economy | 1 passenger(s)
            </div>
            <div className="text-[#4a4a4a] text-sm">1 Adult</div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center py-3 px-4 border rounded-lg bg-[#f8fcff]">
              <div className="text-[#1a1a1a] font-medium">Total</div>
              <div className="text-xl font-bold text-[#1a1a1a]">AED 0.00</div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <button className="w-full p-3 bg-[#00436b] text-white text-left rounded-lg hover:bg-[#003557] transition-colors">
              1. Flight details
            </button>
            <button className="w-full p-3 bg-[#f8f8f8] text-[#1a1a1a] text-left rounded-lg hover:bg-[#f0f0f0] transition-colors">
              2. Extras
            </button>
            <button className="w-full p-3 bg-[#f8f8f8] text-[#1a1a1a] text-left rounded-lg hover:bg-[#f0f0f0] transition-colors">
              3. Passenger details
            </button>
            <button className="w-full p-3 bg-[#f8f8f8] text-[#1a1a1a] text-left rounded-lg hover:bg-[#f0f0f0] transition-colors">
              4. Review
            </button>
            <button className="w-full p-3 bg-[#f8f8f8] text-[#1a1a1a] text-left rounded-lg hover:bg-[#f0f0f0] transition-colors">
              5. Payment
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Booking Summary Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button className="w-full bg-[#0095ff] text-white py-3 rounded-lg font-medium hover:bg-[#007acc] transition-colors flex items-center justify-between">
          <span>View booking summary</span>
          <span className="text-xl font-bold">AED 0.00</span>
        </button>
      </div>
    </div>
  );
};

export default FlightResults; 