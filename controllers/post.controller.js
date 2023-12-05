import { ApiError } from "../utils/apiError.js";
import { Post } from "../models/post.model.js";

const createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      return next(new ApiError(400, "Please provide all fields"));
    }
    const post = await Post.create({ content, user: req.user._id });
    res.status(201).json({ msg: "Post created", post });
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("user");
    if (!posts) {
      return next(new ApiError(404, "Post not found"));
    }
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

const getSingalPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("user");
    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }
    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
      runValidators: true,
    }).populate('user');
    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }
    res.status(200).json({ post, msg: "Post updated successfull" });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId).populate('user');
    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }
    res.status(200).json({ post, msg: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { createPost, getAllPosts, getSingalPost, updatePost, deletePost };
