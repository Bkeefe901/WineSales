import { Router } from "express";
import multer from "multer";
import auth from "../middleware/basicAuth.mjs";
import invoiceCTRL from "../controllers/invoiceController.mjs";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router
  .route("/parse")
  // @route:  POST /api/invoice/parse
  // @desc:   Parse a PDF invoice and return extracted sale fields
  // @access: Private
  .post(auth, upload.single("pdf"), invoiceCTRL.parseInvoice);

export default router;
