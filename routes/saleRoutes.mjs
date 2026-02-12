import { Router } from "express";
import Sale from "../models/saleSchema.mjs";
import saleCTRL from "../controllers/saleController.mjs";

const router = Router();

router
  .route("/")
  // @route: GET api/sale
  // @desc: Get all sales
  // @access: Public
  .get(saleCTRL.getAllSales)

  // @route: POST api/sale
  // @desc: Create new sale
  // @access: Public
  .post(saleCTRL.createNewSale);

router
  .route("/:id")
  // @route: GET api/sale/:id
  // @desc: GET sale by id
  // @access: Public
  .get(saleCTRL.getSaleById)

  // @route: PUT api/sale/:id
  // @desc: UPDATE sale by id
  // @access: Public
  .put(saleCTRL.updateSale)

  // @route: DELETE api/sale/:id
  // @desc: DELETE sale by id
  // @access: Public
  .delete(saleCTRL.deleteSale);

export default router;
