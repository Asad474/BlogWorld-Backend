import mongoose from "mongoose";

export const DBConnection = async() => {
    try {
        const url = process.env.MONGODB_URL as string;

        mongoose.connection.on('connected', () => {
            console.log('Database connected successfully.');
        });

        mongoose.connection.on('disconnected', () => {
            console.error('Mongoose connection disconnected.');
        });

        mongoose.connection.on('error', err => {
            console.error(`Error occurred after connection ${err}`);
        });

        await mongoose.connect(url);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}