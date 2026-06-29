"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-1">Product Listings Moderation</h1>
      <p className="text-xs text-gray-400 mb-6">Approve fresh listings or delete fake reported items.</p>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50 text-xs border-b">
              <th>Listing Name</th>
              <th>Seller Name</th>
              <th>Report Status</th>
              <th className="text-right">Approval Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
            <tr className="bg-red-50/40">
              <td className="font-bold text-gray-800">Fake Counterfeit Shoes</td>
              <td>Sakib Al Hasan</td>
              <td><span className="text-red-500 font-bold flex items-center gap-1 text-xs"><ShieldAlert size={14}/> Flagged (3 Reports)</span></td>
              <td className="text-right">
                <button className="btn btn-xs btn-error text-white rounded-md">Delete Listing</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}