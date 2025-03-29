import { cloudinary } from "../config";
import { CloudinaryError } from "../errors";
import fs from "fs";

export const UploadCloudinary = async (file: Express.Multer.File) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "Uploads",
    });

    //Deleting file from uploads folder
    fs.unlink(file.path, (err) => {
      if (err) {
        throw err;
      }
    });

    return { url: result.secure_url, file_id: result.public_id };
  } catch (err) {
    console.log(err);
    throw new CloudinaryError();
  }
};
