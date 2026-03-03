import { Router } from "express";
import { check } from "express-validator";
import dotenv from "dotenv";
import auth from "../middleware/basicAuth.mjs";
import userCTRL from "../controllers/userController.mjs";

dotenv.config();
const router = Router();

router
  .route("/")
  // @route: GET api/auth
  // @desc: find user by id
  // @access: Private
  .get(auth, userCTRL.findUser)

  // @route: POST api/auth
  // @desc: Login and authenticate user
  // @access: Public
  .post(
    [
      check("password", "Please Include a password").not().isEmpty(),
      check("email", "Please include an email").not().isEmpty(),
    ],
    userCTRL.loginUser,
  );

export default router;
