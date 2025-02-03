import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/component/shared/breadcrumbs/Breadcrumbs";

const AboutUs: React.FC = () => {
  const textClasses = "max-w-[600px] text-base font-light text-justify";
  return (
    <div className="main-wrapper">
      <Breadcrumbs
        title="About"
        prevLocation="Home"
        currentLocation="About us"
      />
      <div className="pb-10 space-y-2 text-center sm:text-left">
        <h1 className={textClasses}>
          <span className="text-neutral-900 font-semibold text-lg">
            BikeStore
          </span>{" "}
          is a premier destination for cycling enthusiasts and casual riders
          alike. We pride ourselves on offering an extensive collection of
          high-quality bikes, accessories, and gear that suit every
          lifestyle—from rugged mountain bikes to sleek city commuters.
        </h1>
        <p className={textClasses}>
          At BikeStore, our mission is to empower your cycling journey with
          exceptional products and unparalleled customer service. Whether you
          are embarking on a new adventure, looking for the perfect upgrade, or
          seeking expert advice on bike maintenance, our team of professionals
          is here to help you every step of the way.
        </p>
        <p className={textClasses}>
          Our commitment to quality, innovation, and community has made
          BikeStore a trusted name among riders worldwide. We continuously
          update our inventory with the latest models, accessories, and
          performance-enhancing gear so that you always have access to the best
          that the world of cycling has to offer.
        </p>
        <Link to="/bikes" className="inline-block !mt-4">
          <Button className="w-52">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
