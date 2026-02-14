import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function (req, res, next) {
  // Look for token in header
  const token = req.header("x-auth-token");

  // If no token
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "Not token, auth denied" }] });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
  }
}
