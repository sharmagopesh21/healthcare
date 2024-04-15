

import Insurance from "../models/Insurance.model.js";
import InsuranceClaimReq from "../models/insuranceClaimReq.model.js";
import jwt from "jsonwebtoken";
import company_model from "../models/company.model.js"

export const verifyTokencompany=(req,res,next)=>{

    const token=req.headers["x-access-token"]

    if(!token){
        return res.status(403).send({
            message:"no token found:unauthorized"
        })
    }

    jwt.verify(token,"USER",async (err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"unauthorized !"
            })
        }
        const company=await company_model.findOne({email:decoded.email})

        if(!company){
            return res.status(400).send({
                message:"unauthorized, this user for this token doesn't exist"
            })
        }
        req.company=company

        next()
    })

};

export default verifyTokencompany;