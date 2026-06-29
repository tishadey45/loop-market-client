"use client";

import React, { useEffect, useState } from "react";
import { Edit, Trash2, X, Check } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getMyProducts, updateProduct, deleteProduct } from "@/services/productsApi";
import toast from "react-hot-toast";
import Image from "next/image";
import Swal from "sweetalert2";

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  

  const [editingProduct, setEditingProduct] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const userData = authClient.useSession();
  const user = userData?.data?.user;

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyProducts = async () => {
      try {
        setLoading(true);
        const data = await getMyProducts(user.email);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, [user?.email]);

const handleDelete = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this product listing!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb", // Tailwind blue-600 color
    cancelButtonColor: "#ef4444",  // Tailwind red-500 color
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    background: "#ffffff",
    customClass: {
      popup: "rounded-2xl",
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((product) => product._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
          confirmButtonColor: "#2563eb",
          customClass: {
            popup: "rounded-2xl",
          }
        });
        

      } catch (error) {
        console.error(error);
        
        Swal.fire({
          title: "Error!",
          text: "Failed to delete product.",
          icon: "error",
          confirmButtonColor: "#2563eb",
          customClass: {
            popup: "rounded-2xl",
          }
        });
      }
    }
  });
};
  const openEditModal = (product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      setUpdateLoading(true);
      const updatedData = {
        title: editingProduct.title,
        category: editingProduct.category,
        condition: editingProduct.condition,
        price: Number(editingProduct.price),
        stock: Number(editingProduct.stock),
        description: editingProduct.description,
        status: editingProduct.status,
      };

      await updateProduct(editingProduct._id, updatedData);
      
      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct._id ? { ...p, ...updatedData } : p))
      );

      toast.success("Product updated successfully");
      setEditingProduct(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    } finally {
      setUpdateLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 relative">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">My Products</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage, edit, or delete your items.</p>
        </div>
        <input
          type="text"
          placeholder="Search product name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered input-sm bg-white w-full sm:max-w-xs text-gray-800 rounded-lg"
        />
      </div>

      {/* Loading & Empty State Wrapper */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-md text-blue-600"></span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-400 text-sm font-medium">No products found.</p>
        </div>
      ) : (
        /* Dynamic Products Table */
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b">
                <th>Product</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="font-semibold text-gray-800">
                    <div className="flex items-center gap-3">
                      {product.image && (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-100">
                          <Image src={product.image} alt={product.title} fill className="object-cover" />
                        </div>
                      )}
                      <span className="line-clamp-1">{product.title}</span>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <span className="badge badge-sm bg-slate-100 text-slate-700 border-none rounded-md p-2">
                      {product.condition}
                    </span>
                  </td>
                  <td className="font-bold text-slate-900">৳ {product.price?.toLocaleString()}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`badge badge-sm rounded-md p-2 font-medium border-none ${
                      product.status === "available" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {product.status || "available"}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="btn btn-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-md hover:bg-amber-100"
                      >
                        <Edit size={13} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-xs bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DaisyUI Custom Modal for Editing Product */}
      {editingProduct && (
        <div className="modal modal-open">
          <div className="modal-box bg-white max-w-lg rounded-2xl border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="font-bold text-lg text-slate-800">Edit Product Info</h3>
              <button onClick={() => setEditingProduct(null)} className="btn btn-sm btn-circle btn-ghost text-slate-500">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="label-text font-semibold text-gray-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="input input-bordered w-full bg-white text-gray-800 rounded-xl input-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-text font-semibold text-gray-700 block mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="select select-bordered w-full bg-white text-gray-800 rounded-xl select-sm"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Mobile Phones">Mobile Phones</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home Appliances">Home Appliances</option>
                  </select>
                </div>
                <div>
                  <label className="label-text font-semibold text-gray-700 block mb-1">Condition</label>
                  <select
                    value={editingProduct.condition}
                    onChange={(e) => setEditingProduct({ ...editingProduct, condition: e.target.value })}
                    className="select select-bordered w-full bg-white text-gray-800 rounded-xl select-sm"
                  >
                    <option value="Used">Used</option>
                    <option value="Like New">Like New</option>
                    <option value="Refurbished">Refurbished</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-text font-semibold text-gray-700 block mb-1">Price (৳)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="input input-bordered w-full bg-white text-gray-800 rounded-xl input-sm"
                  />
                </div>
                <div>
                  <label className="label-text font-semibold text-gray-700 block mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="input input-bordered w-full bg-white text-gray-800 rounded-xl input-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="label-text font-semibold text-gray-700 block mb-1">Status</label>
                  <select
                    value={editingProduct.status || "available"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value })}
                    className="select select-bordered w-full bg-white text-gray-800 rounded-xl select-sm"
                  >
                    <option value="available">Available</option>
                    <option value="sold out">Sold Out</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label-text font-semibold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="textarea textarea-bordered w-full bg-white text-gray-800 rounded-xl resize-none text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingProduct(null)} className="btn btn-sm btn-ghost rounded-lg">
                  Cancel
                </button>
                <button type="submit" disabled={updateLoading} className="btn btn-sm btn-primary rounded-lg px-4 text-white">
                  {updateLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}