import mongoose, { InferSchemaType, Schema } from "mongoose";
import bcrypt from "bcrypt";

export type UserType = {
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    avatar: string,
    watchHistory?: string[],
    password: string,
    refreshToken?: string
}
const userSchema = new Schema<UserType>(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        avatar: {
            type: String,
            required: true
        },
        watchHistory: [{
            type: Schema.Types.ObjectId,
            ref: "Video"
        }],
        password: {
            type: String,
            required: true,
            select: false
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next()
});
userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}
export const User = mongoose.model("User", userSchema);