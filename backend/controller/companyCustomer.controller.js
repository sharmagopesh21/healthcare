import Insurance from "../models/Insurance.model.js";

export const AllUsers = async (req, res) => {
    try{
        const currentDate = new Date();
        const {compEmail} = req.body;
        const allUsers = await Insurance.find({ companyEmail: compEmail });

        const usersWithInsuranceStatus = allUsers.map(user => {
            let startDate = new Date(user.startDate);
            let endDate = new Date(user.endDate);
            user = user.toObject();
            user.insuranceIsActive = startDate <= currentDate && endDate >= currentDate;
            return user;
        });

        if(usersWithInsuranceStatus.length > 0){
            res.status(200).json({ status: "success", data: usersWithInsuranceStatus });
        } else {
            res.status(404).json({ status: "fail", message: "No insurances found for this company." });
        }
    } catch(error){
        console.log("Error in Company Customer Controller : ", error.message);
        res.status(500).json( {error: "Internal Server Error"} )
    }
}
