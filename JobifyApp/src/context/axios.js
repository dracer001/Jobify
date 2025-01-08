import axios from 'axios';

// Create Axios instance
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api', // API URL from .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to initialize interceptors and handle authToken
// const initializeAxiosInterceptors = (authToken, setAuthToken, navigate) => {
//   console.log("using token: ", authToken)
//   // Add Authorization Token to request headers
//   axiosClient.interceptors.request.use((config) => {
//     if (authToken) {
//       config.headers.Authorization = `Bearer ${authToken}`;
//     }
//     return config;
//   });


  
//   // Handle 401 Unauthorized error
//   axiosClient.interceptors.response.use(
//     response => response,
//     (error) => {
//       if (error.response && error.response.status === 401) {
//         setAuthToken(null); // Reset the token
//         navigate('/auth/signin'); // Redirect to Signin
//       }
//       return Promise.reject(error);
//     }
//   );
// };


const initializeAxiosInterceptors = (authToken, setAuthToken, navigate) => {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

  axiosClient.interceptors.response.use(
    response => response,
    error => {
      // Handle unauthorized error globally
      if (error.response && error.response.status === 401) {
        // Redirect to login page or clear token
        setAuthToken(null); // Remove token from state
        navigate("/auth/signin"); // Redirect to sign-in
      }
      return Promise.reject(error);
    }
  );
};


export { axiosClient, initializeAxiosInterceptors };
