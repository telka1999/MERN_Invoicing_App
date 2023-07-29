// Auth user | POST | Public

const authUser = async (req, res) => {
  res.status(200).json({ message: "Auth User" });
};

export { authUser };
