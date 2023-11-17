const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  getUser,
  getUserApplications,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", (req, res) => {
  // Clear the user's session data, such as cookies or tokens
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});
router.get("/profile", getProfile);
router.get("/users/:id", getUser);
router.get("/users/:id/applications", getUserApplications);

module.exports = router;
