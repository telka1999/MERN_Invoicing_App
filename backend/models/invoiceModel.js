import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema(
  {
    userId: { type: mongoose.ObjectId, require: true },
    invoiceNr: {
      type: String,
      require: true,
    },
    placeOfIssue: {
      type: String,
      require: true,
    },
    dateOfIssue: {
      type: String,
      require: true,
    },
    deadlinePayments: {
      type: String,
      require: true,
    },
    paymentMethod: {
      type: String,
      require: true,
    },
    saleDate: {
      type: String,
      require: true,
    },
    accountNumber: {
      type: String,
      require: true,
    },
    buyer: {
      compnayName: { type: String, require: true },
      nip: { type: String, require: true },
      street: { type: String, require: true },
      city: { type: String, require: true },
      code: { type: String, require: true },
    },
    seller: {
      compnayName: { type: String, require: true },
      nip: { type: String, require: true },
      street: { type: String, require: true },
      city: { type: String, require: true },
      code: { type: String, require: true },
    },
    items: [
      {
        itemName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        vat: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("invoice", invoiceSchema);

export default Invoice;
