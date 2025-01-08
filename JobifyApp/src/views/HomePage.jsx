import { useCallback, useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import Loader from "../components/core/Loader";
import JobCard from "../components/jobs/JobCard";
import Notification from "../components/core/Notification";
import useNotification from "../hooks/useNotification";
import { Link } from "react-router-dom";
import { CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import RecentActivity from "../components/RecentActivity";
import { isEmpty, timeAgo } from "../helperFunctions";
import { axiosClient } from "../context/axios";
import MyJobCard from "../components/jobs/MyJobCard";
import UserCard from "../components/UserCard";




const gradientColors = [
  'bg-gradient-to-r from-blue-100 to-sky-100', // Blue to Sky Blue
  'bg-gradient-to-r from-blue-100 to-blue-100', // Blue to Light Blue
  'bg-gradient-to-r from-blue-100 to-teal-100', // Blue to Teal
  'bg-gradient-to-r from-blue-100 to-green-100', // Blue to Light Green
  'bg-gradient-to-r from-blue-100 to-purple-100', // Blue to Purple
  'bg-gradient-to-r from-blue-100 to-indigo-100', // Blue to Light Purple
  'bg-gradient-to-r from-blue-100 to-gray-100', // Blue to Light Gray
  'bg-gradient-to-r from-blue-100 to-pink-100', // Blue to Light Pink
  'bg-gradient-to-r from-blue-100 to-yellow-100', // Blue to Pale Yellow
  'bg-gradient-to-r from-blue-100 to-white', // Blue to Soft White
];

export default function HomePage() {
  const { currentUser } = useStateContext();

  const [loading, setLoading] = useState(true);
  const { message, type, isVisible, showError } = useNotification();

  const [userActivities, setUserActivities] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [topIndividual, setTopIndividual] = useState([]);
  const [topCompany, setTopCompany] = useState([]);

  const [userRecomendedJobs, setUserRecomendedJobs] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [jobLoading, setJobLoading] = useState(false); // Loading state
  const [noMoreJobs, setNoMoreJobs] = useState(false); // No more jobs flag


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Set loading to true when starting the API calls
      try {
        const activityResponse = await axiosClient.get(`/user/activities/5`);
        setUserActivities(activityResponse.data.data);
        const userJobResponse = await axiosClient.get(`/work`);
        setUserJobs(userJobResponse.data.data);
        const topUserResponse = await axiosClient.get(`/user/top_users/10`);
        setTopIndividual(topUserResponse.data.individual);
        setTopCompany(topUserResponse.data.company);
      } catch (error) {
        console.error('An error occurred:', error);
        // Handle other errors, like network errors or 5xx status codes.
        showError("Error fetching information ");
      } finally {
        setLoading(false);  // Always set loading to false when done
      }
    };
    if (!isEmpty(currentUser)) {
      fetchData();  // Call the async function
      fetchJobs(); // Initial fetch
    }
  }, [currentUser]);

  // Fetch jobs from the backend
  const fetchJobs = useCallback(async () => {
    if (jobLoading || noMoreJobs) return;

    setJobLoading(true);

    try {
      const response = await axiosClient.get(`/work/recommend?page=${page}`);
      const data = response.data;

      if (data.data.length > 0) {
        setUserRecomendedJobs((prevJobs) => {
          const existingJobIds = new Set(prevJobs.map((job) => job.id));
          const newJobs = data.data.filter((job) => !existingJobIds.has(job.id));
          return [...prevJobs, ...newJobs];
        });
      }

      if (page >= data.meta.last_page) {
        setNoMoreJobs(true); // Mark as no more jobs
      } else {
        setPage((prevPage) => prevPage + 1); // Increment page
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setJobLoading(false);
    }
  }, [jobLoading, noMoreJobs, page]);

  const handleScroll = useCallback((e) => {
    const container = e.target;
    if (
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 200 &&
      !jobLoading &&
      !noMoreJobs
    ) {
      fetchJobs();
    }
  }, [fetchJobs, jobLoading, noMoreJobs]);

  useEffect(() => {
    const scrollableContainer = document.getElementById("scrollable-container"); // Adjust the ID or class to match your container
    scrollableContainer.addEventListener("scroll", handleScroll);

    return () => scrollableContainer.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);





  return (

    <>
      {isVisible && (
        <Notification message={message} type={type} />
      )}
      {
        loading ? (
          <Loader />
        ) : (
          <>
            {/* Mobile View */}
            <div className="md:hidden">

              <div className="p-4 space-y-6">

                <section>
                  <h2 className="overflow-x-auto mt-2 text-lg font-bold text-gray-800">Recent Activities</h2>
                  <div className="relative border-t border-blue-500">
                    {/* Scrollable section for mobile, fixed display for desktop */}
                    <div className="flex overflow-x-auto space-x-6 py-4 hide-scrollbar md:overflow-x-hidden md:flex md:space-x-4">
                      {userActivities.map((activity) => (
                        <RecentActivity
                          key={activity.id}
                          title={activity.details}
                          timestamp={timeAgo(activity.updated_at)}
                        />
                      ))}
                    </div>

                    {/* Dark transparent background and view more indicator */}
                    <Link
                      to="/activities"
                      className="absolute h-100 w-20 right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-transparent via-transparent to-black/60 text-white p-4 shadow-lg transition-opacity "
                    >
                      <ChevronRightIcon /> {/* Large arrow for a carousel-like effect */}
                    </Link>
                  </div>
                </section>

                <section className="border-b border-blue-600">
                  <h2 className=" text-lg font-bold text-gray-800">My Jobs</h2>
                  <div className="border-t border-blue-500">
                  </div>
                  <div className="container mx-auto py-6">
                    {/* Scrollable Job List */}
                    <div className="overflow-x-auto">
                      <div className="flex space-x-6">
                        {userJobs.map((job, index) => {
                          const gradientClass = gradientColors[index % gradientColors.length]
                          return (
                            <MyJobCard
                              key={job.id}
                              job={job}
                              // bg={gradientClass}
                            />
                          )
                        })}
                      </div>
                    </div>
                    <div className="text-center my-3">
                      <Link to="/job/my_jobs" className=" text-gray-500  text-sm font-extrabold">view all</Link>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className=" text-lg font-bold text-gray-800">Users that may intrest you</h2>
                  {/* <div className="border-t border-blue-500">
                  </div> */}
                  <div className="container mx-auto py-6">
                    {/* Scrollable User List */}
                    <div className="overflow-x-auto">
                      <div className="flex space-x-6">
                        {topIndividual.map((user) => (
                          <UserCard
                            key={user.id}
                            user={user}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className=" text-lg font-bold text-gray-800">Organizations that may intrest you</h2>
                  {/* <div className="border-t border-blue-500">
                  </div> */}
                  <div className="container mx-auto py-6">
                    {/* Scrollable User List */}
                    <div className="overflow-x-auto">
                      <div className="flex space-x-6">
                        {topCompany.map((user) => (
                          <UserCard
                            key={user.id}
                            user={user}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="overflow-x-auto mt-8 text-lg font-bold text-gray-800">Recommended Jobs</h2>
                  <div className="border-t border-blue-500">

                  </div>
                  <div className="container mx-auto py-6 " >
                    {/* Grid Layout for Job Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userRecomendedJobs.map((job, index) => {
                        const gradientClass = gradientColors[index % gradientColors.length]
                        return (
                          <JobCard key={job.id} job={job} bg={gradientClass} />
                        )
                      })}
                    </div>
                  </div>
                  {/* Loading Spinner */}
                  {jobLoading && (
                    <div className="text-center py-4">
                      <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full"></div>
                    </div>
                  )}

                  {/* No More Jobs */}
                  {noMoreJobs && (
                    <div className="text-center py-4 text-gray-500">
                      <p>opps! no more recommendation.</p>
                    </div>
                  )}
                </section>


              </div>
            </div>
          </>
        )}
    </>
  );
};

