const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");

const test = (req, res) => {
  res.json("test is working");
};

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
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
};
