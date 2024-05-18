import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';


import postRoute from './routes/postRoute.js';
import dalleRoute from './routes/dalleRoute.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoute);
app.use('/api/v1/dalle', dalleRoute);

app.get('/', async(req, res) => {
    res.status(200).json({
        message: 'Hello from DALL.E!',
      });
})

const connectDB = () => {

    mongoose.set('strictQuery',true);
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => {
            console.log('Failed to connect to MongoDB')
        })
}

const startServer = async () => {
    try{
         connectDB();
        app.listen(5000, () => console.log('server is started on port http://localhost:5000'))
    }catch(err){
        console.log(err)
    }
    
}

startServer();




