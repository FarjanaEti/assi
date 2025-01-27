import React, { useEffect, useState } from 'react';
import useTask from '../../hooks/useTask';
import useSubmission from '../../hooks/useSubmission';
import useUsers from '../../hooks/useUsers';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const AdminHome = () => {
    const [task] = useTask();
    const { submission } = useSubmission();
    const [users] = useUsers();
    const [withdrawRequests, setWithdrawRequests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWithdrawRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/withdraw');
                const data = response.data;
                setWithdrawRequests(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('Failed to fetch withdrawal requests.');
            }
        };
        fetchWithdrawRequests();
    }, []);

    // Handle payment success
    const handlePaymentSuccess = async (id, withdrawal_amount, worker_email) => {
        try {
            const response = await axios.patch(`http://localhost:5000/withdraw/${id}`, {
                withdrawal_amount,
                worker_email,
            });
            console.log(response)

            if (response.data.success) {
                setWithdrawRequests((prevRequests) =>
                    prevRequests.map((req) =>
                        req._id === id ? { ...req, status: 'Approved' } : req
                    )
                );
                alert('Payment approved successfully and coins deducted!');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error approving payment:', error);
            alert('Failed to approve payment. Please try again.');
        }
    };

   
    const Workers = users.filter((user) => user.role === 'worker').length;
    const Buyers = users.filter((user) => user.role === 'buyer').length;
    const Coin = users.reduce((sum, user) => sum + user.coin, 0);
    const totalPayments = withdrawRequests.reduce(
        (sum, req) => sum + (req.withdrawal_amount || 0),
        0
    );

    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <title>Earnify | DashBoard | Admin Home</title>
            </Helmet>
            <h1 className="text-2xl font-bold mb-4">Admin Home</h1>

            {/* Heading */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-blue-100 rounded shadow">
                    <h2 className="font-semibold">Total Workers: {Workers}</h2>
                </div>
                <div className="p-4 bg-green-100 rounded shadow">
                    <h2 className="font-semibold">Total Buyers: {Buyers}</h2>
                </div>
                <div className="p-4 bg-yellow-100 rounded shadow">
                    <h2 className="font-semibold">Total Coin: {Coin}</h2>
                </div>
                <div className="p-4 bg-teal-100 rounded shadow">
                    <h2 className="font-semibold">Total Payments: {totalPayments.toFixed(2)}</h2>
                </div>
            </div>

            {/* Withdrawal Requests */}
            <h2 className="text-xl font-semibold mt-8 mb-4">Withdrawal Requests:</h2>
            {error && <p className="text-red-500">{error}</p>}
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Worker Email</th>
                        <th className="px-4 py-2">Worker Name</th>
                        <th className="px-4 py-2">Withdrawal Coin</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Payment System</th>
                        <th className="px-4 py-2">Account Number</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {withdrawRequests.map((request, index) => (
                        <tr key={index} className="border-t">
                            <td className="px-4 py-2">{request.worker_email}</td>
                            <td className="px-4 py-2">{request.worker_name}</td>
                            <td className="px-4 py-2">{request.withdrawal_coin}</td>
                            <td className="px-4 py-2">{request.withdrawal_amount}</td>
                            <td className="px-4 py-2">{request.payment_system}</td>
                            <td className="px-4 py-2">{request.account_number}</td>
                            <td className="px-4 py-2">{request.status}</td>
                            <td className="px-4 py-2">
                                {request.status !== 'Approved' && (
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                        onClick={() =>
                                            handlePaymentSuccess(
                                                request._id,
                                                request.withdrawal_amount,
                                                request.worker_email
                                            )
                                        }
                                    >
                                        Payment Success
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminHome;
