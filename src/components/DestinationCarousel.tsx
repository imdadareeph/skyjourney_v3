import React from 'react';

const destinations = [
  {
    id: 1,
    name: 'Samarkand',
    image: 'https://uzbek-travel.com/images/uz/header-about.jpg',
    description: 'Discover the ancient Silk Road city'
  },
  {
    id: 2,
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000',
    description: 'Experience luxury in the desert'
  },
  {
    id: 3,
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=2000',
    description: 'Paradise on Earth'
  },
  {
    id: 4,
    name: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=2000',
    description: 'Where tradition meets innovation'
  },
  {
    id: 5,
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=2000',
    description: 'Embrace the future'
  },
  {
    id: 6,
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=2000',
    description: 'City of Love and Light'
  }
];

export default function DestinationCarousel() {
  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Discover visa-on-arrival destinations for skyjourney
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                  <p className="text-white/80">{destination.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}