import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import {Friendship} from '../models/friendship.model.js';


// User Profile

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    if (!users) {
      return next(new ApiError(404, "User not found"));
    }
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};



const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};



const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    user.name = name;
    user.email = email;
    user.password = password;
    await user.save()
    res.status(200).json({user, msg:'User updated'});
  } catch (error) {
    console.log(error);
    next(error);
  }
};






const friendship = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(req.user._id);
    if(!user) {
        return next(new ApiError(404, 'User not found'));
    }
    const friend = await Friendship.create({
      from_user: req.user._id,
      to_user: userId,
    });
    user.friendships.push(friend);
    await user.save()
    res.status(201).json({msg:'Friend added'});
  } catch (error) {
    next(error);
  }
};









export { getAllUsers, getUser, updateUser, friendship };
