import React, { useState } from 'react';
import axios from 'axios';
import useCart from '../../hooks/useCart';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Withdraw = () => {
   const [user]=useCart();   
   const axios=useAxiosPublic();                        
  const [coinsToWithdraw, setCoinsToWithdraw] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  
  const minWithdrawalCoins = 200; 
  const dollarRate = 20;
  const withdrawableDollars = coinsToWithdraw / dollarRate;

  const handleWithdrawal = async () => {
    if (coinsToWithdraw > user[0]?.coin || coinsToWithdraw < minWithdrawalCoins) {
      return;
    }

    const withdrawalData = {
      worker_email: user[0]?.email,
      worker_name: user[0]?.name,
      withdrawal_coin: coinsToWithdraw,
      withdrawal_amount: withdrawableDollars,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date().toISOString(),
      status: 'pending',
    };

    try {
      const response = await axios.post('/withdraw', withdrawalData);
      if (response.data.success) {
        alert('Withdrawal request submitted successfully!');
      } else {
        alert('Failed to process withdrawal.');
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      alert('Error processing withdrawal.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Withdrawal</h2>
      <p className="mb-2">Total Coins: {user[0]?.coin}</p>
      <p className="mb-4">Total Dollars: ${(user[0]?.coin / dollarRate).toFixed(2)}</p>
      
      <label className="block mb-2 font-medium">Coins to Withdraw</label>
      <input
        type="number"
        value={coinsToWithdraw}
        onChange={(e) => setCoinsToWithdraw(Number(e.target.value))}
        className="border rounded p-2 mb-4 w-full"
        placeholder="Enter coins to withdraw"
        min={0}
        max={user.coins}
      />

      <label className="block mb-2 font-medium">Withdrawal Amount ($)</label>
      <input
        type="number"
        value={withdrawableDollars.toFixed(2)}
        readOnly
        className="border rounded p-2 mb-4 w-full bg-gray-100"
      />

      <label className="block mb-2 font-medium">Select Payment System</label>
      <select
        value={paymentSystem}
        onChange={(e) => setPaymentSystem(e.target.value)}
        className="border rounded p-2 mb-4 w-full"
      >
        <option value="">Select Payment System</option>
        <option value="Bkash">Bkash</option>
        <option value="Rocket">Rocket</option>
        <option value="Nagad">Nagad</option>
      </select>

      <label className="block mb-2 font-medium">Account Number</label>
      <input
        type="text"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        className="border rounded p-2 mb-4 w-full"
        placeholder="Enter account number"
      />

       {user.coin >= minWithdrawalCoins ? ( 
        <button
          onClick={handleWithdrawal}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        >
          Withdraw
        </button>
       ) : (
        <p className="text-red-500 font-medium">Insufficient coins to withdraw</p>
      )} 
    </div>
  );
};

export default Withdraw;
