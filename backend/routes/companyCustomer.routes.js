import express from "express";
import { AllUsers } from "../controller/companyCustomer.controller.js";
import verifyTokencompany from "../middleware/company.mw.js";
import verifyTokendoctor from "../middleware/doctor.mw.js";
import verifyTokenuser from "../middleware/user.mw.js";

const router = express.Router();

router.post("/",[verifyTokencompany],AllUsers);

export default router;