import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SpeedInsights } from "@vercel/speed-insights/next";

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

const AirlineLogo: React.FC<{ airline: 'JU' | 'FZ' }> = ({ airline }) => {
  if (airline === 'JU') {
    return (
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <rect width="100" height="40" fill="#CE0B24"/>
        <text x="50" y="25" fontFamily="Arial" fontSize="16" fill="white" textAnchor="middle" fontWeight="bold">
          Air Serbia
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <rect width="100" height="40" fill="#00A0E3"/>
      <text x="50" y="25" fontFamily="Arial" fontSize="16" fill="white" textAnchor="middle" fontWeight="bold">
        flydubai
      </text>
    </svg>
  );
};

const FlightResults: React.FC<FlightResultsProps> = ({ 
  flights, 
  onModifySearch
}) => {
  const [expandedFlightIndex, setExpandedFlightIndex] = useState<number | null>(null);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const filteredFlights = flights;

  const toggleFlightExpansion = (index: number) => {
    setExpandedFlightIndex(expandedFlightIndex === index ? null : index);
    setShowBusinessDetails(false);
  };

  const toggleCurrency = () => {
    setIsCurrencyOpen(!isCurrencyOpen);
  };

  const toggleBusinessDetails = () => {
    setShowBusinessDetails(!showBusinessDetails);
  };

  const handleConnectionClick = (e: React.MouseEvent, flight: Flight) => {
    e.stopPropagation();
    setSelectedFlight(flight);
    setShowConnectionModal(true);
  };

  return (
    <div className="flight-results relative">
      <SpeedInsights />
      {/* Currency and Lowest Fare Sections */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          {/* Currency Selector */}
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
              <div className="flex items-start gap-4 flex-1 border rounded-lg bg-[#f8fcff] p-4">
                <div className="mt-1">
                  <svg className="w-5 h-5 text-[#0095ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
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
                    <div className="flex flex-col items-end min-w-[280px]">
                      <div className="w-full">
                        <div className="relative">
                          <button 
                            onClick={toggleCurrency}
                            className="w-full flex items-center justify-between gap-2 px-3 py-1.5 border rounded hover:border-[#0095ff] transition-colors bg-white"
                          >
                            <span className="text-sm">Emirati dirham</span>
                            <div className="flex items-center gap-1 text-[#1a1a1a]">
                              <span className="text-sm font-medium">AED</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </div>
                          </button>

                          {isCurrencyOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 border rounded-lg bg-white shadow-lg z-50">
                              <div className="p-3 border-b">
                                <div className="text-sm font-medium text-[#00436b]">Preferred currency</div>
                                <button className="w-full flex items-center justify-between gap-2 p-2 mt-1 hover:bg-[#f8fcff] rounded transition-colors">
                                  <span className="text-sm">Egyptian pound</span>
                                  <span className="text-sm font-medium">EGP</span>
                                </button>
                              </div>

                              <div className="p-3">
                                <div className="text-sm font-medium text-[#00436b]">Other currencies</div>
                                <div className="mt-1 space-y-1">
                                  <button className="w-full flex items-center justify-between gap-2 p-2 hover:bg-[#f8fcff] rounded transition-colors">
                                    <span className="text-sm">Emirati dirham</span>
                                    <span className="text-sm font-medium">AED</span>
                                  </button>
                                  <button className="w-full flex items-center justify-between gap-2 p-2 hover:bg-[#f8fcff] rounded transition-colors">
                                    <span className="text-sm">United States dollar</span>
                                    <span className="text-sm font-medium">USD</span>
                                  </button>
                                  <button className="w-full flex items-center justify-between gap-2 p-2 hover:bg-[#f8fcff] rounded transition-colors">
                                    <span className="text-sm">Euro</span>
                                    <span className="text-sm font-medium">EUR</span>
                                  </button>
                                  <button className="w-full flex items-center justify-between gap-2 p-2 hover:bg-[#f8fcff] rounded transition-colors">
                                    <span className="text-sm">British pound</span>
                                    <span className="text-sm font-medium">GBP</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lowest Fare Section */}
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
              <div className="flex items-start gap-4 flex-1 border rounded-lg bg-gradient-to-r from-[#f8fcff] to-white p-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#0095ff]" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
                      <circle cx="20" cy="20" r="16" fill="currentColor" fillOpacity="0.1"/>
                      <path d="M14 20L18 24L26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col">
                    <div className="text-base font-semibold text-[#1a1a1a] uppercase tracking-wide">Lowest fare</div>
                    <div className="flex items-baseline gap-3">
                      <div className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">AED 4,225</div>
                      <div className="text-sm text-[#4a4a4a]">1 passenger</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Flight List Section */}
          <div className="flex-1">
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Select departing flight</h2>
                  <div className="text-sm text-[#4a4a4a] mt-1">
                    Dubai (DXB) to London (LHR) | Thursday, 01 May 2025
                  </div>
                </div>
                <button 
                  onClick={onModifySearch}
                  className="text-[#0095ff] flex items-center gap-2 hover:text-[#007acc]"
                >
                  Modify search
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
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
                <div className="space-y-4">
                  {filteredFlights.map((flight, index) => (
                    <div key={index} className="flight-card bg-white hover:shadow-md transition-shadow rounded-lg border">
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
                                  {flight.connections && flight.connections.length > 0 && (
                                    <button 
                                      onClick={(e) => handleConnectionClick(e, flight)}
                                      className="hover:underline"
                                    >
                                      1 connection
                                    </button>
                                  )}
                                </div>
                                <div className="flex-grow border-t border-[#e6e6e6]"></div>
                              </div>
                              <div className="text-sm text-[#0095ff] mt-1">
                                {flight.connections && flight.connections.map((conn, idx) => (
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
                              <div className="p-4">
                                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-6">Fare type</h3>
                                <div className="grid grid-rows-[repeat(8,minmax(42px,auto))] gap-0">
                                  <div className="flex items-center gap-3 border-b border-[#e6e6e6] h-10">
                                    <svg className="w-5 h-5 text-[#1a1a1a] shrink-0" viewBox="0 0 24 24" fill="none">
                                      <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Hand baggage</span>
                                  </div>
                                  <div className="flex items-center gap-3 border-b border-[#e6e6e6] h-10">
                                    <svg className="w-5 h-5 text-[#1a1a1a] shrink-0" viewBox="0 0 24 24" fill="none">
                                      <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Checked baggage</span>
                                  </div>
                                  <div className="flex items-center gap-3 border-b border-[#e6e6e6] h-10">
                                    <svg className="w-5 h-5 text-[#1a1a1a] shrink-0" viewBox="0 0 24 24" fill="none">
                                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <span>Meal</span>
                                  </div>
                                  <div className="flex items-center gap-3 border-b border-[#e6e6e6] h-10">
                                    <svg className="w-5 h-5 text-[#1a1a1a] shrink-0" viewBox="0 0 24 24" fill="none">
                                      <path d="M4 18V12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Seat selection</span>
                                  </div>
                                  <div className="flex items-center gap-3 border-b border-[#e6e6e6] h-10">
                                    <svg className="w-5 h-5 text-[#1a1a1a] shrink-0" viewBox="0 0 24 24" fill="none">
                                      <path d="M4 18V12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Seat type</span>
                                  </div>
                                  <div className="flex items-center gap-3 border-b border-[#e6e6e6] h-10">
                                    <svg className="w-5 h-5 text-[#1a1a1a] shrink-0" viewBox="0 0 24 24" fill="none">
                                      <path d="M4 18V12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Rebooking</span>
                                  </div>
                                  <div className="flex items-center gap-3 border-b border-[#e6e6e6] h-10">
                                    <svg className="w-5 h-5 text-[#1a1a1a] shrink-0" viewBox="0 0 24 24" fill="none">
                                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                      <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <span>Cancellation</span>
                                  </div>
                                  <div className="flex items-center gap-3 border-b border-[#e6e6e6] h-10">
                                    <svg className="w-5 h-5 text-[#1a1a1a] shrink-0" viewBox="0 0 24 24" fill="none">
                                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Skywards Miles</span>
                                  </div>
                                </div>
                              </div>

                              {/* Economy Column */}
                              <div className="bg-white border flex-col p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-6">Economy Class</h3>
                                <div className="grid grid-rows-[repeat(8,minmax(42px,auto))] gap-0 flex-1">
                                  <div className="flex items-center h-10 border-b border-[#e6e6e6]">7 kg</div>
                                  <div className="flex items-center h-10 border-b border-[#e6e6e6]">20 kg</div>
                                  <div className="flex items-center h-10 border-b border-[#e6e6e6]">✓</div>
                                  <div className="flex items-center h-10 border-b border-[#e6e6e6]">✓</div>
                                  <div className="flex items-center h-10 border-b border-[#e6e6e6]">Standard seat</div>
                                  <div className="flex items-center h-10 border-b border-[#e6e6e6] text-[#0095ff] hover:underline cursor-pointer">Penalties apply</div>
                                  <div className="flex items-center h-10 border-b border-[#e6e6e6] text-[#0095ff] hover:underline cursor-pointer">Penalties apply</div>
                                  <div className="flex items-center h-10 text-[#0095ff] hover:underline cursor-pointer">More info</div>
                                </div>
                                <div className="mt-4 pt-6 border-t">
                                  <div className="text-2xl font-bold text-[#1a1a1a] mb-4">
                                    AED 2,725
                                  </div>
                                  <button className="w-full bg-[#ff5f00] text-white py-3 rounded-lg font-medium hover:bg-[#ff4f00] transition-colors">
                                    SELECT
                                  </button>
                                </div>
                              </div>

                              {/* Business Column */}
                              <div className="bg-[#00436b] rounded-lg p-4 flex flex-col">
                                <h3 className="text-lg font-semibold text-white mb-6">Business Class</h3>
                                {!showBusinessDetails ? (
                                  <>
                                    <div className="space-y-4">
                                      <div className="space-y-4">
                                        <div>
                                          <img 
                                            src="/images/j-class-max-food-service-356x268_tcm11-162662.jpg" 
                                            alt="Business Class Dining Service" 
                                            className="w-full h-32 object-cover rounded-lg"
                                          />
                                          <div className="text-sm text-center mt-2 text-white">Dining Service</div>
                                        </div>
                                        <div>
                                          <img 
                                            src="/images/j-class-max-flatbed-man-356x268_tcm11-162664.jpg" 
                                            alt="Business Class Flatbed" 
                                            className="w-full h-32 object-cover rounded-lg"
                                          />
                                          <div className="text-sm text-center mt-2 text-white">Flatbed</div>
                                        </div>
                                        <div>
                                          <img 
                                            src="/images/j-class-flatbed-356x268_tcm11-142636.jpg" 
                                            alt="Business Class Seat" 
                                            className="w-full h-32 object-cover rounded-lg"
                                          />
                                          <div className="text-sm text-center mt-2 text-white">Seat</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-4 pt-6 border-t border-[#ffffff33]">
                                      <div className="text-2xl font-bold text-white mb-4">
                                        AED {flight.cabin_classes.business?.price?.toLocaleString()}
                                      </div>
                                      <button 
                                        onClick={toggleBusinessDetails}
                                        className="w-full bg-white text-[#00436b] py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                                      >
                                        Check fare
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="grid grid-rows-[repeat(8,minmax(42px,auto))] gap-0 flex-1">
                                      <div className="flex items-center h-10 border-b border-[#ffffff33] text-white">14 kg</div>
                                      <div className="flex items-center h-10 border-b border-[#ffffff33] text-white">40 kg</div>
                                      <div className="flex items-center h-10 border-b border-[#ffffff33] text-white">✓</div>
                                      <div className="flex items-center h-10 border-b border-[#ffffff33] text-white">✓</div>
                                      <div className="flex items-center h-10 border-b border-[#ffffff33] text-white">Lie-flat seat</div>
                                      <div className="flex items-center h-10 border-b border-[#ffffff33] text-white hover:underline cursor-pointer">Penalties apply</div>
                                      <div className="flex items-center h-10 border-b border-[#ffffff33] text-white hover:underline cursor-pointer">Penalties apply</div>
                                      <div className="flex items-center h-10 text-white">More info</div>
                                    </div>
                                    <div className="mt-4 pt-6 border-t border-[#ffffff33]">
                                      <div className="text-2xl font-bold text-white mb-4">
                                        AED {flight.cabin_classes.business?.price?.toLocaleString()}
                                      </div>
                                      <button 
                                        onClick={toggleBusinessDetails}
                                        className="w-full bg-white text-[#00436b] py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                                      >
                                        SELECT
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="hidden lg:block w-[320px] bg-white border-l shadow-lg">
            <div className="bg-[#00436b] p-6 text-white">
              <h2 className="text-xl font-semibold mb-2">Booking summary</h2>
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
        </div>
      </div>

      {/* Mobile Booking Summary Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button className="w-full bg-[#0095ff] text-white py-3 rounded-lg font-medium hover:bg-[#007acc] transition-colors flex items-center justify-between">
          <span>View booking summary</span>
          <span className="text-xl font-bold">AED 0.00</span>
        </button>
      </div>

      {/* Connection Modal */}
      {showConnectionModal && selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full mx-4 relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-semibold text-[#1a1a1a]">London (LHR) to Dubai (DXB)</h2>
                <div className="text-sm text-[#666666] mt-1">Total Duration: 14h 35min</div>
              </div>
              <button 
                onClick={() => setShowConnectionModal(false)}
                className="text-[#666666] hover:text-[#1a1a1a]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* First Flight */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8">
                    <AirlineLogo airline="JU" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#1a1a1a] font-medium">London (LHR) to Belgrade (BEG)</span>
                      <span className="text-sm text-[#666666]">| JU 0211</span>
                    </div>
                    <div className="text-sm text-[#666666]">Aircraft (A319-100)</div>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                  <div>
                    <div className="text-2xl font-bold text-[#1a1a1a]">13:30</div>
                    <div className="text-[#4a4a4a]">07 June 2025, Saturday</div>
                    <div className="text-sm font-medium text-[#666666]">London Heathrow Airport, Terminal 4</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#4a4a4a] mb-1">02h 40min</div>
                    <div className="text-sm text-[#666666]">Non-stop</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#1a1a1a]">17:10</div>
                    <div className="text-[#4a4a4a]">07 June 2025, Saturday</div>
                    <div className="text-sm font-medium text-[#666666]">Belgrade Airport, Terminal 2</div>
                  </div>
                </div>
              </div>

              {/* Connection Info */}
              <div className="bg-[#f8fcff] p-4 rounded-lg mb-8">
                <div className="text-center">
                  <div className="text-[#1a1a1a] font-medium">Stopover in Belgrade (BEG)</div>
                  <div className="text-sm text-[#666666]">06h 35min</div>
                </div>
              </div>

              {/* Second Flight */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8">
                    <AirlineLogo airline="FZ" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#1a1a1a] font-medium">Belgrade (BEG) to Dubai (DXB)</span>
                      <span className="text-sm text-[#666666]">| FZ 1750</span>
                    </div>
                    <div className="text-sm text-[#666666]">Aircraft (B737 MAX 8)</div>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                  <div>
                    <div className="text-2xl font-bold text-[#1a1a1a]">23:45</div>
                    <div className="text-[#4a4a4a]">07 June 2025, Saturday</div>
                    <div className="text-sm font-medium text-[#666666]">Belgrade Airport, Terminal 2</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#4a4a4a] mb-1">05h 20min</div>
                    <div className="text-sm text-[#666666]">Non-stop</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#1a1a1a]">07:05</div>
                    <div className="text-[#4a4a4a]">08 June 2025, Sunday</div>
                    <div className="text-sm font-medium text-[#666666]">Dubai International Airport, Terminal 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightResults; 