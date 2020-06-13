import mongoose from 'mongoose';
import { app } from "./app";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KET must bne defined');
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
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

