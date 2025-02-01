import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Navbar2 from "./Navbar2";
const MainLayout = () => {
  return (
    <div className="min-h-screen font-Outfit">
      <Navbar />
      <Navbar2 />
      <Outlet />
    </div>
  );
};

export default MainLayout;
