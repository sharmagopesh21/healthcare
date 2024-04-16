import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useCurrentInsurance = () => {
  const [loading, setLoading] = React.useState(false);
  const [insurances, setInsurances] = React.useState([]);

  useEffect(() => {
    const getInsurances = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/currentInsurance/");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setInsurances(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getInsurances();
  }, []);
  return { loading, insurances };
};

export default useCurrentInsurance;
