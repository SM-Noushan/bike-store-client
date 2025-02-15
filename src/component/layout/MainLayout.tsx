import { Outlet } from "react-router-dom";
import TopNavbar from "../shared/navbar/TopNavbar";
import BottomNavbar from "../shared/navbar/BottomNavbar";

// Import react-slick CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FixedIcons from "../shared/fixedSection/FixedIcons";
import Footer from "../shared/footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen font-Outfit">
      <TopNavbar />
      <BottomNavbar />
      <Outlet />
      <FixedIcons />
      <Footer />
    </div>
  );
};

export default MainLayout;
