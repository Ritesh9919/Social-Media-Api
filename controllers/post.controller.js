import { ApiError } from "../utils/apiError.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import {Comment} from '../models/comment.model.js';

const createPost = async (req, res, next) => {
  try {
    const { caption } = req.body;
    if (!caption) {
      return next(new ApiError(400, "Please provide all fields"));
    }
    
    const captionImageLocalPath = `temp/${req.files?.captionImage[0]?.filename}`;
    console.log(captionImageLocalPath);


    

    const post = await Post.create({ caption, user: req.user._id, captionImage:captionImageLocalPath });
    res.status(201).json({post, msg: "Post created" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('user');
     
    if (!posts) {
      return next(new ApiError(404, "Post not found"));
    }
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};


const getPostsByUser = async(req, res, next)=> {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if(!user) {
      return next(new ApiError(404, 'User not found'));
    }
    const posts = await Post.find({user:userId});
    if(!posts) {
      return next(new ApiError(404, 'Post not found'));
    }
    res.status(200).json({posts});
  } catch (error) {
    next(error);
  }
}

const getSingalPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
      
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
    const {caption} = req.body;
    if(!caption) {
      return next(new ApiError(404, 'All fields are required'));
    }

    const post = await Post.findById(postId);
    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }

    if (post.user.equals(req.user._id)) {
      await post.updateOne({caption:caption});
      await post.save();
    } else {
      return next(new ApiError(400, "You can't update this post"));
    }
     const updatedPost = await Post.findById(postId);
    res.status(200).json({ post:updatedPost, msg: "Post updated successfull" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }
    if (post.user.equals(req.user._id)) {
      await Post.findByIdAndDelete(postId);
      await Comment.deleteMany({post:postId});
    } else {
      return next(new ApiError(400, "You can't delete this post"));
    }
    res.status(200).json({msg: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { createPost, getAllPosts, getSingalPost, updatePost, deletePost, getPostsByUser };
