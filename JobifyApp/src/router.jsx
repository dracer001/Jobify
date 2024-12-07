import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "./views/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <LandingPage />,
  },
//   {
//     path: "/",
//     element: <GuestLayout />,
//     children: [
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/signup",
//         element: <Signup />,
//       },
//     ],
//   },
]);

export default router;
