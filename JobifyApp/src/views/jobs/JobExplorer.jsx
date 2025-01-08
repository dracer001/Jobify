import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function JobExplorer() {
  // State to toggle job descriptions independently
  const [expandedJobIds, setExpandedJobIds] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState({ recent: [], recommended: [] });

  const toggleDescription = (jobId) => {
    setExpandedJobIds((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };

  // Sample data for jobs (replace with actual API data or state)
  const recentJobs = [
    {
      id: 1,
      title: 'Software Developer',
      description:
        'We are looking for a skilled software developer to join our team. You will be responsible for writing clean, scalable code, and collaborating with other developers to design software solutions.',
      postedBy: 'John Doe',
      salary: '$90,000',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      description:
        'Join our front-end development team to create amazing user experiences with React.',
      postedBy: 'Jane Smith',
      salary: '$85,000',
    },
    {
      id: 3,
      title: 'Backend Developer',
      description:
        'Develop and maintain the server-side logic for our applications. Work with APIs and databases.',
      postedBy: 'Mark Johnson',
      salary: '$95,000',
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      description:
        'Design intuitive and beautiful interfaces for web and mobile applications.',
      postedBy: 'Alice Brown',
      salary: '$80,000',
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: 'React Developer',
      description: 'Build modern, scalable applications using React.js.',
      postedBy: 'David White',
      salary: '$92,000',
    },
    {
      id: 2,
      title: 'Node.js Developer',
      description: 'Work on building backend services with Node.js and Express.',
      postedBy: 'Sarah Green',
      salary: '$87,000',
    },
    {
      id: 3,
      title: 'Product Designer',
      description: 'Collaborate with teams to create user-centered designs.',
      postedBy: 'Liam Black',
      salary: '$75,000',
    },
    {
      id: 4,
      title: 'Python Developer',
      description: 'Develop scalable backend systems with Python.',
      postedBy: 'Sophia Blue',
      salary: '$88,000',
    },
  ];

  const jobCategories = [
    { id: 1, name: 'Web Development', color: 'bg-indigo-600' },
    { id: 2, name: 'Data Science', color: 'bg-green-600' },
    { id: 3, name: 'Design', color: 'bg-yellow-600' },
    { id: 4, name: 'Marketing', color: 'bg-red-600' },
    { id: 5, name: 'Sales', color: 'bg-purple-600' },
    { id: 6, name: 'Finance', color: 'bg-blue-600' },
  ];

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Search filter logic
  const filterJobs = (query) => {
    const lowerQuery = query.toLowerCase();
    const filteredRecentJobs = recentJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lowerQuery) ||
        job.description.toLowerCase().includes(lowerQuery)
    );
    const filteredRecommendedJobs = recommendedJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lowerQuery) ||
        job.description.toLowerCase().includes(lowerQuery)
    );
    setFilteredJobs({ recent: filteredRecentJobs, recommended: filteredRecommendedJobs });
  };

  // Apply debounced search
  const debouncedFilterJobs = debounce(filterJobs, 500);

  useEffect(() => {
    if (searchQuery) {
      debouncedFilterJobs(searchQuery);
    } else {
      // If search is cleared, show all jobs
      setFilteredJobs({ recent: recentJobs, recommended: recommendedJobs });
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Search Bar */}
      <div className="flex justify-center">
        <input
          type="search"
          placeholder="Search for jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg px-4 py-2 rounded-lg border border-gray-300 focus:outline-indigo-500 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Display search results if there's a query */}
      {searchQuery ? (
        <>
          {/* Display filtered Recent Jobs */}
          {filteredJobs.recent.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Search Results</h2>
              <div className="flex overflow-x-auto custom-scrollbar space-x-4 pb-4">
                {filteredJobs.recent.map((job) => (
                  <div
                    key={job.id}
                    className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl shadow-lg transition-all transform relative w-72 md:w-1/3 flex-shrink-0 cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">Posted by: {job.postedBy}</p>
                    <p className="text-lg font-bold text-blue-800">{job.salary}</p>

                    {/* Job Description with truncation */}
                    <div className="relative">
                      <p
                        className={`text-gray-700 ${expandedJobIds[job.id] ? '' : 'line-clamp-4'}`}
                        style={{
                          WebkitLineClamp: expandedJobIds[job.id] ? 'none' : '4',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {job.description}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4 mt-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Bid
                      </button>
                      <Link
                        to={`/job/${job.id}`}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-lg text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}

          {/* Display filtered Recommended Jobs */}
          {filteredJobs.recommended.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Recommended Jobs</h2>
              <div className="flex overflow-x-auto custom-scrollbar space-x-4 pb-4">
                {filteredJobs.recommended.map((job) => (
                  <div
                    key={job.id}
                    className="bg-gradient-to-r from-green-100 to-yellow-100 p-6 rounded-xl shadow-lg transition-all transform relative w-72 md:w-1/3 flex-shrink-0 cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">Posted by: {job.postedBy}</p>
                    <p className="text-lg font-bold text-blue-800">{job.salary}</p>

                    {/* Job Description */}
                    <div className="relative">
                      <p
                        className={`text-gray-700 ${expandedJobIds[job.id] ? '' : 'line-clamp-4'}`}
                        style={{
                          WebkitLineClamp: expandedJobIds[job.id] ? 'none' : '4',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {job.description}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4 mt-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Bid
                      </button>
                      <Link
                        to={`/job/${job.id}`}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        // Default view without search
        <>
          {/* Recent Jobs Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Recent Jobs</h2>
            <div className="flex overflow-x-auto custom-scrollbar space-x-4 pb-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl shadow-lg transition-all transform relative w-72 md:w-1/3 flex-shrink-0 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">Posted by: {job.postedBy}</p>
                  <p className="text-lg font-bold text-blue-800">{job.salary}</p>

                  {/* Job Description with truncation */}
                  <div className="relative">
                    <p
                      className={`text-gray-700 ${expandedJobIds[job.id] ? '' : 'line-clamp-4'}`}
                      style={{
                        WebkitLineClamp: expandedJobIds[job.id] ? 'none' : '4',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {job.description}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-4 mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                      Bid
                    </button>
                    <Link
                      to={`/job/${job.id}`}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Jobs Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Recommended Jobs</h2>
            <div className="flex overflow-x-auto custom-scrollbar space-x-4 pb-4">
              {recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-gradient-to-r from-green-100 to-yellow-100 p-6 rounded-xl shadow-lg transition-all transform relative w-72 md:w-1/3 flex-shrink-0 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">Posted by: {job.postedBy}</p>
                  <p className="text-lg font-bold text-blue-800">{job.salary}</p>

                  {/* Job Description */}
                  <div className="relative">
                    <p
                      className={`text-gray-700 ${expandedJobIds[job.id] ? '' : 'line-clamp-4'}`}
                      style={{
                        WebkitLineClamp: expandedJobIds[job.id] ? 'none' : '4',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {job.description}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-4 mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                      Bid
                    </button>
                    <Link
                      to={`/job/${job.id}`}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

       {/* Job Categories Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Job Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobCategories.map((category) => (
            <Link
              key={category.id}
              to={`/jobs/category/${category.name.toLowerCase()}`}
              className={`flex justify-center items-center bg-white rounded-xl shadow-xl p-6 cursor-pointer transform hover:scale-105 transition duration-300 ${category.color}`}
            >
              <span className="text-white font-semibold text-lg">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
        </>
      )}
    </div>
  );
}


// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function JobExplorer() {
//   // State to toggle job descriptions independently
//   const [expandedJobIds, setExpandedJobIds] = useState({});

//   const toggleDescription = (jobId) => {
//     setExpandedJobIds(prevState => ({
//       ...prevState,
//       [jobId]: !prevState[jobId]
//     }));
//   };

//   // Sample data for jobs (replace with actual API data or state)
//   const recentJobs = [
//     {
//       id: 1,
//       title: 'Software Developer',
//       description: 'We are looking for a skilled software developer to join our team. You will be responsible for writing clean, scalable code, and collaborating with other developers to design software solutions.',
//       postedBy: 'John Doe',
//       salary: '$90,000',
//     },
//     {
//       id: 2,
//       title: 'Frontend Developer',
//       description: 'Join our front-end development team to create amazing user experiences with React.',
//       postedBy: 'Jane Smith',
//       salary: '$85,000',
//     },
//     {
//       id: 3,
//       title: 'Backend Developer',
//       description: 'Develop and maintain the server-side logic for our applications. Work with APIs and databases.',
//       postedBy: 'Mark Johnson',
//       salary: '$95,000',
//     },
//     {
//       id: 4,
//       title: 'UI/UX Designer',
//       description: 'Design intuitive and beautiful interfaces for web and mobile applications.',
//       postedBy: 'Alice Brown',
//       salary: '$80,000',
//     },
//   ];

//   const recommendedJobs = [
//     {
//       id: 1,
//       title: 'React Developer',
//       description: 'Build modern, scalable applications using React.js.',
//       postedBy: 'David White',
//       salary: '$92,000',
//     },
//     {
//       id: 2,
//       title: 'Node.js Developer',
//       description: 'Work on building backend services with Node.js and Express.',
//       postedBy: 'Sarah Green',
//       salary: '$87,000',
//     },
//     {
//       id: 3,
//       title: 'Product Designer',
//       description: 'Collaborate with teams to create user-centered designs.',
//       postedBy: 'Liam Black',
//       salary: '$75,000',
//     },
//     {
//       id: 4,
//       title: 'Python Developer',
//       description: 'Develop scalable backend systems with Python.',
//       postedBy: 'Sophia Blue',
//       salary: '$88,000',
//     },
//   ];

//   const jobCategories = [
//     { id: 1, name: 'Web Development', color: 'bg-indigo-600' },
//     { id: 2, name: 'Data Science', color: 'bg-green-600' },
//     { id: 3, name: 'Design', color: 'bg-yellow-600' },
//     { id: 4, name: 'Marketing', color: 'bg-red-600' },
//     { id: 5, name: 'Sales', color: 'bg-purple-600' },
//     { id: 6, name: 'Finance', color: 'bg-blue-600' },
//   ];

//   return (
//     <div className="container mx-auto p-6 space-y-12">

//       {/* Search Bar */}
//       <div className="flex justify-center">
//         <input
//           type="search"
//           placeholder="Search for jobs..."
//           className="w-full max-w-lg px-4 py-2 rounded-lg border border-gray-300 focus:outline-indigo-500 focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* Recent Jobs Section */}
//       <div className="space-y-4">
//         <h2 className="text-2xl font-semibold text-gray-800">Recent Jobs</h2>
//         <div className="flex overflow-x-auto custom-scrollbar space-x-4 pb-4">
//           {recentJobs.map((job) => (
//             <div
//               key={job.id}
//               className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl shadow-lg transition-all transform relative w-72 md:w-1/3 flex-shrink-0 cursor-pointer"
//             >
//               <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
//               <p className="text-sm text-gray-500 mb-2">Posted by: {job.postedBy}</p>
//               <p className="text-lg font-bold text-blue-800">{job.salary}</p>

//               {/* Job Description with truncation */}
//               <div className="relative">
//                 <p
//                   className={`text-gray-700 ${expandedJobIds[job.id] ? '' : 'line-clamp-4'}`}
//                   style={{
//                     WebkitLineClamp: expandedJobIds[job.id] ? 'none' : '4', // To handle multi-line clamping if not using line-clamp directly
//                     display: '-webkit-box',
//                     WebkitBoxOrient: 'vertical',
//                     overflow: 'hidden',
//                   }}
//                 >
//                   {job.description}
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="flex space-x-4 mt-4">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
//                   Bid
//                 </button>
//                 <Link
//                   to={`/job/${job.id}`}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
//                 >
//                   View
//                 </Link>
//               </div>
//             </div>

//           ))}
//         </div>
//       </div>

//       {/* Recommended Jobs Section */}
//       <div className="space-y-4">
//         <h2 className="text-2xl font-semibold text-gray-800">Recommended Jobs</h2>
//         <div className="flex overflow-x-auto custom-scrollbar space-x-4 pb-4">
//           {recommendedJobs.map((job) => (
//             <div
//               key={job.id}
//               className="bg-gradient-to-r from-green-100 to-yellow-100 p-6 rounded-xl shadow-lg transition-all transform relative w-72 md:w-1/3 flex-shrink-0 cursor-pointer"
//             >
//               <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
//               <p className="text-sm text-gray-500 mb-2">Posted by: {job.postedBy}</p>
//               <p className="text-lg font-bold text-blue-800">{job.salary}</p>

//               {/* Job Description */}
//               <div className="relative">
//                 <p 
//                   className={`text-gray-700 ${expandedJobIds[job.id] ? '' : 'line-clamp-4'}`}
//                   style={{
//                     WebkitLineClamp: expandedJobIds[job.id] ? 'none' : '4', // To handle multi-line clamping if not using line-clamp directly
//                     display: '-webkit-box',
//                     WebkitBoxOrient: 'vertical',
//                     overflow: 'hidden',
//                   }}
//                 >
//                   {job.description}
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="flex space-x-4 mt-4">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
//                   Bid
//                 </button>
//                 <Link
//                   to={`/job/${job.id}`}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
//                 >
//                   View
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Job Categories Grid */}
//       <div className="space-y-4">
//         <h2 className="text-2xl font-semibold text-gray-800">Job Categories</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {jobCategories.map((category) => (
//             <Link
//               key={category.id}
//               to={`/jobs/category/${category.name.toLowerCase()}`}
//               className={`flex justify-center items-center bg-white rounded-xl shadow-xl p-6 cursor-pointer transform hover:scale-105 transition duration-300 ${category.color}`}
//             >
//               <span className="text-white font-semibold text-lg">{category.name}</span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
