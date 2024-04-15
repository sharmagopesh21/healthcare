import express from "express"
import { applyReq } from "../controller/applyInsuranceClaim.controller.js";

const router = express.Router();

router.post("/applyClaim", applyReq)

export default router;