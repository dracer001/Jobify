import { useContext, useState, createContext } from "react";
import Cookies from 'js-cookie'
import useStateCookie from "../hooks/useStateCookie";
import { axiosClient } from "./axios";


const SECURE = import.meta.env.SECURE //importing secure config for http and https

// CONFIGURATION FOR AUTH COOKIE
const tokenCokies = Cookies.withAttributes({ secure: SECURE })

// Creating State Context Object
const StateContext = createContext();



// Context Provider Function for the App
export const ContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useStateCookie('AUTH_TOKEN', null);
  const [currentUser, setCurrentUser] = useState({});
  const [jobs, setJobs] = useState([]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const logout = () => {
    axiosClient.post("/auth/signout").then((res) => {
      setCurrentUser({});
      setAuthToken(null);
    });
  };
  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        authToken,
        setAuthToken,
        jobs,
        setJobs,
        capitalizeFirstLetter,
        logout
      }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
