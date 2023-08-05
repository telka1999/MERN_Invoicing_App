import express from "express";
import {
  addInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
  getSingleInvoice,
} from "../controllers/invoicesController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(protect, addInvoice)
  .get(protect, getInvoice)
  .put(protect, updateInvoice)
  .delete(protect, deleteInvoice);

router.get("/:id", protect, getSingleInvoice);

export default router;
