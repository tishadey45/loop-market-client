import axiosSecure from "@/lib/axiosSecure";

export const saveUserToDb = async (user) => {
  if (!user?.email) return null;

  const userInfo = {
    name: user.name,
    email: user.email,
    image: user.image || user.photoUrl,
  };

  const { data } = await axiosSecure.post("/api/users", userInfo);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await axiosSecure.get("/api/users");
  return data;
}

export const updateUserRole = async (userId, newRole) => {
  const { data } = await axiosSecure.patch(`/api/users/role/${userId}`, { role: newRole });
  return data;
}

export const blockUser = async (userId) => {
  const { data } = await axiosSecure.patch(`/api/users/block/${userId}`);
  return data;
}
