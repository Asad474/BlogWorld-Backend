import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { FileUploaderError } from "../errors";
import path from "path";
import fs from "fs";

const uploadDir = `${path.join(__dirname, "..")}/uploads`;

fs.promises.mkdir(uploadDir).catch((err) => {
  if (err.code !== "EEXIST") {
    // Handle any errors that are not due to the directory already existing
    throw err;
  }
});

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, uploadDir);
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new FileUploaderError(
        "Upload file should be image of jpg/jpeg/png format."
      )
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

export const UploadFile = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const uploadfile = upload.single(fieldName);

    uploadfile(req, res, (err) => {
      if (err) {
        next(new FileUploaderError(err.message));
      }

      next();
    });
  };
};
