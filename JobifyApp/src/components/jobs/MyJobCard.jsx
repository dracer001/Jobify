import { Link } from "react-router-dom";

const getStatusClass = (status) => {
  switch (status) {
    case 'in_progress':
      return 'text-blue-500'; // Blue color
    case 'completed':
      return 'text-green-500'; // Green color
    case 'pending':
      return 'text-yellow-500'; // Yellow color
    case 'cancelled':
      return 'text-red-500'; // Red color
    default:
      return 'text-gray-500'; // Default gray
  }
};

export default function MyJobCard({
    job,
    bg="bg-white"
}) {
  return (
    <div className={`min-w-[280px] ${bg} p-6 rounded-lg shadow-lg transition-transform relative`}>
    <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>

    {/* Job Status with dynamic color */}
    <p className={`text-sm font-semibold mb-2 ${getStatusClass(job.status)}`}>Status: {job.status}</p>

    <p className="text-lg font-bold text-blue-800">$ {job.salary}</p>

    {/* Job Description */}
    <div className="mt-2 mb-4 text-gray-700 text-sm h-16 overflow-hidden">
      {job.description}
    </div>

    {/* View Details Link with proper positioning */}
    <Link
      to={`/job/${job.id}`}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-500 font-semibold hover:text-blue-700 transition duration-300"
    >
      View Details
    </Link>
  </div>
  )
}
