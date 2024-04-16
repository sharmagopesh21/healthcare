

import Insurance from "../models/Insurance.model.js";
import InsuranceClaimReq from "../models/insuranceClaimReq.model.js";
import jwt from "jsonwebtoken";
import Company from "../models/company.model.js"
import { JWT_SECRET } from "../config.js";

export const verifyTokencompany=(req,res,next)=>{

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
        const company = await Company.findOne({ email: decoded.email });
        console.log(company);
        if (!company) {
          return res.status(400).send({
            message: "unauthorized, this user for this token doesn't exist"
          });
        }
        req.company = company;
        next();
      });

};

export default verifyTokencompany;