"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Search, ShieldAlert, UserCheck } from "lucide-react";
import { getAllUsers, updateUserRole, blockUser } from "@/services/usersApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load platform users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? { ...user, role: newRole } : user))
      );
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user role");
    }
  };

  const handleBlockToggle = async (user) => {
    const isCurrentlyBlocked = user.status === "blocked";
    const actionText = isCurrentlyBlocked ? "Unblock" : "Block";

    Swal.fire({
      title: `${actionText} this user?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isCurrentlyBlocked ? "#10b981" : "#d97706",
      cancelButtonColor: "#64748b",
      confirmButtonText: `Yes, ${actionText}!`,
      customClass: { popup: "rounded-2xl" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await blockUser(user._id);
          const newStatus = isCurrentlyBlocked ? "active" : "blocked";
          setUsers((prevUsers) =>
            prevUsers.map((u) => (u._id === user._id ? { ...u, status: newStatus } : u))
          );

          Swal.fire({
            title: `${actionText}ed!`,
            text: `User has been successfully ${actionText.toLowerCase()}ed.`,
            icon: "success",
            confirmButtonColor: "#2563eb",
            customClass: { popup: "rounded-2xl" }
          });
        } catch (error) {
          console.error(error);
          toast.error(`Failed to ${actionText.toLowerCase()} user`);
        }
      }
    });
  };

  const handleRemoveUser = async (userId, name) => {
    Swal.fire({
      title: "Remove User Permanently?",
      text: `This will completely delete ${name} from the platform.`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete Entirely!",
      customClass: { popup: "rounded-2xl" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
          toast.success("User removed from platform");
        } catch (error) {
          console.error(error);
          toast.error("Failed to remove user");
        }
      }
    });
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Global Platform Users Control</h1>
          <p className="text-xs text-gray-400 mt-0.5">Block, Unblock, or Remove users entirely.</p>
        </div>
        
        {/* Live Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search user by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered input-sm bg-white w-full text-gray-800 rounded-lg pl-8"
          />
          <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Loading, Empty and Table Component UI */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-md text-blue-600"></span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-400 text-sm font-medium">No users found matching the criteria.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50 text-xs border-b text-gray-500 uppercase">
                <th>User Details</th>
                <th>Role (Changeable)</th>
                <th>Status</th>
                <th className="text-right">Control Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {filteredUsers.map((user) => {
                const isBlocked = user.status === "blocked";

                return (
                  <tr key={user._id} className={`transition-colors ${isBlocked ? "bg-amber-50/30" : "hover:bg-slate-50/50"}`}>
                    {/* User Details */}
                    <td>
                      <div className="font-bold text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </td>

                    {/* Role Dropdown */}
                    <td>
                      <select
                        value={user.role || "seller"}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="select select-bordered select-xs bg-white text-gray-800 rounded-md font-medium"
                      >
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span className={`badge badge-sm font-semibold text-white border-none ${
                        isBlocked ? "badge-error bg-red-500" : "badge-success bg-emerald-500"
                      }`}>
                        {user.status || "active"}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="text-right space-x-1">
                      {/* Block/Unblock Button Toggle */}
                      <button
                        onClick={() => handleBlockToggle(user)}
                        className={`btn btn-xs rounded-md border transition-colors ${
                          isBlocked 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                            : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        {isBlocked ? (
                          <span className="flex items-center gap-1"><UserCheck size={12} /> Unblock</span>
                        ) : (
                          <span className="flex items-center gap-1"><ShieldAlert size={12} /> Block User</span>
                        )}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleRemoveUser(user._id, user.name)}
                        className="btn btn-xs bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}