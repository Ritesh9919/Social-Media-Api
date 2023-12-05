import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new ApiError(400, "All fields are required"));
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return next(new ApiError(409, "User already exist"));
    }
    const user = new User({ name, email, password });
    user.save();
    res.status(201).json({ msg: "User registred successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return next(new ApiError(401, "Invalid Credentials"));
    }

    const accessToken = user.generateAccessToken();
    res.status(200).json({ msg: "Login successfull", accessToken });
  } catch (error) {
    next(error);
  }
};

export { register, login };
