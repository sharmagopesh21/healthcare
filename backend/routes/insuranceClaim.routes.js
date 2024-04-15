import express from "express";
import { getAllRequests , approveRequest, rejectRequest } from "../controller/insuranceClaim.controller.js";
import verifyTokencompany from "../middleware/company.mw.js";
import verifyTokendoctor from "../middleware/doctor.mw.js";
import verifyTokenuser from "../middleware/user.mw.js";

const router = express.Router();

router.post("/all",[verifyTokencompany],getAllRequests);
router.post("/approve",[verifyTokencompany],approveRequest);
router.post("/reject",[verifyTokencompany],rejectRequest);

export default router;