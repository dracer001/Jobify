import React, { useState } from 'react';

// A function to generate a mock UUID (for demonstration purposes)
const generateTransactionId = () => {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => Math.floor(Math.random() * 16).toString(16));
}

export default function TransactionHistory() {
  const [transactions] = useState([
    {
      id: generateTransactionId(),
      type: 'Payment Made',
      amount: '$500',
      status: 'Completed',
      date: '2025-01-01 10:30 AM',
      direction: 'outgoing',
    },
    {
      id: generateTransactionId(),
      type: 'Payment Received',
      amount: '$200',
      status: 'Completed',
      date: '2025-01-02 03:15 PM',
      direction: 'incoming',
    },
    {
      id: generateTransactionId(),
      type: 'Payment Made',
      amount: '$300',
      status: 'Pending',
      date: '2025-01-03 01:00 PM',
      direction: 'outgoing',
    },
    {
      id: generateTransactionId(),
      type: 'Payment Received',
      amount: '$150',
      status: 'Canceled',
      date: '2025-01-04 09:00 AM',
      direction: 'incoming',
    },
    {
      id: generateTransactionId(),
      type: 'Payment Made',
      amount: '$450',
      status: 'Completed',
      date: '2025-01-05 05:30 PM',
      direction: 'outgoing',
    },
  ]);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Transaction History</h2>

      {/* Transaction List */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`p-4 rounded-lg shadow-sm ${transaction.status === 'Completed' ? 'bg-green-50' : transaction.status === 'Pending' ? 'bg-yellow-50' : 'bg-red-50'} flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0`}
          >
            <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto">
              {/* Transaction Details */}
              <div className="text-center sm:text-left w-full sm:w-3/5">
                <p className="text-sm font-medium text-gray-700">{transaction.type}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
                <p className="text-xs text-gray-400">Transaction ID: {transaction.id}</p>
              </div>

              {/* Transaction Amount */}
              <div className="text-center sm:text-right w-full sm:w-1/3">
                <p className="text-lg font-semibold text-gray-800">{transaction.amount}</p>
              </div>
            </div>

            {/* Transaction Status */}
            <div className={`mt-2 sm:mt-0 sm:px-4 sm:py-1 text-xs font-semibold rounded-full w-full sm:w-auto text-center ${transaction.status === 'Completed' ? 'bg-green-500 text-white' : transaction.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
              {transaction.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// import React, { useState } from 'react';

// // A function to generate a mock UUID (for demonstration purposes)
// const generateTransactionId = () => {
//   return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => Math.floor(Math.random() * 16).toString(16));
// }

// export default function Transaction() {
//   const [transactions] = useState([
//     {
//       id: generateTransactionId(),
//       type: 'Payment Made',
//       amount: '$500',
//       status: 'Completed',
//       date: '2025-01-01 10:30 AM',
//       direction: 'outgoing',
//     },
//     {
//       id: generateTransactionId(),
//       type: 'Payment Received',
//       amount: '$200',
//       status: 'Completed',
//       date: '2025-01-02 03:15 PM',
//       direction: 'incoming',
//     },
//     {
//       id: generateTransactionId(),
//       type: 'Payment Made',
//       amount: '$300',
//       status: 'Pending',
//       date: '2025-01-03 01:00 PM',
//       direction: 'outgoing',
//     },
//     {
//       id: generateTransactionId(),
//       type: 'Payment Received',
//       amount: '$150',
//       status: 'Canceled',
//       date: '2025-01-04 09:00 AM',
//       direction: 'incoming',
//     },
//     {
//       id: generateTransactionId(),
//       type: 'Payment Made',
//       amount: '$450',
//       status: 'Completed',
//       date: '2025-01-05 05:30 PM',
//       direction: 'outgoing',
//     },
//   ]);

//   return (
//     <div className="container mx-auto p-4 md:p-6 space-y-6">
//       <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Transaction History</h2>

//       {/* Transaction List */}
//       <div className="space-y-4">
//         {transactions.map((transaction) => (
//           <div
//             key={transaction.id}
//             className={`p-4 rounded-lg shadow-sm ${transaction.status === 'Completed' ? 'bg-green-50' : transaction.status === 'Pending' ? 'bg-yellow-50' : 'bg-red-50'} flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0`}
//           >
//             <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto">
//               {/* Transaction Details */}
//               <div className="text-center sm:text-left w-full sm:w-3/5">
//                 <p className="text-sm font-medium text-gray-700">{transaction.type}</p>
//                 <p className="text-sm text-gray-500">{transaction.date}</p>
//                 <p className="text-xs text-gray-400">Transaction ID: {transaction.id}</p>
//               </div>

//               {/* Transaction Amount */}
//               <div className="text-center sm:text-right w-full sm:w-1/3">
//                 <p className="text-lg font-semibold text-gray-800">{transaction.amount}</p>
//               </div>
//             </div>

//             {/* Transaction Status */}
//             <div className={`mt-2 sm:mt-0 sm:px-4 sm:py-1 text-xs font-semibold rounded-full w-full sm:w-auto text-center ${transaction.status === 'Completed' ? 'bg-green-500 text-white' : transaction.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
//               {transaction.status}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';

// // A function to generate a mock UUID (for demonstration purposes)
// const generateTransactionId = () => {
//   return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => Math.floor(Math.random() * 16).toString(16));
// }

// export default function TransactionHistory() {
//   const [transactions] = useState([
//     {
//       id: generateTransactionId(),
//       type: 'Payment Made',
//       amount: '$500',
//       status: 'Completed',
//       date: '2025-01-01 10:30 AM',
//       direction: 'outgoing',
//     },
//     {
//       id: generateTransactionId(),
//       type: 'Payment Received',
//       amount: '$200',
//       status: 'Completed',
//       date: '2025-01-02 03:15 PM',
//       direction: 'incoming',
//     },
//     {
//       id: generateTransactionId(),
//       type: 'Payment Made',
//       amount: '$300',
//       status: 'Pending',
//       date: '2025-01-03 01:00 PM',
//       direction: 'outgoing',
//     },
//     {
//       id: generateTransactionId(),
//       type: 'Payment Received',
//       amount: '$150',
//       status: 'Canceled',
//       date: '2025-01-04 09:00 AM',
//       direction: 'incoming',
//     },
//     {
//       id: generateTransactionId(),
//       type: 'Payment Made',
//       amount: '$450',
//       status: 'Completed',
//       date: '2025-01-05 05:30 PM',
//       direction: 'outgoing',
//     },
//   ]);

//   return (
//     <div className="container mx-auto p-4 md:p-6 space-y-6">
//       <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Transaction History</h2>

//       {/* Transaction List */}
//       <div className="space-y-4">
//         {transactions.map((transaction) => (
//           <div
//             key={transaction.id}
//             className={`p-4 rounded-lg shadow-sm ${transaction.status === 'Completed' ? 'bg-green-50' : transaction.status === 'Pending' ? 'bg-yellow-50' : 'bg-red-50'} flex items-center justify-between`}
//           >
//             <div className="flex space-x-4">
//               {/* Transaction Details */}
//               <div>
//                 <p className="text-sm font-medium text-gray-700">{transaction.type}</p>
//                 <p className="text-sm text-gray-500">{transaction.date}</p>
//                 <p className="text-xs text-gray-400">Transaction ID: {transaction.id}</p>
//               </div>
//               {/* Transaction Amount */}
//               <div>
//                 <p className="text-lg font-semibold text-gray-800">{transaction.amount}</p>
//               </div>
//             </div>

//             {/* Transaction Status */}
//             <div className={`px-4 py-1 text-xs font-semibold rounded-full ${transaction.status === 'Completed' ? 'bg-green-500 text-white' : transaction.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
//               {transaction.status}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

