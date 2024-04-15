import express from "express";
import { Apply } from "../controller/insuranceReq.controller.js";
import verifyTokencompany from "../middleware/company.mw.js";
import verifyTokendoctor from "../middleware/doctor.mw.js";
import verifyTokenuser from "../middleware/user.mw.js";

const router = express.Router();

router.post("/sendInsuranceReq",[verifyTokenuser],Apply);

export default router;