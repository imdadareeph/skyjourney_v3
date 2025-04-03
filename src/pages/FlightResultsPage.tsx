import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightResults from '../components/FlightResults';
import flightData from '../config/flight-pricing.json';

const FlightResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state?.searchParams;

  // If no search params are present, redirect to search page
  if (!searchParams) {
    navigate('/');
    return null;
  }

  const handleModifySearch = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FlightResults
        flights={flightData.flights}
        searchParams={searchParams}
        onModifySearch={handleModifySearch}
      />
    </div>
  );
};

export default FlightResultsPage; 