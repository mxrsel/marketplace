import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import mongoDb from "./mongoDb";
import path from "path";
import config from "./config";
import { userRouter } from './router/users';
import { itemsRouter } from './router/items';
import { categoryRouter } from './router/categories';


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/items', itemsRouter);
app.use('/categories', categoryRouter);

const run = async () => {
    await mongoose.connect(config.mongoDbPath);

    app.listen(port, () => {
        console.log(`Server started on: http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));