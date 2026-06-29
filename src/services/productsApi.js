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

export const addProduct = async (productData) => {
  const { data } = await axiosSecure.post("/add-product", productData);
  return data;
};


export const getMyProducts = async (email) => {
  const { data } = await axiosSecure.get(`/my-products/${email}`);
  return data;
};

export const updateProduct = async (id, updatedData) => {
  const { data } = await axiosSecure.put(`/api/products/${id}`, updatedData);
  return data;
}

export const deleteProduct = async (id) => {
  const { data } = await axiosSecure.delete(`/api/products/${id}`);
  return data;
};


export const getAllProducts = async () => {
  const { data } = await axiosSecure.get("/all-products");
  return data;
}