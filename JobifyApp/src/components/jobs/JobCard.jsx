// 

import { useState } from "react";
import { Link } from "react-router-dom";




export default function JobCard({ job, bg="bg-white" }) {

  const [expandedJobId, setExpandedJobId] = useState(null);
  const toggleDescription = (id) => {
    setExpandedJobId(id === expandedJobId ? null : id);
  };
  return (
    <div key={job.id} className={`${bg} p-6 rounded-lg shadow-lg transition-transform relative`}>
      <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
      <Link to={`/user/view/${job.employer_id}`} className="text-sm text-gray-500 mb-2 overflow-hidden">{job.employer_name}</Link>
      <p className="text-lg font-bold text-blue-800">$ {job.salary}</p>
      {/* Job Description */}
      <div className="relative">
        <p className={`text-gray-700 ${expandedJobId === job.id ? '' : 'truncate'}`}>
          {job.description}
        </p>
        {job.description.length > 100 && (
          <div className="mt-2">
            <button
              className="text-blue-500 text-sm"
              onClick={() => toggleDescription(job.id)}
            >
              {expandedJobId === job.id ? 'Read Less' : 'Read More'}
            </button>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Bid
        </button>
        <Link to={`/job/${job.id}`} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300">
          View
        </Link>
      </div>
    </div>
  )
}
