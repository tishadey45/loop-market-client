"use client";

import { getProductsById } from "@/services/productsApi";
import { myBookings } from "@/services/bookingApi";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProductDetails({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  const userData = authClient.useSession();
  const user = userData?.data?.user;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductsById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Product not found!
      </div>
    );
  }

  const { title, category, condition, price, image, description, seller, status } = product;

  const handleOrder = async () => {
    if (!user) {
      return toast.error("Please login to place an order!");
    }

    if (status === "sold out") {
      return toast.error("This product is already sold out!");
    }

    try {
      setOrderLoading(true);
      const bookingData = {
        productId: product._id,
        productTitle: title,
        productImage: image,
        price: price,
        buyerEmail: user?.email,
        buyerName: user?.name,
        sellerEmail: seller?.email,
        orderDate: new Date(),
        status: "pending"
      };

      await myBookings(bookingData);
      toast.success("Order Placed Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl shadow-2xl overflow-hidden border">
        {/* Left Side: Product Image */}
        <div className="relative min-h-100 bg-gray-50">
          <Image
            src={image || "/placeholder.jpg"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <span className="absolute top-5 left-5 bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow z-10 text-sm">
            {condition}
          </span>
        </div>

        {/* Right Side: Product Details */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">
              {category}
            </span>
            <h1 className="text-3xl font-extrabold mt-2 mb-4 text-gray-800">
              {title}
            </h1>
            <p className="text-gray-500 leading-8 mb-8 text-sm">
              {description}
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-3">
                <span className="font-medium text-gray-500">Price</span>
                <span className="font-bold text-emerald-600 text-lg">
                  ৳ {price?.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium text-gray-500">Status</span>
                <span className={`font-bold capitalize ${status === "sold out" ? "text-red-500" : "text-blue-600"}`}>
                  {status || "available"}
                </span>
              </div>

              {/* Seller Information */}
              <div className="pt-4">
                <h3 className="font-bold text-gray-700 mb-3">Seller Contact</h3>
                <div className="bg-gray-50 p-4 rounded-xl space-y-2 border">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-semibold text-gray-800">{seller?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-semibold text-gray-800">{seller?.phone || "01700000000"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-semibold text-gray-800 truncate max-w-50">{seller?.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleOrder}
                  disabled={orderLoading || status === "sold out"}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                >
                  {orderLoading ? "Processing Order..." : status === "sold out" ? "Sold Out" : "Order Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}