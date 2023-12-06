import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/apiError.js";

const createComment = async (req, res, next) => {
  try {
    const { post, content } = req.body;
    if (!post || !content) {
      return next(new ApiError(400, "Both fields are required"));
    }

    const posts = await Post.findById(post);

    if (posts) {
      const comment = await Comment.create({
        content,
        user: req.user._id,
        post,
      });
      posts.comments.push(comment);
      await posts.save();
    }
    res.status(201).json({ msg: "Comment created successfully!" });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
  
    if (comment.user.equals(req.user._id)) {
      const postId = comment.post;
      await comment.deleteOne();
      await Post.findByIdAndUpdate(postId, { $pull: { comments: id } });
    } else {
      return  next(new ApiError(400, "You can't delete this post"));
    }
    res.status(200).json({ msg: "Comment deleted" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { createComment, deleteComment };
