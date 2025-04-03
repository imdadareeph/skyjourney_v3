import React from 'react';
import { Hotel, Car, Plane, Package, CreditCard, Umbrella } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Hotels',
    icon: Hotel,
    description: 'Find the perfect stay',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 2,
    name: 'Car Rentals',
    icon: Car,
    description: 'Freedom to explore',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 3,
    name: 'Flight + Hotel',
    icon: Plane,
    description: 'Save with packages',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 4,
    name: 'Holiday Packages',
    icon: Package,
    description: 'Complete vacation deals',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 5,
    name: 'Travel Insurance',
    icon: Umbrella,
    description: 'Travel with peace of mind',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 6,
    name: 'Travel Card',
    icon: CreditCard,
    description: 'Earn travel rewards',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=500'
  }
];

export default function OtherServices() {
  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Other Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <service.icon className="w-12 h-12 mb-3" />
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-sm text-center opacity-90">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}