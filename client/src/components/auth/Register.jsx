import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useRegister } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate(); // ✅ init navigate
  const { register: formRegister, handleSubmit } = useForm();
  const {
    mutate: registerUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useRegister({
    onSuccess: (res) => {
      navigate("/otp-verify");
    },
  });

  const onSubmit = (data) => {
    console.log("Submitting register form with:", data);
    registerUser(data);
  };

  return (
    <Box maxWidth={400} mx="auto" mt={6}>
      <Typography variant="h5" mb={2}>
        Create an Account
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          {...formRegister("username", { required: true })}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...formRegister("email", { required: true })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...formRegister("password", { required: true })}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          {...formRegister("phone")}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={24} /> : "Register"}
        </Button>

        {isSuccess && (
          <Typography color="success.main" mt={2}>
            Registration successful! Redirecting to login...
          </Typography>
        )}
        {isError && (
          <Typography color="error.main" mt={2}>
            {error?.response?.data?.message || "Something went wrong."}
          </Typography>
        )}
      </form>
    </Box>
  );
};
