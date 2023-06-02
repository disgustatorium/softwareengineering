import { Outlet, Link, useLocation } from "react-router-dom";
import FixedBottomNavigation from '../../components/FixedBottomNavigation';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export let userToken = '';

export default function Root() {
  const navigate = useNavigate();
  const token = document.cookie;
  userToken = token.replace("token=", ""); // Update the value of userToken

  useEffect(() => {
    const checkUserToken = () => {
      if (userToken === "") {
        navigate('/login');
      } else {
        console.log(userToken);
      }
    };

    checkUserToken();
  }, [userToken, navigate]);

  return (
    <>
      <Outlet />
      <FixedBottomNavigation />
    </>
  );
}
