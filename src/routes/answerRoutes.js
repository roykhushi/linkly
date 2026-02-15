import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {getAnswers,createAnswer,updateAnswer,deleteAnswer} from "../controllers/answerController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/",getAnswers);
router.post("/",createAnswer);
router.put("/:id",updateAnswer);
router.delete("/:id",deleteAnswer);

export default router;