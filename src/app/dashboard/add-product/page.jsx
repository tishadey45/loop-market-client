/* eslint-disable react-hooks/incompatible-library */
"use client";

import { authClient } from "@/lib/auth-client"; 
import { addProduct } from "@/services/productsApi";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCoins, FaLayerGroup, FaInfoCircle } from "react-icons/fa";
import { PiSubtitlesDuotone } from "react-icons/pi";
import { TbPhoto } from "react-icons/tb";
import { MdCategory, MdMiscellaneousServices } from "react-icons/md";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const userData = authClient.useSession();
  const user = userData?.data?.user;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const imageFile = watch("image");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("condition", data.condition);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("description", data.description);
      formData.append("image", data.image[0]);
      formData.append("status", "available");

      formData.append(
        "seller",
        JSON.stringify({
          name: user?.name,
          email: user?.email,
          photo: user?.image,
        })
      );

      const response = await addProduct(formData);
      // console.log(response);

      toast.success("Product Created Successfully");
      reset();
      router.push("/dashboard/my-products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white border border-slate-100 shadow-xl rounded-2xl p-6 md:p-10 transition-all">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create New Product
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Fill in the details below to add your product to LoopMarket.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Product Title */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <PiSubtitlesDuotone className="text-blue-500 text-lg" />
              Product Title
            </label>
            <input
              type="text"
              placeholder="e.g., iPhone 13 Pro Max, Leather Jacket"
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                errors.title ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
              }`}
              {...register("title", { required: "Product title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1.5">{errors.title.message}</p>
            )}
          </div>

          {/* Grid Section for Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Category */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <MdCategory className="text-blue-500" />
                Category
              </label>
              <select
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                  errors.category ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
                }`}
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Mobile Phones">Mobile Phones</option>
                <option value="Fashion">Fashion</option>
                <option value="Home Appliances">Home Appliances</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1.5">{errors.category.message}</p>
              )}
            </div>

            {/* Condition */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <MdMiscellaneousServices className="text-blue-500" />
                Condition
              </label>
              <select
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                  errors.condition ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
                }`}
                {...register("condition", { required: "Product condition is required" })}
              >
                <option value="">Select Condition</option>
                <option value="Used">Used</option>
                <option value="Like New">Like New</option>
                <option value="Refurbished">Refurbished</option>
              </select>
              {errors.condition && (
                <p className="text-red-500 text-xs mt-1.5">{errors.condition.message}</p>
              )}
            </div>
          </div>

          {/* Grid Section for Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Price */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaCoins className="text-blue-500" />
                Price (৳)
              </label>
              <input
                type="number"
                placeholder="Price in BDT"
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                  errors.price ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
                }`}
                {...register("price", { 
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" }
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1.5">{errors.price.message}</p>
              )}
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaLayerGroup className="text-blue-500" />
                Stock Quantity
              </label>
              <input
                type="number"
                placeholder="e.g., 5"
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 ${
                  errors.stock ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
                }`}
                {...register("stock", { 
                  required: "Stock quantity is required",
                  min: { value: 1, message: "Stock must be at least 1" }
                })}
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1.5">{errors.stock.message}</p>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <FaInfoCircle className="text-blue-500" />
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe your item's condition, usage history, and key features..."
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none ${
                errors.description ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-slate-200"
              }`}
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1.5">{errors.description.message}</p>
            )}
          </div>

          {/* Product Image File Drag & Drop Upload */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <TbPhoto className="text-blue-500 text-lg" />
              Product Image
            </label>

            <div className="group relative flex flex-col items-center justify-center w-full min-h-35 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-all duration-200 p-4 text-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                {...register("image", { required: "Product image file is required" })}
              />
              
              {!imageFile?.[0] ? (
                <div className="space-y-1.5 pointer-events-none">
                  <p className="text-sm font-medium text-slate-700">Click to upload or drag & drop</p>
                  <p className="text-xs text-slate-400">PNG, JPG or WEBP up to 5MB</p>
                </div>
              ) : (
                <div className="relative z-20 flex flex-col items-center gap-2 pointer-events-auto">
                  <div className="relative w-28 h-20 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                    <Image
                      src={URL.createObjectURL(imageFile[0])}
                      alt="preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setValue("image", null);
                    }}
                    className="text-xs font-medium text-red-500 hover:text-red-600 underline"
                  >
                    Remove photo
                  </button>
                </div>
              )}
            </div>
            {errors.image && (
              <p className="text-red-500 text-xs mt-1.5">{errors.image.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-blue-500/10 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all duration-150"
            >
              {loading ? "Creating Product Listing..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}