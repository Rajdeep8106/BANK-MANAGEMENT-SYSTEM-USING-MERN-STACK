import React from "react";
import './AccountDetails.css';
import logoImage from "../../src/Images/image1.jpg";

const AccountDetails = ({ customer, updatedBalance }) => {

  if (!customer) {
    return <div>Loading customer details...</div>;
  }

  return (
    <div className="account-container">
      <div className="image-account-container">
        
      </div>
      <div className="text-account-container">
      <img src={logoImage} alt="Hema Coding Bank logo" style={{ height: '200px',width:'500px',}} />

        <h2>Account Details :</h2>

        <p>Username: {customer.username}</p>
        <p>Account Number: {customer.accountNumber}</p>
        <p>Branch: {customer.branch}</p>
        <p>Phone Number: {customer.phoneNumber}</p>
        <p>Available Balance: {customer.balance}</p>
       
      </div>
    </div>
  );
};

export default AccountDetails;
