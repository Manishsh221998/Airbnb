import React from "react";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const updatePasswordMutation = useUpdatePassword({
    onSuccess: (res) => {
      alert(res.data.message || "Password updated successfully!");
      navigate("/account/profile");
    },
    onError: (error) => {
      alert(
        error.response?.data?.message || "Failed to update password. Try again!"
      );
    },
  });

  const onSubmit = (data) => {
    updatePasswordMutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Current Password */}
        <div style={{ marginBottom: "20px" }}>
          <label>Current Password</label>
          <input
            type="password"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {errors.currentPassword && (
            <p style={{ color: "red" }}>{errors.currentPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div style={{ marginBottom: "20px" }}>
          <label>New Password</label>
          <input
            type="password"
            {...register("password", { required: "New password is required" })}
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
              required: "Please confirm your password",
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
          disabled={updatePasswordMutation.isPending}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {updatePasswordMutation.isPending ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
