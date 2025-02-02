import Banner from "@/component/pages/home/banner/Banner";
import BannerBottom from "@/component/pages/home/banner/BannerBottom";
import FeaturedBikes from "@/component/pages/home/featured/Featured";
import Testimonials from "@/component/pages/home/testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <Banner />
      <BannerBottom />
      <FeaturedBikes />
      <Testimonials />
    </>
  );
};

export default Home;
