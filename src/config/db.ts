import mongoose from "mongoose";

export const DBConnection = async() => {
    try {
        const url = process.env.MONGODB_URL as string;

        mongoose.connection.on('connected', () => {
            console.log('Database connected successfully.');
        });

        mongoose.connection.on('disconnected', () => {
            console.error('Database connection disconnected.');
        });

        mongoose.connection.on('error', err => {
            console.error(`Error occurred: ${err}`);
        });

        await mongoose.connect(url);
    } catch (error) {
        console.error(`Connection Failed: ${error}`);
        process.exit(1);
    }
}