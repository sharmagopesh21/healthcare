import Insurance from "../models/Insurance.model.js";
import InsuranceClaimReq from "../models/insuranceClaimReq.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const verifyTokenuser=(req,res,next)=>{
    // console.log(req.cookies)
    //const token=req.headers["x-access-token"]
    const token=req.cookies.jwt
    console.log(token)
    if(!token){
        return res.status(403).send({
            message:"no token found:unauthorized"
        })
    }

    jwt.verify(token, "USER", async (err, decoded) => { // Use JWT_SECRET
        console.log("check2");
        console.log("hell");
        if (err) {
          return res.status(401).send({ message: "unauthorized !" });
        }
        console.log("3");
        console.log(decoded.email);
        const user = await User.findOne({ email: decoded.email });
        console.log(user);
        if (!user) {
          return res.status(400).send({
            message: "unauthorized, this user for this token doesn't exist"
          });
        }
        req.user = user;
        next();
      });

};

export default verifyTokenuser;