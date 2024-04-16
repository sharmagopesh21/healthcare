import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useApplyInsurance = () => {
  const [loading, setLoading] = React.useState(false);
  const [insurances, setInsurances] = React.useState([]);

  const applyInsurance = async ({ companyEmail, startDate, endDate, amount }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/insuranceReq/sendInsuranceReq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyEmail, startDate, endDate, amount }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // Update the insurances state with the new insurance request
      setInsurances((prevInsurances) => [...prevInsurances, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const getInsurances = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch("/api/insuranceReq/sendInsuranceReq");
  //       const data = await res.json();
  //       if (data.error) {
  //         throw new Error(data.error);
  //       }
  //       setInsurances(data);
  //     } catch (error) {
  //       toast.error(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getInsurances();
  // }, []);

  return { loading, insurances, applyInsurance };
};

export default useApplyInsurance;