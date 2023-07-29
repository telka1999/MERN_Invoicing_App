import express from "express";
import {
  addCompany,
  getCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";
const router = express.Router();

router
  .route("/")
  .post(addCompany)
  .get(getCompany)
  .put(updateCompany)
  .delete(deleteCompany);

export default router;
