import Insurance from "../models/Insurance.model.js";
import InsuranceClaimReq from "../models/insuranceClaimReq.model.js";
import jwt from "jsonwebtoken";
import user_model from "../models/user.model.js"

export const verifyTokenuser=(req,res,next)=>{

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
        const user=await user_model.findOne({email:decoded.email})

        if(!user){
            return res.status(400).send({
                message:"unauthorized, this user for this token doesn't exist"
            })
        }
        req.user=user

        next()
    })

};

export default verifyTokenuser;