import Insurance from "../models/Insurance.model.js";

export const CurrentInsurance = async (req, res) => {
    try {
        // Fetch all insurances purchased by the user
        const email = req.user.email;
        const insurances = await Insurance.find({ userEmail: email });

        // Get the current date
        const currentDate = new Date();

        const insuranceData = insurances.map(insurance => {
            const startDate = new Date(insurance.startDate);
            const endDate = new Date(insurance.endDate);

            const isActive = startDate <= currentDate && currentDate <= endDate;

            return {
                ...insurance._doc,
                isActive,
                actions: {
                    renew: !isActive,
                    claim: isActive
                }
            };
        });

        // Send the data to the client
        res.status(200).json(insuranceData);
    } catch (error) {
        console.log("Error in insurance controller ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
