import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert";
import './DepositForm.css'
import logoImage from "../../src/Images/image1.jpg";
const DepositForm = ({ customer }) => {
    const [depositData, setDepositData] = useState({
        username: "",
        accountNumber: "",
        date: "", 
        depositAmount: "", 
        depositType: "", 
    });

    useEffect(() => {
        if (customer) {
            setDepositData((prevData) => ({
                ...prevData,
                username: customer.username,
                accountNumber: customer.accountNumber,
            }));
        }
    }, [customer]);

    const handleDeposit = async (e) => {
        e.preventDefault();
        console.log(depositData);
        try {
            await axios.post("http://localhost:3001/api/deposit", depositData);
            console.log("Deposit successful");
            Swal({
                title: 'Deposit Successful',
                text: `Amount deposited: ${depositData.depositAmount}`,
                icon: "success",
                button: "OK",
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const handleClear = () => {
        setDepositData((prevData) => ({
            ...prevData,
            date: "",
            depositAmount: "",
            depositType: "",
        }));
    };

    if (!customer) {
        return <div>Please log in to make a deposit.</div>;
    }

    return (
          <div className="deposit-container">
            <div className="image-deposit-container">
            </div>
            <div className="text-deposit-container">
            <img src={logoImage} alt="Hema Coding Bank logo" style={{height:'90px',width:'500px'}}/>
            <div>
            <form onSubmit={handleDeposit}>
                <h2>Deposit Form</h2>
                <p className="abc">Username: {customer.username}</p>
                <p className="abc">Account Number: {customer.accountNumber}</p>
                <label>Deposit Date:</label>
                <input
                    type="date"
                    value={depositData.date} 
                    onChange={(e) =>
                        setDepositData({ ...depositData, date: e.target.value })
                    }
                    required
                />
                <label>Deposit Amount:</label>
                <input
                    type="number"
                    value={depositData.depositAmount} 
                    onChange={(e) =>
                        setDepositData({ ...depositData, depositAmount: e.target.value })
                    }
                    required
                />
                <label>Deposit Type:</label>
                <input
                    type="text" 
                    value={depositData.depositType} 
                    onChange={(e) =>
                        setDepositData({ ...depositData, depositType: e.target.value })
                    }
                    required
                />
                <button type="submit">Deposit</button>
                <button type="button" onClick={handleClear}>Clear</button>
            </form>
        </div>
            </div>
          </div>
    );
};

export default DepositForm;
