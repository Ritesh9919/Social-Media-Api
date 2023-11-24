require('dotenv').config()
const express = require('express');
const connectDB = require('./db/mongoose');


const app = express();

app.use(express.json());


app.get('/', (req, res)=> {
    res.send('Welcome');
})


app.use('/', require('./routes'));


app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port:${process.env.PORT}`);
    connectDB();
})
