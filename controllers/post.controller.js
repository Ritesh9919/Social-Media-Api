import {ApiError} from '../utils/apiError.js';
import {Post} from '../models/post.model.js';
import {StatusCodes} from 'http-status-codes';

const createPost = async(req, res, next) => {
      const {content} = req.body;
      if(!content) {
          return next(new ApiError(400, 'Please provide all fields'));
      }
      const post = await Post.create({content, user:req.user._id});
      res.status(201).json({success:true, msg:'Post created', post});
}



const getAllPosts = async(req, res, next) => {
      const posts = await Post.find().populate('user');
      if(!posts) {
        return next(new ApiError(404, 'Post not found'));
      }
      res.status(200).json({success:true, posts});
}









export {
    createPost,
    getAllPosts
}