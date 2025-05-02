import axiosInstance from "./axiosInstance";
import ENDPOINTS from "./endpoints";

// Auth
export const register = (data) => {
  console.log("Sending to:", ENDPOINTS.REGISTER);
  console.log("Payload:", data);
  return axiosInstance.post(ENDPOINTS.REGISTER, data);
};

export const verifyOTP = (data) =>
  axiosInstance.post(ENDPOINTS.OTP_VERIFY, data);
export const login = (data) => axiosInstance.post(ENDPOINTS.LOGIN, data);

export const sendResetPasswordLink = (data) =>
  axiosInstance.post(ENDPOINTS.RESET_PASSWORD_LINK, data);
export const resetPassword = (id, token, data) =>
  axiosInstance.post(ENDPOINTS.RESET_PASSWORD(id, token), data);

// Profile
export const getProfile = () => axiosInstance.get(ENDPOINTS.PROFILE);
export const updatePassword = (data) =>
  axiosInstance.post(ENDPOINTS.UPDATE_PASSWORD, data);

// Hotels
export const createHotel = (data) =>
  axiosInstance.post(ENDPOINTS.CREATE_HOTEL, data);

// Booking
export const createBooking = (data) =>
  axiosInstance.post(ENDPOINTS.CREATE_BOOKING, data);
