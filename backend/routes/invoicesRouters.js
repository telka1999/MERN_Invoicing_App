import express from "express";
import {
  addInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoicesController.js";
const router = express.Router();

router
  .route("/")
  .post(addInvoice)
  .get(getInvoice)
  .put(updateInvoice)
  .delete(deleteInvoice);

export default router;
