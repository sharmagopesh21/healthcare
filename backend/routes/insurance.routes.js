import express from "express";
import { Approve } from "../controller/insurance.controller.js";
const router = express.Router();

router.post("/ApproveInsurance", Approve);
export default router;