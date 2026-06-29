"use client";

import React from "react";
import { TrendingUp, ShoppingBag, Users, Layers, ClipboardList } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function DashboardHome() {
  const userRole = "seller";

  const salesData = [
    { name: "Jan", sales: 4000, orders: 24 },
    { name: "Feb", sales: 3000, orders: 18 },
    { name: "Mar", sales: 5000, orders: 29 },
    { name: "Apr", sales: 7800, orders: 40 },
    { name: "May", sales: 6100, orders: 33 },
    { name: "Jun", sales: 9200, orders: 45 },
  ];

  const categoryData = [
    { name: "Electronics", value: 400 },
    { name: "Mobile Phones", value: 300 },
    { name: "Fashion", value: 300 },
    { name: "Home Appliances", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-800 capitalize">{userRole} Overview</h1>
        <p className="text-sm text-gray-400 mt-1">Welcome back! Check out the current statistics and analytics trends.</p>
      </div>

      {/* CONDITIONALLY RENDER CARDS BASED ON ROLE */}
      {userRole === "seller" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-semibold text-gray-400 uppercase">Total Products</p>
            <p className="text-2xl font-black text-gray-800 mt-1">24</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-semibold text-gray-400 uppercase">Total Sales</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">12</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-semibold text-gray-400 uppercase">Total Revenue</p>
            <p className="text-2xl font-black text-blue-600 mt-1">৳ 48,500</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-semibold text-gray-400 uppercase">Pending Orders</p>
            <p className="text-2xl font-black text-amber-500 mt-1">3</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-xs flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Total Users</p>
              <p className="text-3xl font-black text-gray-800 mt-1">1,245</p>
            </div>
            <div className="p-4 bg-purple-50 text-purple-600 rounded-xl"><Users size={22}/></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-xs flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Platform Products</p>
              <p className="text-3xl font-black text-gray-800 mt-1">4,812</p>
            </div>
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl"><ShoppingBag size={22}/></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-xs flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Total Orders</p>
              <p className="text-3xl font-black text-gray-800 mt-1">9,120</p>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl"><ClipboardList size={22}/></div>
          </div>
        </div>
      )}

      {/* CHARTS GRAPH SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-blue-500"/> {userRole === "seller" ? "Monthly Sales Trend" : "User Growth Trend"}</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={userRole === "seller" ? "sales" : "orders"} stroke={userRole === "admin" ? "#a855f7" : "#2563eb"} strokeWidth={3} name={userRole === "seller" ? "Revenue (৳)" : "New Registrations"} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Layers size={16} className="text-amber-500"/> Performance Category Share</h3>
          <div className="h-64 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" label>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}