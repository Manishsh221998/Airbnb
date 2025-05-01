const express = require("express");
const AuthCheck = require("../middleware/authCheckFunction");
const UserController = require("../controller/UserController");
const BookingController = require("../controller/BookingController");
  const router = express.Router();

router.post("/user-register", UserController.register);
router.post("/otp-verify", UserController.verify);
router.post("/user-login", UserController.login);
router.post("/reset-password-link", UserController.resetPasswordLink);
router.post("/reset-password/:id/:token",UserController.resetPassword);

 
router.use(AuthCheck)
 router.get("/profile",UserController.profile);
//  router.post("/update-password",UserController.updatePassword);
 //  Booking
router.post("/booking",BookingController.bookingData)

module.exports = router;
