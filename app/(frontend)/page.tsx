import BestPriceSection from "@/components/FRONTEND/BestPrice";
import CarouselSlider from "@/components/FRONTEND/Carousel";
import Clientinsta from "@/components/FRONTEND/ClientInsta";
import FilterByColor from "@/components/FRONTEND/FilterByColor";
import NewArrivalSection from "@/components/FRONTEND/NewArrival";

// import Logoslider from "@/components/FRONTEND/LogoSlider";
import Promise from "@/components/FRONTEND/Promise";
import ShopByCategory from "@/components/FRONTEND/ShopByCategory";
import ShopByOccassion from "@/components/FRONTEND/ShopByOccassion";
import ShopByPattern from "@/components/FRONTEND/ShopByPattern";
import SocialMedia from "@/components/FRONTEND/SocialMedia";
import Testimonials from "@/components/FRONTEND/Testimonial";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="">
        <CarouselSlider />
        <div className="">
          {/* <TabSection /> */}
          <ShopByCategory />
          <ShopByOccassion />
          <NewArrivalSection />
          <BestPriceSection />
          <Promise />
          {/* <FilterByColor /> */}

          <ShopByPattern />
          <Testimonials />
          <SocialMedia />
          {/* <Clientinsta />
          <Logoslider /> */}
        </div>
      </div>
    </>
  );
}
