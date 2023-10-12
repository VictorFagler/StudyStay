const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

//MIDDLEWARE

// router.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/logout", (req, res) => {
  // Clear the user's session data, such as cookies or tokens
  res.clearCookie("token"); 

  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
