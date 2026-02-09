import mongoose from "mongoose";


const linkSchema = new mongoose.Schema(
    {
        //associating link with user
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

//ensure each user has a unique link name
linkSchema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model("Link", linkSchema);
