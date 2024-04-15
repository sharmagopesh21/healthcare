import express from "express"
import { applyReq } from "../controller/applyInsuranceClaim.controller.js";
import verifyTokencompany from "../middleware/company.mw.js";
import verifyTokendoctor from "../middleware/doctor.mw.js";
import verifyTokenuser from "../middleware/user.mw.js";

const router = express.Router();

router.post("/applyClaim",[verifyTokenuser], applyReq)

export default router;