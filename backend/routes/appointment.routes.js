
import express from "express";
import {appointRequest,approval,approvedRequest,Request,notapprove,prevappoint} from "../controller/appointment.controller.js";
import verifyTokencompany from "../middleware/company.mw.js";
import verifyTokendoctor from "../middleware/doctor.mw.js";
import verifyTokenuser from "../middleware/user.mw.js";

const router = express.Router();

router.post("/appointRequest",[verifyTokenuser], appointRequest);
router.post("/approval", [verifyTokendoctor],approval);
router.post("/approvedRequest",[verifyTokendoctor], approvedRequest);
router.post("/Request",[verifyTokendoctor],Request);
router.post("/notapprove",[verifyTokendoctor],notapprove);
router.post("/prevappoint",[verifyTokenuser],prevappoint);

export default router;