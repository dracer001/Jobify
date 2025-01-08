import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-200 via-red-300 to-red-400">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access!</h1>
        <p className="text-xl text-gray-700 mb-6">Oops, it seems like you don't have permission to view this page. But don't worry, you can go back to safety!</p>
        <Link
          to="/"
          className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Take Me Home 🏠
        </Link>
        <p className="text-gray-500 mt-4">Or you can sign in to continue.</p>
        <Link
          to="/auth/signin"
          className="text-lg text-red-600 hover:underline mt-4 block"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
