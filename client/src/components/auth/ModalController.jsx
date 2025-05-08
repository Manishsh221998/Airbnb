import { useLocation, useNavigate } from "react-router-dom";
import RegisterModal from "./Register";
import LoginModal from "./Login";
import OTPVerifyModal from "./OTPVerify";
import ResetPasswordModal from "./ResetPassword"; // New
import UpdatePasswordModal from "./UpdatePassword"; // New

const ModalController = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // Close modal and return to main page
  };

  return (
    <>
      {location.pathname === "/register" && (
        <RegisterModal open={true} onClose={handleClose} />
      )}
      {location.pathname === "/otp-verify" && (
        <OTPVerifyModal open={true} onClose={handleClose} />
      )}
      {location.pathname === "/login" && (
        <LoginModal open={true} onClose={handleClose} />
      )}
      {location.pathname === "/reset-password-link" && (
        <ResetPasswordModal open={true} onClose={handleClose} />
      )}
      {/* Dynamic route for update password */}
      {location.pathname.startsWith("/reset-password/") && (
        <UpdatePasswordModal open={true} onClose={handleClose} />
      )}
    </>
  );
};

export default ModalController;
