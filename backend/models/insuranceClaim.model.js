import mongoose from "mongoose";

const insuranceClaimSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    requiredAmount: {
        type: Number,
        required: true
    },
    issue: {
        type: String,
        required: true
    }
});


const InsuranceClaim = mongoose.model("InsuranceClaim", insuranceClaimSchema);

export default InsuranceClaim;