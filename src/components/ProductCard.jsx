"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTag, FaUser, FaMapMarkerAlt } from "react-icons/fa";

export default function ProductCard({ product }) {
  const {
    _id,
    title,
    category,
    condition,
    price,
    images,
    description,
    sellerInfo,
    status,
  } = product;

  console.log(product)

  const getConditionColor = (cond) => {
    switch (cond?.toLowerCase()) {
      case "like new":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 group"
    >
      {/* Product Image Section */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-50 shrink-0">
        <Image 
          src={images?.[0] || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500"} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-w-7xl) 33vw, 100vw"
        />

        {/* Condition Badge */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${getConditionColor(condition)}`}>
          {condition}
        </span>

        {/* Category Badge */}
        <span className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-full font-medium">
          {category}
        </span>
      </div>

      {/* Content Section */}
      <div className="flex flex-col grow p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-1.5 line-clamp-2 grow">
          {description}
        </p>

        {/* Product Details & Price */}
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2.5 text-sm text-gray-600">
          {/* Price Row */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 flex items-center gap-1.5">
              <FaTag className="text-xs" /> Price
            </span>
            <span className="font-extrabold text-lg text-emerald-600">
              ৳{price?.toLocaleString()}
            </span>
          </div>

          {/* Seller Row */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400 flex items-center gap-1.5">
              <FaUser className="text-xs" /> Seller
            </span>
            <span className="font-medium text-gray-700 truncate max-w-37.5">
              {sellerInfo?.name}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-5 pt-1">
          <Link href={`/products/${_id}`} className="block w-full">
            <button className="btn bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white w-full border-none rounded-xl font-medium shadow-xs hover:shadow-md transition-all">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}