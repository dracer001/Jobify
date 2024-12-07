export default function LandingPage () {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Jobify</h1>
          <nav>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-200">
              Sign Up
            </button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-200">
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto flex flex-col lg:flex-row items-center px-4 py-16">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="text-4xl font-extrabold mb-4">
            Bridging the Gap Between Talent and Opportunity
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Jobify is your ultimate platform for connecting job seekers with
            employers in the digital world. Whether you're a skilled professional
            or a business seeking talent, we bring you together for mutual growth.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Focused on digital skills, Jobify helps individuals showcase their expertise
            and allows businesses to find the right people to bring their projects to life.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700">
            Join Now
          </button>
        </div>

        {/* Right Image/Illustration */}
        <div className="lg:w-1/2">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Connecting people illustration"
            className="rounded-md shadow-lg"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-700 py-4">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Jobify. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
