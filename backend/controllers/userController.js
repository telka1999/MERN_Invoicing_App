// Auth user | POST | Public

const authUser = async (req, res) => {
  res.status(200).json({ message: "Auth User" });
};

// Register user | POST | Public

const registerUser = async (req, res) => {
  res.status(200).json({ message: "Register User" });
};

// Logout user | POST | Public

const logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout User" });
};

// Get user profiles | GET | Private

const getUser = async (req, res) => {
  res.status(200).json({ message: "Get User" });
};

// Update user | PUT | Public

const updateUser = async (req, res) => {
  res.status(200).json({ message: "Update User" });
};

export { authUser, registerUser, logoutUser, getUser, updateUser };
