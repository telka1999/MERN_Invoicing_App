// Add Invoice | POST | Private

const addInvoice = async (req, res) => {
  res.status(200).json({ message: "Add Invoice" });
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
