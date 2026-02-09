import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

linkSchema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model("Link", linkSchema);
