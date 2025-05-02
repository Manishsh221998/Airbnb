import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";

const LoginModal = ({ open, onClose }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const {
    mutate: loginUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useLogin({
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    loginUser(data);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius:7, p: 3 } }}
    >
      <DialogTitle sx={{ px: 3, pt: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Login to Your Account
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mx: 3, mb: 2 }} />

      <DialogContent sx={{ px: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Email"
            fullWidth
            {...register("email", { required: true })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password", { required: true })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundImage: "linear-gradient(45deg, #FF385C, #FF398B)",
              "&:hover": {
                backgroundImage: "linear-gradient(45deg, #FF386C, #FF385C)",
              },
            }}
            disabled={isPending}
          >
            {isPending ? <CircularProgress size={24} color="inherit" /> : "Login"}
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
        </Box>
      </DialogContent>
      <Link to="/regist" style={{textAlign:'center'}}>create an account</Link>
    </Dialog>
  );
};

export default LoginModal;
