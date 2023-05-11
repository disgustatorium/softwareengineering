import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Root from "./routes/root";
import Tracking from "./routes/tracking";
import Landing from "./routes/landing";
import Dashboard from "./routes/dashboard";
import Goals from "./routes/goals";
import Groups from "./routes/groups";
import AppSettings from "./routes/appSettings";
import ErrorPage from './error-page';
import AddGoal from './routes/addGoal';
import AddGroup from './routes/addGroup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/landing",
        element: <Landing />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/goals",
        element: <Goals />
      },
      {
        path: "/tracking",
        element: <Tracking />
      },
      {
        path: "/groups",
        element: <Groups />
      },
      {
        path: "/appSettings",
        element: <AppSettings />
      },
      {
        path: "/goals/addGoal",
        element: <AddGoal />
      },
      {
        path:"/groups/addGroup",
        element: <AddGroup />
      }
    ],
  },
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
