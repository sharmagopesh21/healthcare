import { useState, useEffect } from 'react';

const useScheduleAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/appointment/prevappoint');
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return { loading, appointments };
};

export default useScheduleAppointment;