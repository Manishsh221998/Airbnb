import { useMutation, useQuery } from "@tanstack/react-query";
import {
  register,
  verifyOTP,
  login,
  getProfile,
  updatePassword,
} from "../api/apiHandler";

// Register User
export const useRegister = () => {
  return useMutation({
    mutationFn: (formData) => register(formData),
    onSuccess: (data) => {
      console.log('Registration successful', data);
    },
    onError: (error) => {
      console.error('Registration failed', error.response?.data || error);
    },
  });
};

// OTP Verification
export const useOtpVerify = (options) => {
  return useMutation({
    mutationFn: verifyOTP,
    ...options,
  });
};

// Login User
export const useLogin = (options) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};

// Fetch Profile (requires user to be authenticated)
export const useProfile = (options = {}) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    ...options,
  });
};

// Update Password
export const useUpdatePassword = (options) => {
  return useMutation({
    mutationFn: updatePassword,
    ...options,
  });
};
