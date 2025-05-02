import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRegister } from "../../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";

const RegisterModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { register: formRegister, handleSubmit } = useForm();
  const [image, setImage] = useState(null);

  const {
    mutate: registerUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useRegister({
    onSuccess: () => {
      navigate("/otp-verify");
    },
  });
  
  const onSubmit = (data) => {
    const formData = new FormData();
    
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone || "");
    if (image) {
      formData.append("image", image);
    }
    
    registerUser(formData);

  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius:7,
          p: 3,
        },
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3 }}>
        <Typography variant="h6" fontWeight="bold" component="span">
          Create an Account
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
            label="Username"
            fullWidth
            {...formRegister("username", { required: true })}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...formRegister("email", { required: true })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...formRegister("password", { required: true })}
          />
          <TextField
            label="Phone"
            fullWidth
            {...formRegister("phone")}
          />

          {/* Image Upload Field */}
          <TextField
            type="file"
            accept="image/*"
            {...formRegister("image")}
            onChange={(e) => setImage(e.target.files[0])}
          />

          <Button
            type="submit"
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
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>
         <Divider > <Link to="/" style={{textAlign:'center',color:'black',fontFamily:'serif'}}>Forgot Password</Link></Divider>
          <Link to="/login" style={{textAlign:'center'}}>Already register? Login here</Link>

          {isSuccess && (
            <Typography color="success.main" mt={2} textAlign="center">
              Registration successful! Redirecting...
            </Typography>
          )}
          {isError && (
            <Typography color="error.main" mt={2} textAlign="center">
              {error?.response?.data?.message || "Something went wrong."}
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
