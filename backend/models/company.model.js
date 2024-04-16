import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    }
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
