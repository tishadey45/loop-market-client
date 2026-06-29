"use client";

import React, { useEffect, useState } from "react";
import { ShieldAlert, CheckCircle, Trash2, Search } from "lucide-react";
import { getAllProducts, deleteProduct } from "@/services/productsApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Image from "next/image";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching admin products:", error);
        toast.error("Failed to load products for moderation");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const handleAdminDelete = async (id, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to permanently delete "${title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Red button
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete listing!",
      cancelButtonText: "Cancel",
      customClass: { popup: "rounded-2xl" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id);
          setProducts((prev) => prev.filter((product) => product._id !== id));
          
          Swal.fire({
            title: "Deleted!",
            text: "The fraudulent listing has been successfully removed.",
            icon: "success",
            confirmButtonColor: "#2563eb",
            customClass: { popup: "rounded-2xl" }
          });
        } catch (error) {
          console.error(error);
          toast.error("Failed to delete product layout");
        }
      }
    });
  };

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.seller?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
      {/* Top Bar with Title and Search */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Product Listings Moderation</h1>
          <p className="text-xs text-gray-400">Approve fresh listings or delete fake reported items.</p>
        </div>
        
        {/* Real-time Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search product or seller..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered input-sm bg-white w-full text-gray-800 rounded-lg pl-8"
          />
          <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Loading, Empty and Table States */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-md text-blue-600"></span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-400 text-sm font-medium">No marketplace products available for review.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50 text-xs border-b text-gray-500 uppercase">
                <th>Product Name</th>
                <th>Seller Info</th>
                <th>Price</th>
                <th>Report/Safety Status</th>
                <th className="text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {filteredProducts.map((product) => {
                const isReported = product.reportsCount >= 3 || product.title?.toLowerCase().includes("fake");

                return (
                  <tr 
                    key={product._id} 
                    className={`transition-colors ${isReported ? "bg-red-50/40 hover:bg-red-50/70" : "hover:bg-slate-50/50"}`}
                  >
                    {/* Product Name & Image */}
                    <td className="font-semibold text-gray-800">
                      <div className="flex items-center gap-3">
                        {product.image && (
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-slate-50">
                            <Image src={product.image} alt={product.title} fill className="object-cover" />
                          </div>
                        )}
                        <span className="line-clamp-1 max-w-xs">{product.title}</span>
                      </div>
                    </td>

                    {/* Seller Name & Email */}
                    <td>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{product.seller?.name || "Unknown Seller"}</span>
                        <span className="text-xs text-gray-400">{product.seller?.email}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="font-bold text-gray-900">৳ {product.price?.toLocaleString()}</td>

                    {/* Report Status Block */}
                    <td>
                      {isReported ? (
                        <span className="text-red-500 font-semibold flex items-center gap-1 text-xs">
                          <ShieldAlert size={14} /> 
                          Flagged ({product.reportsCount || 3} Reports)
                        </span>
                      ) : (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1 text-xs">
                          <CheckCircle size={14} /> 
                          Safe / Verified
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      <button
                        onClick={() => handleAdminDelete(product._id, product.title)}
                        className="btn btn-xs bg-red-600 hover:bg-red-700 border-none text-white rounded-md gap-1 transition-all"
                      >
                        <Trash2 size={12} /> Delete Listing
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