import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Oops! You’re Lost!</h1>
        <p className="text-xl text-gray-700 mb-6">We couldn’t find the page you’re looking for. But don’t worry, you can go back to safety!</p>
        <Link
          to="/"
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Take Me Home 🏠
        </Link>
        <p className="text-gray-500 mt-4">Or you can sign in to continue.</p>
        <Link
          to="/auth/signin"
          className="text-lg text-blue-600 hover:underline mt-4 block"
        >
          Sign In
        </Link>
      </div>
    </div>
  )
}
