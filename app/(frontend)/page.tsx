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
import prismadb from "@/lib/prisma";

import Image from "next/image";

export default async function Home() {
  const sliders = await prismadb.sliders.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const categories = await prismadb.category.findMany({
    orderBy: {
      name: "desc",
      // name: "asc",
    },
  });

  const occassions = await prismadb.occassion.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const products = await prismadb.product.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      category: {
        include: {
          Pattern: true,
          Product: true,
          Type: true,
        },
      },
      color: true,
      description: true,
      images: true,
      occassion: true,
      pattern: true,
      type: true,
    },
  });

  const Patterns = await prismadb.pattern.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <div className="">
        <CarouselSlider sliders={sliders} />
        <div className="">
          {/* <TabSection /> */}
          <ShopByCategory categories={categories} />
          <ShopByOccassion occassion={occassions} products={products} />
          <NewArrivalSection products={products}/>
          <BestPriceSection />
          <Promise />
          {/* <FilterByColor /> */}

          <ShopByPattern Patterns={Patterns} />
          <Testimonials />
          <SocialMedia />
          {/* <Clientinsta />
          <Logoslider /> */}
        </div>
      </div>
    </>
  );
}
