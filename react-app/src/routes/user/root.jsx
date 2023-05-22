import { Outlet, Link, useLocation } from "react-router-dom";
import FixedBottomNavigation from '../../components/FixedBottomNavigation'

export default function Root() {

  return (
    <>
      <Outlet />
      <FixedBottomNavigation />
    </>
  );
}
