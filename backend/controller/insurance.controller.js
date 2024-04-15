import Insurance from "../models/Insurance.model.js";
import PendingInsurance from "../models/pendingInsuranceReq.model.js";

export const Approve = async (req, res) => {
    try {
        const { compEmail, requestId, decision } = req.body;
        const request = await PendingInsurance.findOne({ _id: requestId, companyEmail: compEmail });

        if (!request) {
            return res.status(404).json({ error: "Request not found" });
        }

        if (decision === 'approve') {
            const insurance = new Insurance(request.toObject());
            await insurance.save();

            await PendingInsurance.deleteOne({ _id: requestId });
            res.status(200).json({ message: "Insurance request approved and saved" });
        } else if (decision === 'deny') {
            await PendingInsurance.deleteOne({ _id: requestId });
            res.status(200).json({ message: "Insurance request denied" });
        } else {
            res.status(400).json({ error: "Invalid decision" });
        }
    } catch (error) {
        console.log("Error in insurance controller ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
