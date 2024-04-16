import React from 'react';
import usePendingRequest from '../hooks/usePendingRequest';

const PendingRequest = () => {
  const { loading, appointments } = usePendingRequest();
  const appUserString = localStorage.getItem("app-user");
  const appUser = appUserString ? JSON.parse(appUserString) : { email: null };
  const userEmail = appUser.email;

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentAppointments = appointments.filter(
    (appointment) => appointment.email === userEmail && appointment.progress === "Pending"
  );

  return (
    <div>
      {currentAppointments.length > 0 ? (
        currentAppointments.map((appointment, index) => (
          <div key={index}>
            <h3>Appointment {index + 1}</h3>
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>User Email</th>
                  <th>Doctor Email</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{appointment.fullName}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.docemail}</td>
                  <td>{appointment.gender}</td>
                  <td>{appointment.address}</td>
                  <td>{appointment.age}</td>
                  <td>{appointment.phone}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div>No pending appointments</div>
      )}
    </div>
  );
};

export default PendingRequest;