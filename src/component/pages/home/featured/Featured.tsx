import React from "react";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/component/product/Product";
import { Skeleton } from "@/components/ui/skeleton";
import SectionHeading from "@/component/shared/section/SectionHeading";
import { useGetAllProductQuery } from "@/app/features/product/productApi";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

const FeaturedBikes: React.FC = () => {
  const params = [
    { key: "sort", value: "-createdAt" },
    { key: "limit", value: "6" },
  ];
  const { data: bikes, isFetching } = useGetAllProductQuery(params);

  return (
    <div className="w-full py-16 container max-w-screen-2xl px-4 lg:px-12 mx-auto">
      <SectionHeading heading="Hot Collections🔥" />
      <Slider {...settings}>
        {isFetching
          ? Array.from({ length: 6 }).map((_, index) => (
              <div className="px-2" key={index}>
                <Skeleton className="h-52" />
              </div>
            ))
          : bikes?.data?.map((bike) => (
              <div className="px-2" key={bike._id}>
                <Product bike={bike} badge />
              </div>
            ))}
      </Slider>
      <div className="text-center">
        <Link to="/bikes" className="my-4 inline-block">
          <Button className="px-12">View All</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBikes;
