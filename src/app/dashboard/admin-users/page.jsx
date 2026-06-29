"use client";

import React from "react";
import { Trash2 } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Global Platform Users Control</h1>
          <p className="text-xs text-gray-400 mt-0.5">Block, Unblock, or Remove users entirely.</p>
        </div>
        <input type="text" placeholder="Search user by name..." className="input input-bordered input-sm bg-white w-full sm:max-w-xs text-gray-800 rounded-lg" />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50 text-xs border-b">
              <th>User Details</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right">Control Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
            <tr>
              <td>
                <div className="font-bold text-gray-800">Asif Faisal</div>
                <div className="text-xs text-gray-400">asif@gmail.com</div>
              </td>
              <td>Seller</td>
              <td><span className="badge badge-success badge-sm text-white">Active</span></td>
              <td className="text-right space-x-1">
                <button className="btn btn-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-md hover:bg-amber-100">Block User</button>
                <button className="btn btn-xs bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100"><Trash2 size={14}/></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}