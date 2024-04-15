
import express from "express";
import {appointRequest,approval} from "../controller/appointment.controller.js";

const router = express.Router();

router.post("/appointRequest", appointRequest);
router.post("/approval", approval);

export default router;