import { FC, useState } from "react";
import { Product } from "@/component/product/Product";
import MyPagination from "./Pagination";

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
  {
    _id: "100006",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "100007",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "100008",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "100009",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1000010",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1000011",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1000012",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1000013",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1000014",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1000015",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1000016",
    img: defaultImage,
    productName: "Funny Toys for Babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];

interface BikeGalleryProps {
  itemsPerPage: number;
}

const BikeGallery: FC<BikeGalleryProps> = ({ itemsPerPage }) => {
  // Use static data from your constants.
  const items = productData;

  // Manage current page state.
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate offset and the current set of items.
  const itemOffset = (currentPage - 1) * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount: number = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-4 lg:gap-10">
        {currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item._id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
            />
          </div>
        ))}
      </div>
      {/* Pagination and Summary */}
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mt-6 gap-y-2">
        <span className="text-base font-normal text-neutral-500">
          Bikes from {itemOffset + 1} to {Math.min(endOffset, items.length)} of{" "}
          {items.length}
        </span>
        <div>
          <MyPagination
            currentPage={currentPage}
            totalPages={pageCount}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default BikeGallery;
