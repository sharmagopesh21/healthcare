import PendingInsurance from "../models/pendingInsuranceReq.model.js";

export const Apply = async (req, res) => {
    try{
        const {fullName, userEmail, companyEmail, gender, address, age, phone, startDate, endDate, amount} = req.body;

        if(!isValidEmail(userEmail)){
            return res.status(400).json({error: "Email Not Valid"});
        }

        if(!isValidEmail(companyEmail)){
            return res.status(400).json({error: "Email Not Valid"});
        }

        if(!isValidDate(startDate)){
            return res.status(400).json({error: "Start Date Not Valid"});
        }

        if(!isValidDate(endDate)){
            return res.status(400).json({error: "End Date Not Valid"});
        }

        const newInsuranceReq = new  PendingInsurance ({
            fullName, 
            userEmail,
            companyEmail,
            gender,
            address,
            age,
            phone,
            startDate,
            endDate,
            amount
        });

        if(newInsuranceReq) {
            await  newInsuranceReq.save();
            
            res.status(201).json({
                _id: newInsuranceReq._id,
            })
        }
        else{
            res.status(400).json( {error: "Invalid Insurance Data "})
        }
    }catch(error){
        console.log("Error in insurance req controller ", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }

}

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
