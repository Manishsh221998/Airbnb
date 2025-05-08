import { useMutation, useQuery } from "@tanstack/react-query";
import {
  register,
  verifyOTP,
  login,
  getProfile,
  updatePassword,
} from "../api/apiHandler";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";

// Register User
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData) => register(formData),
    onSuccess: (data) => {
      console.log('Registration successful', data);
      navigate("/otp-verify");
      toast.success(data.data.message,{autoClose:700})
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
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn:(formData)=>login(formData),
      onSuccess: (data) => {
        console.log('Login successful', data);
        toast.success(data.data.message,{autoClose:700})
        window.localStorage.setItem("usertoken",data.data.token)
        navigate("/profile");  
    }
    ,
    onError: (error) => {
      console.error('Login failed', error.response?.data || error);
      toast.error(error.response?.data || error,{autoClose:700})

    },
  });
};

// Fetch Profile (requires user to be authenticated)
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    onSuccess: (data) => {
      console.log('Welcome Profile', data);
      toast.success(data.data.message,{autoClose:700})
      window.localStorage.setItem("usertoken",data.data.token)
      // navigate("/profile");  
  }
   });
};

// Send Reset Password Link
export const useSendResetPasswordLink = (options) => {
  return useMutation({
    mutationFn: sendResetPasswordLink,
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
