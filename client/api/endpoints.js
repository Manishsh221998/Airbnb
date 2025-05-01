const BASE_URL = "http://localhost:5000/api";

export const ENDPOINTS = {
  // Auth
  REGISTER: "/user-register",
  OTP_VERIFY: "/otp-verify",
  LOGIN: "/user-login",
  RESET_PASSWORD_LINK: "/reset-password-link",
  RESET_PASSWORD: (id, token) => `/reset-password/${id}/${token}`,

  // User Profile
  PROFILE: "/profile",
  UPDATE_PASSWORD: "/update-password",

  // Hotels
  CREATE_HOTEL: "/create-hotel",

  // Bookings
  CREATE_BOOKING: "/booking",
};

export default BASE_URL;
