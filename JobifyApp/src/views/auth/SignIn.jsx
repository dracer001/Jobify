import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { useState } from "react";
import Loader from "../../components/core/Loader";
import { axiosClient, initializeAxiosInterceptors } from "../../context/axios";
import Notification from "../../components/core/Notification";
import useNotification from "../../hooks/useNotification";

export default function SignIn() {

  const navigate = useNavigate();
  const { authToken, setAuthToken } = useStateContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const { message, type, isVisible, showError } = useNotification();

  const onSubmit = (ev) => {
    ev.preventDefault();
    showError(null);
    setLoading(true);
    
    axiosClient
      .post("/auth/signin", {
        email,
        password,
        remember_me: remember
      })
      .then(({ data }) => {
        setLoading(false);
        if (data.error) {
          showError(data.error);
        } else {
          // Directly use the data.token without waiting for setAuthToken state update
          setAuthToken(data.token);
          console.log("New authToken:", data.token); // This will now log the correct token
          
          // Initialize interceptors with the newly received token
          initializeAxiosInterceptors(data.token, setAuthToken, navigate);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data.errors) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          showError(finalErrors.join("<br>"));
        } else if (error.response) {
          showError(error.response.data.error);
        }
        console.error(error);
      });
  };
  


  return (
    <>
      {loading && <Loader />}
      {isVisible && (
        <Notification message={message} type={type} />
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-800">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <div className="flex gap-3 mt-2">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    onChange={(e) => setRemember(e.target.checked)}
                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 indeterminate:border-indigo-600 indeterminate:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                  />
                  <svg
                    fill="none"
                    viewBox="0 0 14 14"
                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-[:checked]:opacity-100"
                    />
                    <path
                      d="M3 7H11"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm/6">
                <label htmlFor="remember" className="font-medium text-gray-900">
                  remember me
                </label>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <p className="mt-10 text-center text-sm/6 text-gray-500">
        don't have account?{' '}
        <a href="/auth/signup" className="font-semibold text-blue-600 hover:text-blue-700">
          sign up
        </a>
      </p>
    </>
  )
}
