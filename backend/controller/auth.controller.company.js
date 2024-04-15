
import Company from "../models/company.model.js";
import bcrypt from "bcryptjs";

export const signupComp = async (req, res) => {
    try {
      const { Name, email, password, confirmPassword,address,phone } = req.body;
  
      if(!isValidEmail(email)){
          return res.status(400).json({error: "Email Not Valid"});
      }
      
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords Dont Match" });
      }
  
      const comp = await Company.findOne({email});
  
      if (comp) {
        return res.status(400).json({ error: "a Company with this email already exist" });
      }
  
      //HASH PASSWORD HERE
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newcomp = new Company({
        Name,
        email,
        password: hashedPassword,
        address,
        phone
      });
  
      if (newcomp) {
        // Generate JWT Token
      //   generateTokenAndSetCookie(newUser._id, res);
        await newcomp.save();
  
        res.status(201).json({
          _id: newcomp._id,
          Name: newcomp.Name,
          email: newcomp.email,
        });
      } else {
        res.status(400).json({ error: "Invalid Company Data" });
      }
    } catch (error) {
      console.log("Error in Signup controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

export const signinComp = async (req, res) => {
    try {
      const {email, password} = req.body;
  
      if(!isValidEmail(email)){
          return res.status(400).json({error: "Email Not Valid"});
      }
      const Comp = await Company.findOne({ email });
      const isPasswordCorrect = await bcrypt.compare(
      password,
      Comp?.password || ""
      );

      if (!Comp || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
      }

        // generateTokenAndSetCookie(user._id, res);

      res.status(200).json({
        _id: Comp._id,
        Name: Comp.Name,
        email: Comp.email,
      });

    } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logoutCompany = (req, res) => {
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