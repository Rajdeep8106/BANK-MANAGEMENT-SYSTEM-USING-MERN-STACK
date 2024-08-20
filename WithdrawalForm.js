import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import "./WithdrawalForm.css";
import logoImage from "../../src/Images/image4.jpg";

const WithdrawalForm = ({ customer, upadetBalance }) => {
  // Always call the useState hook unconditionally
  const [withdrawalData, setWithdrawalData] = useState({
    username: customer ? customer.username : "",
    accountNumber: customer ? customer.accountNumber : "",
    withdrawalAmount: "",
    withdrawalType: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(withdrawalData);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/withdraw",
        withdrawalData
      );
      console.log(response.data);
      upadetBalance(response.data.balance);

      Swal({
        title: "Withdrawal Successful!",
        text: `Amount withdrawn: ${withdrawalData.withdrawalAmount}`,
        icon: "success",
      });
    } catch (error) {
      console.error("Withdraw failed", error);
    }
  };

  const handleClear = () => {
    setWithdrawalData({
      username: customer ? customer.username : "",
      accountNumber: customer ? customer.accountNumber : "",
      withdrawalAmount: "",
      withdrawalType: "",
    });
  };

  // Instead of returning early, handle the undefined customer in the return statement
  return (
    <div className="withdraw-container">
      <div className="image-withdraw-container"></div>

      <div className="text-withdraw-container">
        <img src={logoImage} alt="Hema Coding Bank logo" />
        {customer ? (
          <form onSubmit={handelSubmit}>
            <h2>Withdrawal Form :</h2>
            <p>Username: {customer.username} </p>
            <p>Account Number: {customer.accountNumber}</p>
            <label>Withdrawal Amount:</label>
            <input
              type="number"
              placeholder="Withdrawal Amount"
              value={withdrawalData.withdrawalAmount}
              onChange={(e) =>
                setWithdrawalData({
                  ...withdrawalData,
                  withdrawalAmount: e.target.value,
                })
              }
              required
            />
            <label>Withdrawal Type:</label>
            <input
              type="text"
              placeholder="Withdrawal Type"
              value={withdrawalData.withdrawalType}
              onChange={(e) =>
                setWithdrawalData({
                  ...withdrawalData,
                  withdrawalType: e.target.value,
                })
              }
              required
            />
            <button type="submit">Withdraw</button>
            <button type="button" onClick={handleClear}>
              Clear
            </button>
          </form>
        ) : (
          <p>Loading customer data...</p>
        )}
      </div>
    </div>
  );
};

export default WithdrawalForm;
