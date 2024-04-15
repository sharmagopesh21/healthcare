import express from "express";
import { AllUsers } from "../controller/companyCustomer.controller.js";

const router = express.Router();

router.post("/", AllUsers);

export default router;