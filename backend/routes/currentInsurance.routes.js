import express from "express";
import { CurrentInsurance } from "../controller/currentInsurance.controller.js";

const router = express.Router();

router.post("/", CurrentInsurance);

export default router;