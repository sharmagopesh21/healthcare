import React, { useState } from 'react';

const ScheduleAppointment = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [docEmail, setDocEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/appointment/appointRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          time,
          docemail: docEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Appointment request successful
        console.log(data);
        // Reset form fields
        setDate('');
        setTime('');
        setDocEmail('');
      } else {
        // Appointment request failed
        // console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Schedule Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="docEmail">Doctor's Email:</label>
          <input
            type="email"
            id="docEmail"
            value={docEmail}
            onChange={(e) => setDocEmail(e.target.value)}
          />
        </div>
        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
  );
};

export default ScheduleAppointment;