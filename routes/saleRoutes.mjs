import { Router } from "express";
import auth from '../middleware/basicAuth.mjs';
import saleCTRL from "../controllers/saleController.mjs";

const router = Router();

router.route("/")
  // @route: POST api/sale
  // @desc: Create new sale
  // @access: Public
  .post(auth, saleCTRL.createNewSale);

router.route("/user/:id")
  // @route: GET api/sale/user/:id
  // @desc: Get all sales by user id
  // @access: Public
  .get(auth, saleCTRL.getAllSales)


router.route("/:id")
  // @route: GET api/sale/:id
  // @desc: GET sale by id
  // @access: Public
//.get(saleCTRL.getSaleById)

  // @route: PUT api/sale/:id
  // @desc: UPDATE sale by id
  // @access: Public
  .put(auth, saleCTRL.updateSale)

  // @route: DELETE api/sale/:id
  // @desc: DELETE sale by id
  // @access: Public
  .delete(auth, saleCTRL.deleteSale);

export default router;
