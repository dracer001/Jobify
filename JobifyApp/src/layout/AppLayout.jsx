import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import LogoIcon from "../components/core/LogoIcon";
import { useStateContext } from "../context/ContextProvider";
import { HomeIcon, BriefcaseIcon, BookmarkIcon, PlusIcon, UserIcon, BellIcon, MagnifyingGlassIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { axiosClient, initializeAxiosInterceptors } from "../context/axios";
import { useEffect } from "react";


export default function AppLayout() {

  const { authToken, setAuthToken, setCurrentUser, currentUser, setJobs, jobs } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize interceptors for the current session
    initializeAxiosInterceptors(authToken, setAuthToken, navigate);
  }, [authToken, setAuthToken, navigate]);


  useEffect(() => {
    if (!authToken) {
      navigate('/auth/signin'); // Redirect if no token is available
      return;
    }
    axiosClient.get('/user')
      .then(({ data }) => {
        setCurrentUser(data.data);
      })
      .catch(err => console.error(err));
  }, [authToken, navigate]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const navigation = [
    { name: "Home", to: "/home", icon: <HomeIcon className="h-6 w-6" /> },
    { name: "My Jobs", to: "/job/my_jobs", icon: <BriefcaseIcon className="h-6 w-6" /> },
    { name: "Search Jobs", to: "/job/explore", icon: <MagnifyingGlassIcon className="h-6 w-6" /> },
    { name: "Create", to: "/job/create", icon: <PlusIcon className="h-6 w-6" /> },
    { name: "Chats", to: "/user/chat", icon: <ChatBubbleLeftRightIcon className="h-6 w-6" /> },
    { name: "Profile", to: "/user/settings", icon: <UserIcon className="h-6 w-6" /> },
  ];
  return (
    <div className="bg-gray-100 font-sans">

      {/* Mobile View */}
      <div className="md:hidden h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 bg-blue-600 text-white">
          <div className="flex items-center justify-between">
            <LogoIcon type="light" className="w-16 h-auto" />
            <BellIcon className="h-6 w-6" />
          </div>
        </header>

        {/* Main content - makes the content scrollable, and takes up the remaining space */}
        <main id="scrollable-container"  className="flex-1 overflow-y-auto mt-1 pb-16">
          <Outlet />
        </main>

        {/* Navbar - fixed to the bottom */}
        <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-white shadow p-3">
          {navigation.map((item) => {
            return (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  classNames(
                    isActive ? "text-blue-600" : "text-gray-500",
                    "h-6 w-6 flex items-center justify-center"
                  )
                }
              >
                {item.icon}
              </NavLink>
            );
          })}
        </nav>
      </div>


      {/* Desktop View */}
      <div className="hidden md:flex scroll-smooth max-h-full custom-scrollbar overflow-y-scroll">
        {/* Sidebar (fixed) */}
        <aside className="w-1/5 p-4 bg-gray-200 h-screen flex flex-col fixed top-0 left-0">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-400 rounded-full mb-4"></div>
            <p className="text-lg font-semibold">Hello {currentUser.last_name}</p>
          </div>

          <div className="flex-grow mt-3 flex flex-col space-y-4 mt-12 mx-auto">
            <p className="text-lg font-bold text-gray-700">Your Job Stats</p>
            <p className="text-gray-700 font-semibold">Pending Jobs: <span>0</span></p>
            <p className="text-gray-700 font-semibold">Completed Jobs: <span>0</span></p>
            <p className="text-gray-700 font-semibold">Job Offers: <span>0</span></p>
          </div>

          <ul className="mt-6 space-y-4">
            <li className="text-gray-700">Profile</li>
            <li className="text-gray-700">Settings</li>
            <li className="text-red-600">Logout</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-4/5 ml-[20%]"> {/* Adding ml-[20%] to shift the main content */}
          <header className="flex items-center justify-between bg-blue-600 p-4 shadow-md mb-6">
            <LogoIcon type="light" className="w-20 h-auto" />
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
              <BellIcon className="h-6 w-6 text-white hover:text-blue-200" />
            </div>
          </header>

          <div className="main p-6">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  )
}
