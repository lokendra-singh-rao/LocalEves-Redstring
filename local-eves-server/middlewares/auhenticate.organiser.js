import { findUser } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authenticateOrganiser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const { userId } = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    const user = await findUser({ userId });

    if (user != null && user.role === "ORGANISER" && !user.isDeleted) {
      req.user = user;
      next();
    } else {
      return res.status(403).json({ ok: false, err: "Unauthorised request!" });
    }
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).json({ ok: false, err: "Invalid token! Please login again" });
  }
};
