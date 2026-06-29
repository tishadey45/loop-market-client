"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";

export default function MyProductsPage() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">My Product Listings</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage, edit, or delete your items.</p>
        </div>
        <input type="text" placeholder="Search & filter products..." className="input input-bordered input-sm bg-white w-full sm:max-w-xs text-gray-800 rounded-lg" />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b">
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
            <tr>
              <td className="font-bold text-gray-800">iPhone 13 Pro Max</td>
              <td>Mobile Phones</td>
              <td>৳ 72,000</td>
              <td>1</td>
              <td className="flex justify-center gap-2">
                <button className="btn btn-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-md hover:bg-amber-100"><Edit size={14} /> Edit</button>
                <button className="btn btn-xs bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100"><Trash2 size={14} /> Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}