
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const jwtAuth = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return next(new ApiError(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    req.user = user;
    return next();
  } catch (error) {
    return next(new ApiError(401, "Unauthorized"));
  }
};
