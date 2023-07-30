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
  const invoice = await Invoice.find({ userId: req.user._id });

  res.status(200).json(invoice);
};

// Update Invoice | PUT | Private

const updateInvoice = async (req, res) => {
  const {
    invoiceId,
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

  const invoice = await Invoice.findById(invoiceId);

  if (invoice) {
    invoice.invoiceNr = invoiceNr || invoice.invoiceNr;
    invoice.placeOfIssue = placeOfIssue || invoice.placeOfIssue;
    invoice.dateOfIssue = dateOfIssue || invoice.dateOfIssue;
    invoice.deadlinePayments = deadlinePayments || invoice.deadlinePayments;
    invoice.paymentMethod = paymentMethod || invoice.paymentMethod;
    invoice.saleDate = saleDate || invoice.saleDate;
    invoice.accountNumber = accountNumber || invoice.accountNumber;
    invoice.buyer = buyer || invoice.buyer;
    invoice.seller = seller || invoice.seller;
    invoice.items = items || invoice.items;

    const updatedInvoice = await invoice.save();

    res.status(200).json(updatedInvoice);
  } else {
    res.status(404).json({ message: "Invoice not found" });
  }
};

// Delete Invoice | DELETE | Private

const deleteInvoice = async (req, res) => {
  res.status(200).json({ message: "Delete Invoice" });
};

export { addInvoice, getInvoice, updateInvoice, deleteInvoice };
