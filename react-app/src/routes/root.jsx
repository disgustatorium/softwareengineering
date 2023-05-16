import { Outlet, Link, useLocation } from "react-router-dom";
import FixedBottomNavigation from '../components/FixedBottomNavigation'

export default function Root() {
  const location = useLocation();

  const shouldRenderNavigation = location.pathname !== "/landing";

  return (
    <>
      <Outlet />
      {shouldRenderNavigation && <FixedBottomNavigation />}
    </>
  );
}
