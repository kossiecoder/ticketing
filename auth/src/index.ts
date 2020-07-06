import mongoose from 'mongoose';
import { app } from "./app";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KET must bne defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('connected to mongodb')
    } catch (e) {
        console.log(e);
    }

    app.listen(3000, () => {
        console.log('on 3000!');
    });
};

start();

