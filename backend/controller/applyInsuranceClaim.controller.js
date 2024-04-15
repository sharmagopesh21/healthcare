import Insurance from "../models/Insurance.model.js";
import InsuranceClaimReq from "../models/insuranceClaimReq.model.js";

export const applyReq  = async (req, res) => {
    try{
        const { email, requiredAmount, issue } = req.body;

        // Fetch the insurance details from the database
        const insurance = await Insurance.findOne({ email: email });

        if (!insurance) {
            return res.status(400).json({error: "No insurance found for this user"});
        }

        // Check if the insurance is active
        const currentDate = new Date();
        const start = new Date(insurance.startDate);
        const end = new Date(insurance.endDate);

        if (currentDate < start || currentDate > end) {
            return res.status(400).json({error: "The insurance has ended"});
        }

        // Check if the required amount is less than or equal to the amount in the insurance
        if (requiredAmount > insurance.amount) {
            return res.status(400).json({error: "The required amount is more than the amount in the insurance"});
        }

        // Create a new insurance claim request
        const newClaimReq = new InsuranceClaimReq({
            ...insurance._doc,
            requiredAmount,
            issue
        });

        // Save the new claim request
        const savedClaimReq = await newClaimReq.save();

        res.json(savedClaimReq);
    } catch(error){
        console.log("Error in applyInsuranceClaim controller ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}
