import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import {ApiError} from '../utils/apiError.js';

const toogleLike = async (req, res, next) => {
  try {
    let likeable;
    let deleted = false;

    if (req.query.type == "post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    // check if like already exist
    const isLikeExist = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    // if already exist then delete
    if (isLikeExist) {
      likeable.likes.pull(isLikeExist._id);
      await likeable.save();
      await isLikeExist.deleteOne();
      deleted = true;
    } else {
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      likeable.likes.push(newLike._id);
      await likeable.save();
    }

    res.status(200).json({ msg: "Request succesfull", deleted });
  } catch (error) {
    console.log("Error", error);
    next(error);
  }
};


const getLikeOnPost = async(req, res, next)=> {
  try {
    const {postId} = req.params;
    const post = await Post.findById(postId);
    if(!post) {
      return next(new ApiError(404, 'Post not found'));
    }
    res.status(200).json({likes:post.likes});
  } catch (error) {
    next(error);
  }
}


const getLikeOnComment = async(req, res, next)=> {
  try {
    const {commentId} = req.params;
    const comment = await Comment.findById(commentId);
    if(!comment) {
      return next(new ApiError(404, 'Comment not found'));
    }
    res.status(200).json({likes:comment.likes})
  } catch (error) {
    next(error);
  }
}

export { toogleLike, getLikeOnPost, getLikeOnComment };
