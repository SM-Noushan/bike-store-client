import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import banner1 from "../../../../assets/banner/banner1.jpg";
import banner2 from "../../../../assets/banner/banner2.png";
import banner3 from "../../../../assets/banner/banner3.png";
import banner4 from "../../../../assets/banner/banner4.png";
import banner5 from "../../../../assets/banner/banner5.png";
import banner6 from "../../../../assets/banner/banner6.png";

interface ImageProps {
  imgSrc: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ imgSrc, className = "" }) => {
  return <img className={className} src={imgSrc} alt="Banner" />;
};

const Banner: React.FC = () => {
  const [dotActive, setDotActive] = useState<number>(0);

  const settings: Settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => setDotActive(next),
    appendDots: (dots: React.ReactNode) => (
      <div className="relative">
        <ul className="m-0 flex flex-col absolute translate-y-[-170%] md:translate-y-[-250%] lg:translate-y-[-300%] xl:translate-y-[-350%]">
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <span
        className={`w-[25px] md:w-[45px] block cursor-pointer text-sm md:text-base ${
          i === dotActive
            ? "text-white border-r-[3px] border-r-[#262626]"
            : "text-transparent border-r-[3px] border-r-white"
        }`}
      >
        0{i + 1}
      </span>
    ),
  };

  return (
    <div className="w-full bg-white relative">
      <Slider {...settings}>
        {/* {Array.from({ length: 3 }).map((_, i) => ( */}
        {[banner1, banner2, banner3, banner4, banner5, banner6].map(
          (banner, idx) => (
            <Link to="/bikes" key={idx}>
              <div className="">
                <Image
                  className="object-cover w-full h-56 md:h-[calc(100dvh-400px)] lg:h-[calc(100dvh-260px)]"
                  imgSrc={banner}
                />
              </div>
            </Link>
          )
        )}
      </Slider>
    </div>
  );
};

export default Banner;
