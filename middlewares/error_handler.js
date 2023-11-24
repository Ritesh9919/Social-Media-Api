
 import {ApiError} from '../utils/apiError.js';
export const errorHandlerMiddleware = (err, req, res, next ) => {
   if(err instanceof ApiError) {
    return res.status(err.statusCode).json({msg:err.message});
   }
   return res.status(500).json({msg:'Something went wrong!'});
}


