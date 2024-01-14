import mongoose, { InferSchemaType, Schema, Types } from "mongoose";
const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true,
        },
        thimbnail: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        duration: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublish: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);
type User = InferSchemaType<typeof videoSchema>;
export const Video = mongoose.model("Video", videoSchema);