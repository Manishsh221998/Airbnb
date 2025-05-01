import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useLogin } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); // ✅ Use navigate hook

  const {
    mutate: loginUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useLogin({
    onSuccess: () => {
      navigate("/dashboard"); // ✅ Redirect to dashboard on success
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    loginUser(data);
  };

  return (
    <Box maxWidth={400} mx="auto" mt={6}>
      <Typography variant="h5" mb={2}>
        Login to Your Account
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", { required: true })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: true })}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={24} /> : "Login"}
        </Button>

        {isSuccess && (
          <Typography color="success.main" mt={2}>
            Logged in successfully!
          </Typography>
        )}
        {isError && (
          <Typography color="error.main" mt={2}>
            {error?.response?.data?.message || "Invalid credentials."}
          </Typography>
        )}
      </form>
    </Box>
  );
};
