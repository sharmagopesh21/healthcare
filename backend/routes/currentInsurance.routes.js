import express from "express";
import { CurrentInsurance } from "../controller/currentInsurance.controller.js";
import verifyTokencompany from "../middleware/company.mw.js";
import verifyTokendoctor from "../middleware/doctor.mw.js";
import verifyTokenuser from "../middleware/user.mw.js";

const router = express.Router();

const {res} = [verifyTokenuser]

// console.log(res)
router.get("/",[verifyTokenuser],CurrentInsurance);

export default router;