import React, { useEffect } from "react";
import toast from "react-hot-toast";

const usePendingRequest = () => {
  const [loading, setLoading] = React.useState(false);
  const [appointments, setAppointments] = React.useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/appointment/prevappoint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: localStorage.getItem("app-user") }),
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setAppointments(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getAppointments();
  }, []);

  return { loading, appointments };
};

export default usePendingRequest;