import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// Auth user | POST | Public

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
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
      company: {
        compnayName: "",
        nip: "",
        street: "",
        city: "",
        code: "",
      },
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
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
};

// Get user profiles | GET | Private

const getUser = async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    company: req.user.company,
  };

  res.status(200).json(user);
};

// Update user | PUT | Private

const updateUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.company.compnayName = req.body.compnayName || user.company.compnayName;
    user.company.nip = req.body.nip || user.company.nip;
    user.company.street = req.body.street || user.company.street;
    user.company.city = req.body.city || user.company.city;
    user.company.code = req.body.code || user.company.code;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      company: {
        compnayName: updatedUser.company.compnayName,
        nip: updatedUser.company.nip,
        street: updatedUser.company.street,
        city: updatedUser.company.city,
        code: updatedUser.company.code,
      },
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export { authUser, registerUser, logoutUser, getUser, updateUser };
