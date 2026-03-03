import { Router } from "express";
import { check } from "express-validator";
import userCTRL from "../controllers/userController.mjs";

const router = Router();

router
  .route("/")
  // @route: POST api/user
  // @desc: Create new user
  // @access: Public
  .post(
    [
      check("userName", "User name must be at least 4 characters long").isLength({ min: 4 }),
      check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
      check("email", "Please include a valid email").isEmail(),
    ], userCTRL.registerUser );

export default router;
