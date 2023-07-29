// Add Company | POST | Private

const addCompany = async (req, res) => {
  res.status(200).json({ message: "Add Company" });
};

// Get Company | GET | Private

const getCompany = async (req, res) => {
  res.status(200).json({ message: "Get Company" });
};

// Update Company | PUT | Private

const updateCompany = async (req, res) => {
  res.status(200).json({ message: "Update Company" });
};

// Delete Company | DELETE | Private

const deleteCompany = async (req, res) => {
  res.status(200).json({ message: "Delete Company" });
};

export { addCompany, getCompany, updateCompany, deleteCompany };
