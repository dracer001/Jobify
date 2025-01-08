import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../helperFunctions';
import PhotoDisplay from '../../components/PhotoDisplay';

export default function JobTermination({
  jobData,
  handler,
  isOwner,
}) {

  const navigator = useNavigate();
  if(!isOwner) {
    return navigator('/401');
  }
  const [reason, setReason] = useState('');

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
            <span>{formatDate(jobData.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Person Handling the Job */}
      <div className="bg-white shadow-xl rounded-lg p-6 space-y-6 mt-8">
        <div className="text-lg font-semibold text-gray-800">Job Handler Profile</div>
        <div className="flex items-center space-x-6">
          <PhotoDisplay
              user={handler}
              size='h-20 w-20'
          />
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {handler.first_name || ""} {handler.last_name || ""} {handler.company_name || ""}
            </p>
            <p className="text-sm text-gray-600">{handler.title || ""}</p>
            <div className="mt-2 gap-4 flex">
              <Link
                to={`/user/view/${handler.id}`}
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
          to={`/job/${id}?action=view`} // Navigate to job details page
          className="px-6 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-300"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
