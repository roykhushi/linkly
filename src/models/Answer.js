import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Answer", answerSchema);
