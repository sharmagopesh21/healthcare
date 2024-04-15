import express from "express";
import { getAllRequests , approveRequest, rejectRequest } from "../controller/insuranceClaim.controller.js";

const router = express.Router();

router.post("/all", getAllRequests);
router.post("/approve", approveRequest);
router.post("/reject", rejectRequest);

export default router;