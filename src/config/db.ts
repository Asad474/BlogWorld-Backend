import { connect } from "mongoose";

export const DBConnection = async() => {
    try {
        const url = process.env.MONGODB_URL as string;
        await connect(url);
        console.log('Database Connected.');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}