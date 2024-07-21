import { cloudinary } from "../config";
import { CloudinaryError } from "./errors";

export const DeleteFromCloudinary = async(file_id: string) => {
    try {
        await cloudinary.uploader.destroy(file_id);
    } catch (err){
        console.log(err);
        throw new CloudinaryError('Error occurred while deleting file from cloudinary.');
    }
};