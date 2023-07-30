import Company from "../models/companyModel.js";

// Add Company | POST | Private

const addCompany = async (req, res) => {
  const { compnayName, nip, street, city, code } = req.body;
  const company = await Company.create({
    userId: req.user._id,
    compnayName,
    nip,
    street,
    city,
    code,
  });
  res.status(200).json(company);
};

// Get Company | GET | Private

const getCompany = async (req, res) => {
  const companies = await Company.find({ userId: req.user._id });

  res.status(200).json(companies);
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
