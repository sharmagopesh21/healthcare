import React, { useState } from 'react';
import useApplyInsurance from '../hooks/useApplyInsurance';

const ApplyInsurance = () => {
  const { loading, insurances, applyInsurance } = useApplyInsurance();
  const appUserString = localStorage.getItem("app-user");
  const appUser = appUserString ? JSON.parse(appUserString) : { email: null };
  const userEmail = appUser.email;

  const [companyEmail, setCompanyEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleCompanySelect = (e) => {
    setSelectedCompany(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyInsurance({ companyEmail, startDate, endDate, amount });
    setCompanyEmail('');
    setStartDate('');
    setEndDate('');
    setAmount('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Ensure insurances is an array
  const insurancesArray = Array.isArray(insurances) ? insurances : [];

  // Filter the insurances based on the user's companyEmail
  const currentInsurances = insurancesArray.filter(
    (insurance) => insurance.userEmail === userEmail
  );

  return (
    <div>
      <div>
        <h2>Apply for Insurance</h2>
        {/* <select value={selectedCompany} onChange={handleCompanySelect}>
          <option value="">Select a company</option>
          <option value="company1@example.com">Company 1</option>
          <option value="company2@example.com">Company 2</option>
          {/* Add more options for insurance companies */}
        {/* </select> */} */
        <form onSubmit={handleSubmit}>
          <input
            type="companyEmail"
            placeholder="Company Email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Start Date (dd-mm-yyyy)"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="End Date (dd-mm-yyyy)"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit">Apply</button>
        </form>
      </div>
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

export default ApplyInsurance;