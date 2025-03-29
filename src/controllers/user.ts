import { NextFunction, Response, Request } from "express";
import { User } from "../models";
import { DeleteFromCloudinary, UploadCloudinary } from "../utils";
import { BadRequestError } from "../errors";

export const GetUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.query;

    const user = await User.findOne({ _id })
      .select(["_id", "email", "username", "bio"])
      .lean();

    if (!user) {
      throw new BadRequestError("User does not exist with this user id.");
    }

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UpdateUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email } = req.body;
    let dp;

    if (req.file) {
      dp = await UploadCloudinary(req.file);

      if (req.user?.dp?.file_id) {
        await DeleteFromCloudinary(req.user.dp.file_id);
      }
    }

    await User.findByIdAndUpdate(req.user?._id, {
      $set: {
        username,
        email,
        dp,
      },
    });

    res.status(200).send("Updated");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
