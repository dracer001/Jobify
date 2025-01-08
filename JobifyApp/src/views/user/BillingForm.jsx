import React, { useState } from 'react';

export default function BillingForm() {
  // State for toggling edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // State for storing the billing information
  const [billingInfo, setBillingInfo] = useState({
    creditCard: {
      number: '**** **** **** 1234',
      expiry: '12/23',
      cvv: '***',
    },
    account: {
      accountNumber: '**** 1234',
      bankName: 'XYZ Bank',
      routingNumber: '**** 5678',
    },
  });

  // Handle form field change
  const handleChange = (e, section, field) => {
    setBillingInfo({
      ...billingInfo,
      [section]: {
        ...billingInfo[section],
        [field]: e.target.value,
      },
    });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save the changes (this would integrate with an API in a real app)
  const handleSave = () => {
    // Save logic (e.g., make API call)
    alert('Billing Information saved successfully');
    toggleEdit(); // Exit edit mode after saving
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Billing Information</h2>
        <button
          onClick={toggleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-sm md:text-base"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Credit Card Information Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm md:shadow-md">
        <h3 className="text-lg md:text-xl font-semibold text-gray-700">Credit Card Information</h3>
        <div className="mt-4 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="text-gray-600 w-full sm:w-auto">Card Number</label>
            <input
              type="text"
              value={billingInfo.creditCard.number}
              onChange={(e) => handleChange(e, 'creditCard', 'number')}
              disabled={!isEditing}
              className="w-full sm:w-3/4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="text-gray-600 w-full sm:w-auto">Expiry Date</label>
            <input
              type="text"
              value={billingInfo.creditCard.expiry}
              onChange={(e) => handleChange(e, 'creditCard', 'expiry')}
              disabled={!isEditing}
              className="w-full sm:w-3/4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="text-gray-600 w-full sm:w-auto">CVV</label>
            <input
              type="text"
              value={billingInfo.creditCard.cvv}
              onChange={(e) => handleChange(e, 'creditCard', 'cvv')}
              disabled={!isEditing}
              className="w-full sm:w-3/4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Account Information Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm md:shadow-md">
        <h3 className="text-lg md:text-xl font-semibold text-gray-700">Account Information</h3>
        <div className="mt-4 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="text-gray-600 w-full sm:w-auto">Account Number</label>
            <input
              type="text"
              value={billingInfo.account.accountNumber}
              onChange={(e) => handleChange(e, 'account', 'accountNumber')}
              disabled={!isEditing}
              className="w-full sm:w-3/4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="text-gray-600 w-full sm:w-auto">Bank Name</label>
            <input
              type="text"
              value={billingInfo.account.bankName}
              onChange={(e) => handleChange(e, 'account', 'bankName')}
              disabled={!isEditing}
              className="w-full sm:w-3/4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <label className="text-gray-600 w-full sm:w-auto">Routing Number</label>
            <input
              type="text"
              value={billingInfo.account.routingNumber}
              onChange={(e) => handleChange(e, 'account', 'routingNumber')}
              disabled={!isEditing}
              className="w-full sm:w-3/4 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-center md:justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto text-lg"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
