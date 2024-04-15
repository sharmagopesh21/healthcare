
import Appointment from "../models/appoinment.model.js";

export const appointRequest = async (req, res) => {
    try {
      const { fullName, email,gender,address,age,phone,date,time,docemail } = req.body;
  
      if(!isValidEmail(email)){
          return res.status(400).json({error: "Your Email is Not Valid"});
      }

      if(!isValidTime(time)){
        return res.status(400).send({
            message:"Time is not valid"
        })
      }

      if(!isValidDate(date)){
        return res.status(400).send({
            message:"date is not valid"
        })
      }

      if(!isValidEmail(docemail)){
        return res.status(400).json({error: "Doctor Email is Not Valid"});
      }
  
      const appoin = await Appointment.findOne({email:email,docemail:docemail});
  
      if (appoin) {
        return res.status(400).json({ error: "a Appointment request with this Doctor already exist" });
      }
      
      const newappoin = new Appointment({
        fullName,
        email,
        gender,
        address,
        age,
        phone,
        date,
        time,
        docemail
      });
  
      if (newappoin) {
        // Generate JWT Token
      //   generateTokenAndSetCookie(newUser._id, res);
        await newappoin.save();
  
        res.status(201).json({
          _id: newappoin._id,
          fullName: newappoin.fullName,
          email: newappoin.email,
        });
      } else {
        res.status(400).json({ error: "Invalid Data provided" });
      }
    } catch (error) {
      console.log("Error in appoint request controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const approval=async(req,res)=>{
    try {
        const {email,decision,docemail} = req.body;

        if(!isValidEmail(email)){
            return res.status(400).json({error: "Your Email is Not Valid"});
        }

        if(!isValidEmail(docemail)){
            return res.status(400).json({error: "Doctor Email is Not Valid"});
        }

        const approv = await Appointment.findOne({email:email,docemail:docemail});

        if (!approv) {
            return res.status(400).json({ error: "this appointment request does not exist" });
        } 

        await Appointment.updateOne({ email: email,docemail:docemail}, { progress: decision })

        res.status(201).json({
            _id: approv._id,
            email: approv.email,
            fullName:approv.fullName,
            decision:decision
        });

    } catch (error) {
      console.log("Error in approval controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const approvedRequest=async(req,res)=>{
    try {
        const {docemail}=req.body;

        if(!isValidEmail(docemail)){
            return res.status(400).json({error: "Doctor Email is Not Valid"});
        }

        const apprequest = await Appointment.find({docemail:docemail,progress:"Approved"});

        if (apprequest.length==0) {
            return res.status(201).json({
                message:"no Request had been yet approved"
            });
        }

        res.status(200).json(apprequest);

    } catch (error) {
        console.log("Error in approvedRequest controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const Request=async(req,res)=>{
    try {
        const {docemail}=req.body;

        if(!isValidEmail(docemail)){
            return res.status(400).json({error: "Doctor Email is Not Valid"});
        }

        const apprequest = await Appointment.find({docemail:docemail,progress:"Pending"});

        if (apprequest.length==0) {
            return res.status(201).json({
                message:"no Request had been yet approved"
            });
        }

        res.status(200).json(apprequest);

    } catch (error) {
        console.log("Error in Request controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const notapprove=async(req,res)=>{
    try {
        const {docemail}=req.body;

        if(!isValidEmail(docemail)){
            return res.status(400).json({error: "Doctor Email is Not Valid"});
        }

        const apprequest = await Appointment.find({docemail:docemail,progress:"Not Approved"});

        if (apprequest.length==0) {
            return res.status(201).json({
                message:"no Request is approved"
            });
        }

        res.status(200).json(apprequest);

    } catch (error) {
        console.log("Error in not approved controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const prevappoint= async (req, res) => {
    try {
      const {email} = req.body;
  
      if(!isValidEmail(email)){
          return res.status(400).json({error: "Your Email is Not Valid"});
      }

      const appoin = await Appointment.find({email});
  
      if (appoin.length==0) {
        return res.status(400).json({ message: "no previous appointments are there" });
      }

      res.status(200).json(appoin)

    } catch (error) {
      console.log("Error in appoint request controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

function isValidEmail(email) {
    const re = /@.*\.com/;
    return re.test(email);
}

function isValidDate(dateString) {
    // Check if the date string matches the format dd-mm-yyyy
    var regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    var match = regex.exec(dateString);
    if (!match) {
        return false;
    }

    // Parse the date parts
    var day = parseInt(match[1], 10);
    var month = parseInt(match[2], 10);
    var year = parseInt(match[3], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month <= 0 || month > 12) {
        return false;
    }

    // Check the range of day
    var monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        // In a leap year, February has 29 days.
        monthLengths[1] = 29;
    }
    return day > 0 && day <= monthLengths[month - 1];
}

function isValidTime(time) {
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeFormat.test(time);
}