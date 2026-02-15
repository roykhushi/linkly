import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {getLink,createLink,updateLink,deleteLink} from "../controllers/linkController.js";

const router = express.Router();

//auth middleware to all link routes
//only authenticated users can access link routes
router.use(authMiddleware);

router.get("/",getLink);
router.post("/",createLink);
router.put("/:id",updateLink);
router.delete("/:id",deleteLink);

export default router;