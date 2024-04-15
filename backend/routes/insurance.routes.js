import express from "express";
import { Approve } from "../controller/insurance.controller.js";
import verifyTokencompany from "../middleware/company.mw.js";
import verifyTokendoctor from "../middleware/doctor.mw.js";
import verifyTokenuser from "../middleware/user.mw.js";

const router = express.Router();

router.post("/ApproveInsurance",[verifyTokencompany], Approve);
export default router;