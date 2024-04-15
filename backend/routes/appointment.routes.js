
import express from "express";
import {appointRequest,approval,approvedRequest,Request,notapprove,prevappoint} from "../controller/appointment.controller.js";

const router = express.Router();

router.post("/appointRequest", appointRequest);
router.post("/approval", approval);
router.post("/approvedRequest", approvedRequest);
router.post("/Request", Request);
router.post("/notapprove", notapprove);
router.post("/prevappoint", prevappoint);

export default router;