import Invoice from "../models/invoiceModel.js";

// Add Invoice | POST | Private

const addInvoice = async (req, res) => {
  const {
    invoiceNr,
    placeOfIssue,
    dateOfIssue,
    deadlinePayments,
    paymentMethod,
    saleDate,
    accountNumber,
    buyer,
    seller,
    items,
  } = req.body;

  const invoice = await Invoice.create({
    userId: req.user._id,
    invoiceNr,
    placeOfIssue,
    dateOfIssue,
    deadlinePayments,
    paymentMethod,
    saleDate,
    accountNumber,
    buyer,
    seller,
    items,
  });
  res.status(200).json(invoice);
};

// Get Invoice | GET | Private

const getInvoice = async (req, res) => {
  res.status(200).json({ message: "Get Invoice" });
};

// Update Invoice | PUT | Private

const updateInvoice = async (req, res) => {
  res.status(200).json({ message: "Update Invoice" });
};

// Delete Invoice | DELETE | Private

const deleteInvoice = async (req, res) => {
  res.status(200).json({ message: "Delete Invoice" });
};

export { addInvoice, getInvoice, updateInvoice, deleteInvoice };
