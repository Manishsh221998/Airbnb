export const BASE_URL = "http://localhost:6001/api";

const ENDPOINTS = {
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

export default ENDPOINTS;
