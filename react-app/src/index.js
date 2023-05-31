import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Root from "./routes/user/root";
import Tracking from "./routes/user/tracking/tracking";
import Landing from "./routes/landing";
import Dashboard from "./routes/user/dashboard";
import Goals from "./routes/user/goals";
import Groups from "./routes/user/groups";
import AppSettings from "./routes/user/appSettings";
import ErrorPage from './error-page';
import AddGoal from './routes/user/tracking/addGoal';
import AddExercise from './routes/user/tracking/addExercise';
import AddFood from './routes/user/tracking/addFood';
import AddWeight from './routes/user/tracking/addWeight';
import AddGroup from './routes/user/tracking/addGroup';
import Login from './routes/login';
import SignUp from './routes/signUp';
import UserSettings from './routes/user/userSettings';
import AddCustomFood from './routes/user/tracking/customFood';
import SignUpSuccess from './routes/signUpSuccess';
import LoginSuccess from './routes/loginSuccess';
import CustomFood from './routes/user/tracking/customFood';
import AddSuccess from './routes/user/tracking/addSuccess';
import JoinGroup from './routes/user/tracking/joinGroup';

const router = createBrowserRouter([
  { 
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />
  },
  {
    path: "/signUp",
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
  {
    path:"/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path:"/loginSuccess",
    element: <LoginSuccess />,
    errorElement: <ErrorPage />
  },
  {
    path: "/signUpSuccess",
    element: <SignUpSuccess />,
    errorElement: <ErrorPage />
  },
  {
    path: "/user",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/user/dashboard",
        element: <Dashboard />
      },
      {
        path: "/user/goals",
        element: <Goals />
      },
      {
        path: "/user/tracking",
        element: <Tracking />
      },
      {
        path: "/user/groups",
        element: <Groups />
      },
      {
        path: "/user/appSettings",
        element: <AppSettings />
      },
      {
        path: "/user/goals/addGoal",
        element: <AddGoal />
      },
      {
        path: "/user/tracking/addExercise",
        element: <AddExercise />
      },
      {
        path: "/user/tracking/addFood",
        element: <AddFood />
      },
      {
        path: "/user/tracking/addWeight",
        element: <AddWeight />
      },
      {
        path: "/user/tracking/addFood/customFood",
        element: <CustomFood />
      },
      {
        path: "/user/groups/addGroup",
        element: <AddGroup />
      },
      {
        path: "/user/dashboard/userSettings",
        element: <UserSettings />
      },
      {
        path: "/user/tracking/customFood",
        element: <AddCustomFood />
      },
      {
        path: "/user/addSuccess",
        element: <AddSuccess />
      },
      {
        path: "/user/groups/joinGroup",
        element: <JoinGroup />
      },
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <RouterProvider router={router} />
    </LocalizationProvider>
    
    {/* <App /> */}
  </React.StrictMode>
);
