import axiosSecure from "@/lib/axiosSecure";

export const myBookings = async (bookingData) => {
  const { data } = await axiosSecure.post(`/order`, bookingData);
  return data;
}

export const getMyBookings = async (email) => {
  const { data } = await axiosSecure.get(`/customers-bookings/${email}`);
  return data;
}

export const cancelBooking = async (bookingId) => {
  const { data } = await axiosSecure.patch(`/api/bookings/${bookingId}/cancel`);
  return data;
}

export const getAllBookings = async () => {
  const { data } = await axiosSecure.get("/all-bookings");
  return data;
}