import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    userId: { type: mongoose.ObjectId, require: true },
    compnayName: String,
    nip: String,
    street: String,
    city: String,
    code: String,
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;