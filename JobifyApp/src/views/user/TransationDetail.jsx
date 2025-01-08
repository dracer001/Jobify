import React, { useState } from 'react';

// A function to generate a mock UUID (for demonstration purposes)
const generateTransactionId = () => {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => Math.floor(Math.random() * 16).toString(16));
};

export default function TransactionDetail() {
  const [transaction] = useState({
    id: generateTransactionId(),
    type: 'Payment Received',
    amount: '$200',
    status: 'Completed',
    date: '2025-01-02 03:15 PM',
    purpose: 'Freelance Web Design',
    direction: 'incoming',
    accountDetails: {
      creditedTo: 'John Doe (Client)',
      debitedFrom: 'Jane Smith (Web Designer)',
    },
    transactionId: generateTransactionId(),
    reference: 'REF1234567890',
    additionalInfo: 'Payment for completed web design work.',
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Transaction Details</h2>

      {/* Transaction Overview */}
      <div className="p-6 bg-white shadow rounded-lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-800">{transaction.type}</p>
            <p className={`text-xl font-bold ${transaction.status === 'Completed' ? 'text-green-600' : transaction.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
              {transaction.amount}
            </p>
          </div>
          <p className="text-sm text-gray-500">Date: {transaction.date}</p>
          <p className="text-sm text-gray-500">Transaction ID: {transaction.transactionId}</p>
          <p className="text-sm text-gray-500">Reference: {transaction.reference}</p>
        </div>
      </div>

      {/* Purpose */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800">Purpose</h3>
        <p className="text-sm text-gray-700">{transaction.purpose}</p>
      </div>

      {/* Account Details */}
      <div className="p-6 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800">Account Details</h3>
        {transaction.direction === 'incoming' ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Credited To: {transaction.accountDetails.creditedTo}</p>
            <p className="text-sm text-gray-500">Purpose: {transaction.additionalInfo}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Debited From: {transaction.accountDetails.debitedFrom}</p>
            <p className="text-sm text-gray-500">Purpose: {transaction.additionalInfo}</p>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
        <p className="text-sm text-gray-700">{transaction.additionalInfo}</p>
      </div>
    </div>
  );
}
