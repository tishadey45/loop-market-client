import { getProductsById } from "@/services/productsApi";
import Image from "next/image";

export default async function ProductDetails({ params }) {
  const { id } = await params;
  //   console.log(id);
  const product = await getProductsById(id);

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Product not found!
      </div>
    );
  }

  const {
    title,
    category,
    condition,
    price,
    images,
    description,
    sellerInfo,
    status,
  } = product;

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl shadow-2xl overflow-hidden border">
        {/* Left Side: Product Image */}
        <div className="relative min-h-100 bg-gray-50">
          <Image
            src={images?.[0] || "/placeholder.jpg"}
            alt={title}
            fill
            className="object-cover"
            priority
          />

          {/* Condition Badge */}
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

            {/* Product Specifications */}
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-3">
                <span className="font-medium text-gray-500">Price</span>
                <span className="font-bold text-emerald-600 text-lg">
                  ৳ {price?.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium text-gray-500">Status</span>
                <span className="font-bold capitalize text-blue-600">
                  {status}
                </span>
              </div>

              {/* Seller Information */}
              <div className="pt-4">
                <h3 className="font-bold text-gray-700 mb-3">Seller Contact</h3>
                <div className="bg-gray-50 p-4 rounded-xl space-y-2 border">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-semibold text-gray-800">
                      {sellerInfo?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-semibold text-gray-800">
                      {sellerInfo?.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-semibold text-gray-800 truncate max-w-50">
                      {sellerInfo?.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
