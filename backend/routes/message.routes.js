import express from "express";
import { sendMessage, getMessages } from "../controller/message.controller.js"

const router = express.Router();

router.get("/:id", getMessages)
router.post("/send/:id", sendMessage);

export default router