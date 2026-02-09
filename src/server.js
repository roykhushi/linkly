import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";


dotenv.config();
await connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes)
app.use("/api/answers", answerRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});