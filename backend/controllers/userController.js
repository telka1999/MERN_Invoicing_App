import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// Auth user | POST | Public

const authUser = async (req, res) => {
  res.status(200).json({ message: "Auth User" });
};

// Register user | POST | Public

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  } else {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      generateToken(res, user._id);
      res
        .status(201)
        .json({ _id: user._id, name: user.name, email: user.email });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  }
};

// Logout user | POST | Public

const logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout User" });
};

// Get user profiles | GET | Private

const getUser = async (req, res) => {
  res.status(200).json({ message: "Get User" });
};

// Update user | PUT | Private

const updateUser = async (req, res) => {
  res.status(200).json({ message: "Update User" });
};

export { authUser, registerUser, logoutUser, getUser, updateUser };
