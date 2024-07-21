import { Schema, model } from "mongoose";
import { IUser } from "../interfaces";
import bcrypt from "bcrypt";

const UserSchema = new Schema <IUser> (
    {
        username: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        bio: {
            type: String,
            default: "",
        },

        dp: {
            url: {
                type: String,
            },

            file_id: {
                type: String,
            }
        }
    }, {
        timestamps: true,
    }
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

export const User = model('User', UserSchema);