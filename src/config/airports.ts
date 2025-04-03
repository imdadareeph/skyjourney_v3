export interface Airport {
  code: string;
  name: string;
  country: string;
}

export const airports: Airport[] = [
  { code: 'DXB', name: 'Dubai International Airport', country: 'United Arab Emirates' },
  { code: 'JFK', name: 'John F. Kennedy International Airport', country: 'United States' },
  { code: 'LHR', name: 'London Heathrow Airport', country: 'United Kingdom' },
  { code: 'SIN', name: 'Singapore Changi Airport', country: 'Singapore' },
  { code: 'HND', name: 'Tokyo Haneda Airport', country: 'Japan' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', country: 'France' },
  { code: 'FRA', name: 'Frankfurt Airport', country: 'Germany' },
  { code: 'IST', name: 'Istanbul Airport', country: 'Turkey' },
  { code: 'AUH', name: 'Abu Dhabi International Airport', country: 'United Arab Emirates' },
  { code: 'DOH', name: 'Hamad International Airport', country: 'Qatar' }
];