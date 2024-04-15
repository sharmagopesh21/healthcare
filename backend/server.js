import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import mongoose from "mongoose"
import user_model from "./models/user.model.js"
import bcrypt from "bcryptjs"
import cors from "cors"
import connectToMongoDB from "./db/connectToMongoDB.js"
import authRoutes from "./routes/auth.routes.js";
import appoinRoutes from "./routes/appointment.routes.js";
import insurancereqRoutes from "./routes/insuranceReq.routes.js"
import insuranceRoutes from "./routes/insurance.routes.js";
import insuranceClaimRoutes from "./routes/insuranceClaim.routes.js"
import currentInsuranceRoutes from "./routes/currentInsurance.routes.js"
import companyCustomerRoutes from "./routes/companyCustomer.routes.js"
import applyInsuranceClaimRoutes from "./routes/applyInsuranceClaim.routes.js"
import messageRoutes from "./routes/message.routes.js";

const app = express()

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.use("/api/auth", authRoutes);
app.use("/api/appointment", appoinRoutes);
app.use("/api/insuranceReq", insurancereqRoutes)
app.use("/api/insuranceApprove", insuranceRoutes)
app.use("/api/insuranceClaim", insuranceClaimRoutes)
app.use("/api/currentInsurance", currentInsuranceRoutes)
app.use("/api/allCustomers", companyCustomerRoutes)
app.use("/api/claimInsurance", applyInsuranceClaimRoutes)

app.use("/api/messages", messageRoutes);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server started at port no. : ${PORT}`)
})