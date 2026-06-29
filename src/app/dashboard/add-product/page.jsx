"use client";

import React from "react";

export default function AddProductPage() {
  return (
    <div className="max-w-2xl bg-white p-8 rounded-3xl border border-gray-200 shadow-xs">
      <h1 className="text-xl font-bold text-gray-800 mb-1">Create New Product Listing</h1>
      <p className="text-xs text-gray-400 mb-6">Fill in the details below to add your product to LoopMarket.</p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold text-gray-700">Product Title</span></label>
          <input type="text" placeholder="e.g., iPhone 13 Pro" className="input input-bordered bg-white w-full text-gray-800 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold text-gray-700">Category</span></label>
            <select className="select select-bordered bg-white text-gray-800 rounded-xl">
              <option>Electronics</option>
              <option>Mobile Phones</option>
              <option>Fashion</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold text-gray-700">Condition</span></label>
            <select className="select select-bordered bg-white text-gray-800 rounded-xl">
              <option>Used</option>
              <option>Like New</option>
              <option>Refurbished</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold text-gray-700">Price (৳)</span></label>
            <input type="number" placeholder="Price" className="input input-bordered bg-white w-full text-gray-800 rounded-xl" />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold text-gray-700">Stock Quantity</span></label>
            <input type="number" placeholder="1" className="input input-bordered bg-white w-full text-gray-800 rounded-xl" />
          </div>
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold text-gray-700">Upload Product Image URL</span></label>
          <input type="text" placeholder="https://example.com/image.jpg" className="input input-bordered bg-white w-full text-gray-800 rounded-xl" />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold text-gray-700">Description</span></label>
          <textarea className="textarea textarea-bordered bg-white w-full text-gray-800 rounded-xl h-24" placeholder="Describe your item carefully..."></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full rounded-xl mt-4">Create Product</button>
      </form>
    </div>
  );
}