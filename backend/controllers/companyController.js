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
  const { companyId, compnayName, nip, street, city, code } = req.body;
  const company = await Company.findById(companyId);

  if (company) {
    company.compnayName = compnayName || company.compnayName;
    company.nip = nip || company.nip;
    company.street = street || company.street;
    company.city = city || company.city;
    company.code = code || company.code;

    const updatedCompany = await company.save();

    res.status(200).json(updatedCompany);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
};

// Delete Company | DELETE | Private

const deleteCompany = async (req, res) => {
  const { companyId } = req.body;

  const deletedCompany = await Company.deleteOne({
    _id: companyId,
    userId: req.user._id,
  });
  if (deletedCompany) {
    res.status(200).json(deletedCompany);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
};

export { addCompany, getCompany, updateCompany, deleteCompany };
