import mongoose, { InferSchemaType, Schema, Types } from "mongoose";
const audioSchema = new Schema(
    {
        audioFile: {
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
        Artist: {
            type: String
        },
        isPublish: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required : true
        },
        keyword : [{
            type : String
        }]
    },
    {
        timestamps: true
    }
);
export const Audio = mongoose.model("Audio", audioSchema);