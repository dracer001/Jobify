import { Navigate, Outlet, useNavigate } from "react-router-dom";
import LogoIcon from "../components/core/LogoIcon";
import { useStateContext } from "../context/ContextProvider";
import { initializeAxiosInterceptors } from "../context/axios";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const { authToken, setAuthToken } = useStateContext();
  const navigate = useNavigate();
  
  // State to track whether the component is ready for rendering
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize interceptors for the current session
    if (authToken) {
      initializeAxiosInterceptors(authToken, setAuthToken, navigate);
    }
    // Once the component is ready (interceptors initialized), set the state
    setIsReady(true);
  }, [authToken, setAuthToken, navigate]);

  // If `isReady` is false, don't render anything yet (prevent redirect loop)
  if (!isReady) {
    return null;  // or a loading spinner, or just nothing until we're ready
  }

  // If `authToken` is present, redirect to /home
  if (authToken) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="bg-gray-100 flex flex-1 min-h-screen flex-col px-6 py-12 lg:px-8">
      <LogoIcon type="dark" className="w-32 h-auto mx-auto lg:mx-0" />
      <Outlet />
    </div>
  );
}
