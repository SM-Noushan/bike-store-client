import { Heading, Product } from "@/component/product/Product";
import React from "react";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Use the provided image URL for all products.
const defaultImage =
  "https://th.bing.com/th/id/OIP.06brl7ew-klxshEyTbXUPQHaHG?rs=1&pid=ImgDetMain";

// Define the product data array.
interface ProductData {
  _id: string;
  img: string;
  productName: string;
  price: string;
  color: string;
  badge: boolean;
  des: string;
}

const productData: ProductData[] = [
  {
    _id: "100001",
    img: defaultImage,
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "100002",
    img: defaultImage,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "100003",
    img: defaultImage,
    productName: "Cloth Basket",
    price: "80.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "100004",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "100005",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];

const FeaturedBikes: React.FC = () => {
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

  return (
    <div className="w-full py-16 container max-w-screen-2xl px-4 lg:px-12 mx-auto">
      <Heading heading="Hot Collections🔥" />
      <Slider {...settings}>
        {productData.map((product) => (
          <div className="px-2" key={product._id}>
            <Product {...product} />
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
