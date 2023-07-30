import express from "express";
import {
  addCompany,
  getCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(protect, addCompany)
  .get(protect, getCompany)
  .put(protect, updateCompany)
  .delete(protect, deleteCompany);

export default router;
