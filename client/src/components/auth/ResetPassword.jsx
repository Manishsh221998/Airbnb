import React from "react";
import { useForm } from "react-hook-form";
import { useSendResetPasswordLink } from "../../hooks/useUser"; // adjust path if needed
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const resetPasswordMutation = useSendResetPasswordLink(id, token, {
    onSuccess: (res) => {
      alert(res.data.message || "Password reset successfully!");
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
      alert(
        error.response?.data?.message || "Failed to reset password. Try again!"
      );
    },
  });

  const onSubmit = (data) => {
    resetPasswordMutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* New Password */}
        <div style={{ marginBottom: "20px" }}>
          <label>New Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div style={{ marginBottom: "20px" }}>
          <label>Confirm New Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={resetPasswordMutation.isPending}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
