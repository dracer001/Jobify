import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../../helperFunctions';

export default function JobTermination() {
  const [reason, setReason] = useState('');
  const jobData = {
    title: "Software Developer",
    description:
      "This is a software development position where you will be working with a dynamic team to build high-quality products and applications. You'll work on both backend and frontend tasks.",
    createdDate: "2023-01-10",
    expectedEndDate: "2023-06-30",
    salary: "$75,000",
    category: "Housing Insurance",
    jobStatus: "completed",
    user: {
      firstName: "John",
      lastName: "Doe",
      image: "https://via.placeholder.com/150",
      title: "Software Engineer",
      profileLink: "/profile/johndoe",
    },
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Termination request submitted with reason:', reason);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md md:px-16 md:py-12 max-w-4xl">
      {/* Job Information */}
      <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
        <div className="text-lg font-semibold text-gray-800">Job Information</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{jobData.title}</h2>
          <p className="text-gray-600">{jobData.description}</p>
          <div className="mt-4">
            <span className="font-semibold text-gray-800">Category: </span>
            <span>{jobData.category}</span>
          </div>
          <div className="mt-2">
            <span className="font-semibold text-gray-800">Created On: </span>
            <span>{formatDate(jobData.createdDate)}</span>
          </div>
          <div className="mt-2">
            <span className="font-semibold text-gray-800">Expected End Date: </span>
            <span>{formatDate(jobData.expectedEndDate)}</span>
          </div>
        </div>
      </div>

      {/* Person Handling the Job */}
      <div className="bg-white shadow-xl rounded-lg p-6 space-y-6 mt-8">
        <div className="text-lg font-semibold text-gray-800">Person Handling the Job</div>
        <div className="flex items-center space-x-6">
          <img
            src={jobData.user.image}
            alt={`${jobData.user.firstName} ${jobData.user.lastName}`}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {jobData.user.firstName} {jobData.user.lastName}
            </p>
            <p className="text-sm text-gray-600">{jobData.user.title}</p>
            <div className="mt-2 gap-4 flex">
              <Link
                to={jobData.user.profileLink}
                className="text-blue-600 hover:text-blue-800 block text-sm"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reason for Requesting Termination */}
      <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
        <div className="text-lg font-semibold text-gray-800 mb-4">Reason for Requesting Termination</div>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="Please provide the reason for your termination request."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows="6"
        />
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-500 transition-colors duration-300"
        >
          Submit
        </button>
        <Link
          to="/job/details" // Navigate to job details page
          className="px-6 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-300"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
