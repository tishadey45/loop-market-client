import axiosSecure from "@/lib/axiosSecure"

export const getProducts = async () => {
   const {data}  = await axiosSecure.get("/products");
//    console.log(data)
   return data;
}

export const getProductsById = async (id) => {
  const {data} = await axiosSecure.get(`/products/${id}`);
  return data;
}
