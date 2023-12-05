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

export { createComment };
