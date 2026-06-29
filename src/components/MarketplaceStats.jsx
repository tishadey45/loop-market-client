import React from 'react';
import { Package, UserCheck, Users, ShoppingCart } from 'lucide-react';

export default function MarketplaceStats() {
  const stats = [
    {
      id: 1,
      label: "Total Products",
      value: "12,450+",
      icon: <Package className="text-blue-600" size={24} />,
      bg: "bg-blue-50"
    },
    {
      id: 2,
      label: "Total Sellers",
      value: "3,820+",
      icon: <UserCheck className="text-emerald-600" size={24} />,
      bg: "bg-emerald-50"
    },
    {
      id: 3,
      label: "Total Buyers",
      value: "24,900+",
      icon: <Users className="text-purple-600" size={24} />,
      bg: "bg-purple-50"
    },
    {
      id: 4,
      label: "Completed Orders",
      value: "9,180+",
      icon: <ShoppingCart className="text-amber-600" size={24} />,
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="border border-gray-100 rounded-2xl p-6 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4 hover:border-gray-200 transition-colors"
            >
              {/* Icon Container */}
              <div className={`p-4 rounded-xl shrink-0 ${stat.bg}`}>
                {stat.icon}
              </div>
              
              {/* Count Details */}
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs font-semibold text-gray-400 mt-0.5 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}