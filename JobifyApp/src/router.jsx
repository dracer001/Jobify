import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import SignUp from "./views/auth/SignUp";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./views/auth/SignIn";
import HomePage from "./views/HomePage";
import AppLayout from "./layout/AppLayout";
import ProfilePage from "./views/user/ProfilePage";
import CreateJobs from "./views/jobs/CreateJobs";
import NotFoundPage from "./views/error/404";
import JobPayment from "./views/jobs/JobPayment";
import UserJobs from "./views/jobs/UserJobs";
import JobDetails from "./views/jobs/JobDetails";
import JobTermination from "./views/jobs/JobTermination";
import UserProfile from "./views/user/UserProfile";
import JobExplorer from "./views/jobs/JobExplorer";
import UserSettings from "./views/user/UserSettings";
import NotificationPage from "./views/user/NotificationPage";
import ActivityPage from "./views/user/ActivityPage";
import BillingForm from "./views/user/BillingForm";
import ChangePassword from "./views/user/ChangePassword";
import MetricsPage from "./views/user/MetricsPage";
import Transaction from "./views/user/Transaction";
import TransactionDetail from "./views/user/TransationDetail";
import ChatHome from "./views/user/ChatPage";
import ChatHomePage from "./views/user/ChatHomePage";
import ChatPage from "./views/user/ChatPage";
import SelectSearch from "./components/form/SelectSearch";
import UnauthorizedPage from "./views/error/401";
import ForbiddenPage from "./views/error/403";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/combo",
    element: <SelectSearch />,
  },
  {
    path: "/", // Fixed typo from 'paht' to 'path'
    element: <AppLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "user/profile",
        element: <ProfilePage />,
      },
      {
        path: "user/view/:id",
        element: <UserProfile />,
      },
      {
        path: "user/settings",
        element: <UserSettings />,
      },
      {
        path: "user/notifications",
        element: <NotificationPage />,
      },
      {
        path: "user/activities",
        element: <ActivityPage />,
      },
      {
        path: "user/billing",
        element: <BillingForm />,
      },
      {
        path: "user/change-password",
        element: <ChangePassword />,
      },
      {
        path: "user/metrics",
        element: <MetricsPage />,
      },
      {
        path: "user/transactions",
        element: <Transaction />,
      },
      {
        path: "user/transaction/:id",
        element: <TransactionDetail />,
      },
      {
        path: "user/chat",
        element: <ChatHomePage />,
      },
      {
        path: "user/chat/:id",
        element: <ChatPage />,
      },
      {
        path: "job/create",
        element: <CreateJobs />,
      },
      {
        path: "job/my_jobs",
        element: <UserJobs />,
      },
      {
        path: "job/:jobId",
        element: <JobDetails />,
      },
      {
        path: "job/explore",
        element: <JobExplorer />,
      },
      {
        path: "job/payment",
        element: <JobPayment />,
      },
      {
        path: "job/termination",
        element: <JobTermination />,
      },

    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/401" ,
    element: <UnauthorizedPage />
  },
  {
    path: "/403" ,
    element: <ForbiddenPage />
  },
  {
    path: "/404" ,
    element: <NotFoundPage />
  },
  {
    path: "*" ,
    element: <NotFoundPage />
  }
]);

export default router;

