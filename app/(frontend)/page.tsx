import CarouselSlider from "@/components/FRONTEND/Carousel";
import Clientinsta from "@/components/FRONTEND/ClientInsta";
import FilterByColor from "@/components/FRONTEND/FilterByColor";

// import Logoslider from "@/components/FRONTEND/LogoSlider";
import Promise from "@/components/FRONTEND/Promise";
import ShopByCategory from "@/components/FRONTEND/ShopByCategory";
import ShopByOccassion from "@/components/FRONTEND/ShopByOccassion";
import ShopByPattern from "@/components/FRONTEND/ShopByPattern";
import Testimonials from "@/components/FRONTEND/Testimonial";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="">
        <CarouselSlider />
        <div className="px-24">
          {/* <TabSection /> */}
          <ShopByCategory />
          <ShopByOccassion />
          <Promise />
          <FilterByColor />

          <ShopByPattern />
          <Testimonials />
          {/* <Clientinsta />
          <Logoslider /> */}
        </div>
      </div>
    </>
  );
}
