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

// Get Invoices | GET | Private

const getInvoice = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let next = {};
  let previous = {};
  const count = await Invoice.countDocuments().exec();

  if (endIndex < count) {
    next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    previous = {
      page: page - 1,
      limit: limit,
    };
  }
  try {
    const invoices = await Invoice.find({ userId: req.user._id })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.status(200).json({ invoices, count, next, previous });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Get Single Invoice | GET | Privite

const getSingleInvoice = async (req, res) => {
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

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
  const { invoiceId } = req.body;

  const deletedInvoice = await Invoice.deleteOne({
    _id: invoiceId,
    userId: req.user._id,
  });
  if (deletedInvoice) {
    res.status(200).json(deletedInvoice);
  } else {
    res.status(404).json({ message: "Invoice not found" });
  }
};

export {
  addInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
  getSingleInvoice,
};
