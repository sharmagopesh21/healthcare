import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import user_model from "./models/user.model.js"
import bcrypt from "bcryptjs"
import connectToMongoDB from "./db/connectToMongoDB.js"
import authRoutes from "./routes/auth.routes.js";
import appoinRoutes from "./routes/appointment.routes.js";

const app = express()

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Hello");
})

app.use("/api/auth", authRoutes);
app.use("/api/appointment", appoinRoutes);

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server started at port no. : ${PORT}`)
})