import React from 'react';
import useCurrentInsurance from '../hooks/useCurrentInsurance';

const CurrentInsurance = () => {
  const { loading, insurances } = useCurrentInsurance();
  const appUserString = localStorage.getItem("app-user");
  const appUser = appUserString ? JSON.parse(appUserString) : { email: null };
  const userEmail = appUser.email;
  // const userEmail = appuser.email;

  // console.log(userEmail)

  if (loading) {
    return <div>Loading...</div>;
  }

  // Ensure insurances is an array
  const insurancesArray = Array.isArray(insurances) ? insurances : [];

  // Filter the insurances based on the user's email
  const currentInsurances = insurancesArray.filter(
    (insurance) => insurance.userEmail === userEmail
  );

  return (
    <div>
      {currentInsurances.length > 0 ? (
        currentInsurances.map((insurance, index) => (
          <div key={index}>
            <h3>Insurance {index + 1}</h3>
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>User Email</th>
                  <th>Company Email</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Amount</th>
                  <th>Renew</th>
                  <th>Claim</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{insurance.fullName}</td>
                  <td>{insurance.userEmail}</td>
                  <td>{insurance.companyEmail}</td>
                  <td>{insurance.gender}</td>
                  <td>{insurance.address}</td>
                  <td>{insurance.age}</td>
                  <td>{insurance.phone}</td>
                  <td>{insurance.startDate}</td>
                  <td>{insurance.endDate}</td>
                  <td>{insurance.amount}</td>
                  <td>{insurance.renew ? 'Yes' : 'No'}</td>
                  <td>{insurance.claim ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div>No current insurance</div>
      )}
    </div>
  );
};

export default CurrentInsurance;