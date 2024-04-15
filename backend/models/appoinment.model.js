import mongoose from "mongoose";

const AppoinSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
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
        min: 1
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    docemail:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    progress:{
        type:String,
        default:"Pending",
        enum:["Approved","Not Approved","Pending"]
    }
  },
  { timestamps: true }
);

AppoinSchema.index({ email: 1, docemail: 1 }, { unique: true });

const Appointment = mongoose.model("Appointments", AppoinSchema);

export default Appointment;
