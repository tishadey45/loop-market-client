"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, PlusCircle, ShoppingBag, ClipboardList, 
  Users, PackageCheck, LogOut
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  // const userRole = user?.role 
  const userRole = "seller";
  const isActive = (path) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className={`p-2 rounded-xl text-white ${userRole === "admin" ? "bg-purple-600" : "bg-blue-600"}`}>
              <ShoppingBag size={20} />
            </div>
            <span className="font-black text-xl text-gray-800">LoopMarket</span>
          </div>

          <div className="px-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {userRole === "admin" ? "Admin Panel" : "Seller Panel"}
            </p>
          </div>

          <div className="divider my-0"></div>

          {/* ---------------- SELLER ROUTED MENU ---------------- */}
          {userRole === "seller" && (
            <nav className="space-y-1">
              <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive("/dashboard") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
                <LayoutDashboard size={18} /> Dashboard Home
              </Link>
              <Link href="/dashboard/add-product" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive("/dashboard/add-product") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
                <PlusCircle size={18} /> Add Product
              </Link>
              <Link href="/dashboard/my-products" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive("/dashboard/my-products") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
                <ShoppingBag size={18} /> My Products
              </Link>
              <Link href="/dashboard/manage-orders" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive("/dashboard/manage-orders") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
                <ClipboardList size={18} /> Manage Orders
              </Link>
            </nav>
          )}

          {/* ---------------- ADMIN ROUTED MENU ---------------- */}
          {userRole === "seller" && (
            <nav className="space-y-1">
              <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive("/dashboard") ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:bg-gray-50"}`}>
                <LayoutDashboard size={18} /> Dashboard Home
              </Link>
              <Link href="/dashboard/admin-users" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive("/dashboard/admin-users") ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:bg-gray-50"}`}>
                <Users size={18} /> Manage Users
              </Link>
              <Link href="/dashboard/admin-products" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive("/dashboard/admin-products") ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:bg-gray-50"}`}>
                <PackageCheck size={18} /> Manage Products
              </Link>
              <Link href="/dashboard/admin-orders" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive("/dashboard/admin-orders") ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:bg-gray-50"}`}>
                <ClipboardList size={18} /> Manage Orders
              </Link>
            </nav>
          )}
        </div>
        
        <div className="border-t pt-4">
          <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl font-medium transition-all text-sm">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* RENDER DYNAMIC NESTED PAGES */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}