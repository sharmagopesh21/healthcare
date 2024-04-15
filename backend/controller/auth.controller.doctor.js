
import Doctor from "../models/doctor.model.js";
import bcrypt from "bcryptjs";

export const signupDr = async (req, res) => {
    try {
      const { fullName, email, password, confirmPassword, address, type, phone } = req.body;
  
      if(!isValidEmail(email)){
          return res.status(400).json({error: "Email Not Valid"});
      }
      
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords Dont Match" });
      }
  
      const dr = await Doctor.findOne({ email });
  
      if (dr) {
        return res.status(400).json({ error: "Username already exist" });
      }
  
      //HASH PASSWORD HERE
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newDoctor = new Doctor({
        fullName,
        email,
        password: hashedPassword,
        address,
        type,
        phone
      });
  
      if (newDoctor) {
        // Generate JWT Token
      //   generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
  
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        });
      } else {
        res.status(400).json({ error: "Invalid User Data" });
      }
    } catch (error) {
      console.log("Error in Signup controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const signinDr = async (req, res) => {
    try {
      const {email, password} = req.body;
  
      if(!isValidEmail(email)){
          return res.status(400).json({error: "Email Not Valid"});
      }
      const dr = await Doctor.findOne({ email });
      const isPasswordCorrect = await bcrypt.compare(
      password,
      dr?.password || ""
      );

      if (!dr || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
      }

    // generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: dr._id,
      fullName: dr.fullName,
      email: dr.email,
    });
    } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    }
};
export const logoutDr = (req, res) => {
    try {
      // res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

function isValidEmail(email) {
    const re = /@.*\.com/;
    return re.test(email);
}