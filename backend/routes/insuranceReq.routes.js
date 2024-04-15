import express from "express";
import { Apply } from "../controller/insuranceReq.controller.js";
const router = express.Router();

router.post("/sendInsuranceReq", Apply);

export default router;