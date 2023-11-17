const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //CHECK IF NAME ENTERED
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    //CHECK PASSWORD
    if (!password || password.length < 6) {
      return res.json({
        error: "Passwords need to be atleast 6 characters",
      });
    }
    //CHECK EMAIL
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({
        error: "Email already exists",
      });
    }
    //CREATE USER IN DATABASE
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      // applications,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//LOGIN ENDPOINT
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //CHECK IF USER EXIST
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User not found",
      });
    }
    // CHECK IF PASSWORDS MATCH
    const match = await comparePassword(password, user.password);
    if (match) {
      
      jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
          setUser(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: "Password do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};
const getUser = async (req, res) => {
  const userId = req.params.id; // Assuming the user ID is in the URL parameters
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user); // Return the user's information
      console.log(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUserApplications = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId).populate({
      path: "applications",
      model: "Application", // Specify the model name
      select: "unitType street", // Specify the fields you want to select
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userApplications = user.applications; // Array of populated applications
    res.status(200).json({ userApplications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getUser,
  getUserApplications,
};
