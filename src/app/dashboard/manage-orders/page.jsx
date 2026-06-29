"use client";

import React from "react";
import { Check, X } from "lucide-react";

export default function ManageOrdersPage() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-1">Customer Orders Pipeline</h1>
      <p className="text-xs text-gray-400 mb-6">Manage incoming requests and follow the state-flow.</p>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs border-b">
              <th>Order ID</th>
              <th>Buyer Information</th>
              <th>Product</th>
              <th>Order Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
            <tr>
              <td className="font-mono text-xs">#ORD-9842</td>
              <td>
                <div className="font-bold text-gray-800">Rakib Hasan</div>
                <div className="text-xs text-gray-400">017XXXXXXXX • Dhaka</div>
              </td>
              <td>iPhone 13 Pro Max</td>
              <td><span className="badge badge-warning text-xs font-semibold rounded-md">Pending</span></td>
              <td className="text-right space-x-1">
                <button className="btn btn-xs btn-success text-white rounded-md">Accept</button>
                <button className="btn btn-xs btn-error text-white rounded-md">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}