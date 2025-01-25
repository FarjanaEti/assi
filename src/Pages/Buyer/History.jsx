import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const History = () => {
      const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            //console.log(res.data)
            return res.data;
        }
    })                         
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl text-center font-semibold mb-4">Payment History</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Coins Purchased</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
           {payments.map((payment, index) => (
            <tr key={payment.transactionId} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {payment.transactionId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(payment.date).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {payment.coinsPurchased}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${payment.price.toFixed(2)}
              </td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  );
};

export default History;