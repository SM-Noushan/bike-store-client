// import Pagination from "../../components/pageProps/shopPage/Pagination";
// import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
// import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

import SideFilter from "@/component/pages/bikes/SideFilters";
import Breadcrumbs from "@/component/shared/breadcrumbs/Breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

const Bikes = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="main-wrapper">
      <Breadcrumbs title="Bikes" currentLocation="Bikes" prevLocation="Home" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="hidden md:inline-flex w-[25%] h-full">
          <SideFilter />
        </div>
        {/* Mobile Drawer: Visible on mobile */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className="fixed bottom-4 right-4 md:hidden z-10">
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <SideFilter />
          </DrawerContent>
        </Drawer>
        <div className="w-full md:w-[80%] lg:w-[75%] h-full flex flex-col gap-10">
          products
          {/* <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination itemsPerPage={itemsPerPage} /> */}
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Bikes;
