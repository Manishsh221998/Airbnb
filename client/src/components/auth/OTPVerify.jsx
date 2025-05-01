import { Box, TextField, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useOtpVerify } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const OTPVerify = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { mutate: verifyOtp, isPending } = useOtpVerify();

  const onSubmit = (data) => {
    verifyOtp(data, {
      onSuccess: () => {
        toast.success("OTP Verified! You can now log in.");
        navigate("/login");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "OTP verification failed.");
      },
    });
  };

  return (
    <Box maxWidth={400} mx="auto" mt={6}>
      <Typography variant="h5" mb={2}>
        Verify OTP
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Email"
          {...register("email", { required: true })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="OTP"
          {...register("otp", { required: true })}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isPending}
        >
          Verify OTP
        </Button>
      </form>
    </Box>
  );
};
