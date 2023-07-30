import express from "express";
import {
  addInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoicesController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(protect, addInvoice)
  .get(protect, getInvoice)
  .put(protect, updateInvoice)
  .delete(protect, deleteInvoice);

export default router;
