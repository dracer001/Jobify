import { Link } from 'react-router-dom';

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-200 via-red-300 to-red-400">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Forbidden Access!</h1>
        <p className="text-xl text-gray-700 mb-6">You do not have permission to view this page. Please check your credentials or contact support if you think this is a mistake.</p>
        <Link
          to="/"
          className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Go Back Home 🏠
        </Link>
        <p className="text-gray-500 mt-4">Or, you can <Link to="/contact" className="text-lg text-red-600 hover:underline">contact support</Link> for assistance.</p>
      </div>
    </div>
  );
}
