import React from 'react';
import { ArrowRight, ShoppingBag, Users, CheckCircle2 } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative bg-linear-to-br from-emerald-50 via-white to-blue-50/50 py-20 lg:py-28 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-5 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 mb-6">
          <ShoppingBag size={13} /> Purely Trusted Re-commerce Platform
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Buy & Sell Pre-Loved Items in <span className="text-emerald-600 bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text">Loop Market</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Give products a second life. Connect with trusted buyers and sellers around you. Fast, secure, and completely sustainable.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-700/30 transition-all group">
            Explore Marketplace
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white text-gray-800 border border-gray-200 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm">
            Become a Seller
          </button>
        </div>
      </div>
    </div>
  );
}