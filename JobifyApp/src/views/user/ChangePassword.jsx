import React, { useState } from 'react';

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isEditing, setIsEditing] = useState(true);
  const [error, setError] = useState('');
  
  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;

    // Simple validation to check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
      // Logic to handle password change (e.g., API call) can go here
      alert('Password changed successfully');
      setIsEditing(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Change Password</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-sm md:text-base"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Change Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm md:shadow-md">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">Password Information</h3>
          
          {/* Current Password */}
          <div className="mt-4 space-y-2">
            <label className="text-gray-600">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter current password"
            />
          </div>

          {/* New Password */}
          <div className="mt-4 space-y-2">
            <label className="text-gray-600">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm New Password */}
          <div className="mt-4 space-y-2">
            <label className="text-gray-600">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm new password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mt-2">
              <span>{error}</span>
            </div>
          )}

          {/* Save Button */}
          {isEditing && (
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
