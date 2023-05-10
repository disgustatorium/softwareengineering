import { Outlet, Link } from "react-router-dom";
import FixedBottomNavigation from '../components/FixedBottomNavigation'

export default function Root() {
    return (
      <>
        <Outlet/>
        <FixedBottomNavigation></FixedBottomNavigation>
      </>
    );
  }