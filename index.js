import dotenv from  'dotenv';
dotenv.config();
import express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors';


import apiDocs from './swagger.json' assert {type:'json'};
import {connectDB} from './db/mongoose.js';
import {errorHandlerMiddleware} from './middlewares/error_handler.js';
import {jwtAuth} from './middlewares/jwtAuth.js';
import {notFoundErrorHandler} from './middlewares/not_found.js';


import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';


const app = express();

//api documentation
app.use('/api/docs', swagger.serve, swagger.setup(apiDocs));


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());



app.get('/', (req, res)=> {
    res.send('<h1>Social-Media API</h1><a href="/api/docs">Documentation</a>');
})


// routes
app.use('/api/users', userRouter);
app.use('/api/posts', jwtAuth, postRouter);

app.use(notFoundErrorHandler);
app.use(errorHandlerMiddleware);



app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port:${process.env.PORT}`);
    connectDB();
})
