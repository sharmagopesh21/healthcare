
import Insurance from "../models/Insurance.model.js";
import InsuranceClaimReq from "../models/insuranceClaimReq.model.js";
import jwt from "jsonwebtoken";
import Doctor from "../models/doctor.model.js"
import { JWT_SECRET } from "../config.js";

const verifyTokendoctor=(req,res,next)=>{

    const token=req.headers["x-access-token"]

    if(!token){
        return res.status(403).send({
            message:"no token found:unauthorized"
        })
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => { // Use JWT_SECRET
        console.log("check2");
        console.log("hell");
        if (err) {
          return res.status(401).send({ message: "unauthorized !" });
        }
        console.log("3");
        console.log(decoded.email);
        const doctor = await Doctor.findOne({ email: decoded.email });
        console.log(doctor);
        if (!doctor) {
          return res.status(400).send({
            message: "unauthorized, this user for this token doesn't exist"
          });
        }
        req.doctor = doctor;
        next();
      });

};

export default verifyTokendoctor;