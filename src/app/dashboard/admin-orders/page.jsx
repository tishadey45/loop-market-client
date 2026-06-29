"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { cancelBooking, getAllBookings } from "@/services/bookingApi";
import toast from "react-hot-toast";
import Image from "next/image";
import Swal from "sweetalert2";
import { Calendar, ShoppingBag, Ban } from "lucide-react";

export default function OrdersPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const userData = authClient.useSession();
  const user = userData?.data?.user;

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getAllBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const handleCancelOrder = async (bookingId) => {
    Swal.fire({
      title: "Cancel this order?",
      text: "Are you sure you want to cancel your booking for this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      customClass: { popup: "rounded-2xl" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await cancelBooking(bookingId);
          setBookings((prev) => prev.filter((b) => b._id !== bookingId));
          
          Swal.fire({
            title: "Cancelled!",
            text: "Your order has been cancelled successfully.",
            icon: "success",
            confirmButtonColor: "#10b981",
            customClass: { popup: "rounded-2xl" }
          });
        } catch (error) {
          console.error(error);
          toast.error("Failed to cancel order");
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="text-emerald-600" size={22} />
            All Bookings
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">Track all customer bookings and manage them.</p>
        </div>
      </div>

      {/* Loading & Empty State States */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-md text-emerald-600"></span>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-400 text-sm font-medium">You haven&apos;t ordered any products yet.</p>
        </div>
      ) : (
        /* Orders Table */
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b">
                <th>Product Information</th>
                <th>Price</th>
                <th>Customer&apos;s Email</th>
                <th>Order Date</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="font-semibold text-gray-800">
                    <div className="flex items-center gap-3">
                      {booking.productImage && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 bg-slate-50">
                          <Image src={booking.productImage} alt={booking.productTitle} fill className="object-cover" />
                        </div>
                      )}
                      <span className="line-clamp-1 max-w-xs">{booking.productTitle}</span>
                    </div>
                  </td>
                  <td className="font-bold text-slate-900">৳ {booking.price?.toLocaleString()}</td>
                  <td className="text-gray-500 font-medium">{booking.buyerEmail}</td>
                  <td className="text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-gray-400" />
                      <span>{new Date(booking.orderDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-sm rounded-md p-2 font-medium border-none capitalize ${
                      booking.status === "pending" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                    }`}>
                      {booking.status || "pending"}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleCancelOrder(booking._id)}
                        className="btn btn-xs bg-red-50 text-red-700 border border-red-100 rounded-md hover:bg-red-100 transition-colors gap-1"
                      >
                        <Ban size={12} /> Cancel Order
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}