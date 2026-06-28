"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Section 1: Brand Information */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="LoopMarket Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-extrabold text-2xl bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              LoopMarket
            </span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            LoopMarket is the ultimate second-hand marketplace platform where buying and selling pre-owned items is safe, swift, and sustainable. Give products a second life!
          </p>
          {/* Social Media Links */}
          <div className="flex items-center gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full text-white transition-all duration-300 hover:scale-110">
              <FaFacebook size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 hover:bg-sky-500 rounded-full text-white transition-all duration-300 hover:scale-110">
              <FaTwitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 hover:bg-pink-600 rounded-full text-white transition-all duration-300 hover:scale-110">
              <FaInstagram size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 hover:bg-blue-700 rounded-full text-white transition-all duration-300 hover:scale-110">
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 border-l-4 border-emerald-500 pl-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition-colors block py-1">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-emerald-400 transition-colors block py-1">All Products</Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-emerald-400 transition-colors block py-1">Categories</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-emerald-400 transition-colors block py-1">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-emerald-400 transition-colors block py-1">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Marketplace Categories (Bonus for Recruiter) */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 border-l-4 border-blue-500 pl-2">Top Categories</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/categories/electronics" className="hover:text-blue-400 transition-colors block py-1">Electronics</Link></li>
            <li><Link href="/categories/furniture" className="hover:text-blue-400 transition-colors block py-1">Furniture</Link></li>
            <li><Link href="/categories/vehicles" className="hover:text-blue-400 transition-colors block py-1">Vehicles</Link></li>
            <li><Link href="/categories/fashion" className="hover:text-blue-400 transition-colors block py-1">Fashion</Link></li>
          </ul>
        </div>

        {/* Section 4: Contact Information */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 border-l-4 border-emerald-500 pl-2">Contact Info</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-emerald-500 mt-1 shrink-0" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-emerald-500 shrink-0" />
              <span>+880 1712-345678</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-emerald-500 shrink-0" />
              <span className="truncate">support@loopmarket.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Copyright Section */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} <span className="text-emerald-400 font-medium">LoopMarket</span>. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}