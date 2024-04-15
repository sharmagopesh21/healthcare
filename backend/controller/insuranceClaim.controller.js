import InsuranceClaim from "../models/InsuranceClaim.model.js";
import InsuranceClaimReq from "../models/insuranceClaimReq.model.js";

// Function to get all the requests
export const getAllRequests = async (req, res) => {
    try {
        const { compEmail } = req.body;
        const requests = await InsuranceClaimReq.find({ companyEmail: compEmail });
        res.json(requests);
    } catch (error) {
        console.log("Error in Get All Requests controller ", error.message);
        res.status(500).json({ error: "Internal Server Error "});
    }
}

// Function to approve a request
export const approveRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        const request = await InsuranceClaimReq.findById(requestId);

        if (!request) {
            return res.status(404).json({ error: "No request found with this ID" });
        }

        // Create a new claim from the request
        const newClaim = new InsuranceClaim(request.toObject());
        const savedClaim = await newClaim.save();

        // Delete the request
        await InsuranceClaimReq.findByIdAndDelete(requestId);

        res.json({ message: "Request has been approved and claim has been created", claim: savedClaim });
    } catch (error) {
        console.log("Error in Approve Request controller ", error.message);
        res.status(500).json({ error: "Internal Server Error "});
    }
}

// Function to reject a request
export const rejectRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        const request = await InsuranceClaimReq.findById(requestId);

        if (!request) {
            return res.status(404).json({ error: "No request found with this ID" });
        }

        // Delete the request
        await InsuranceClaimReq.findByIdAndDelete(requestId);

        res.json({ message: "Request has been rejected" });
    } catch (error) {
        console.log("Error in Reject Request controller ", error.message);
        res.status(500).json({ error: "Internal Server Error "});
    }
}
