"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import Swimwear from "@/public/assets/images/collection/swimwear.png";
import top from "@/public/assets/images/collection/top.png";
// import Swimwear from "@/public/assets/images/collection/swimwear.png";

const data = {
	slides: [
		{
			href: "shop-breadcrumb1.html",
			imgSrc: "/assets/images/sarri/Sarees.jpg",
			altText: "swimwear",
			collectionName: "Sarees",
			heading: "Sarees",
		},
		{
			href: "shop-breadcrumb1.html",
			imgSrc: "/assets/images/sarri/kurta.jpg",
			altText: "top",
			collectionName: "top",
			heading: "Kurta",
		},
		{
			href: "shop-breadcrumb1.html",
			imgSrc: "/assets/images/sarri/kurta-sets.jpg",
			altText: "sets",
			collectionName: "sets",
			heading: "Kurta Sets",
		},
		{
			href: "shop-breadcrumb1.html",
			imgSrc: "/assets/images/sarri/gift.jpg",
			altText: "outerwear",
			collectionName: "outerwear",
			heading: "Gifts",
		},
	],
};

export default function CollectionBlack() {
	return (
		<div className="collection-block md:pt-20 pt-10 mb-8">
			<div className="container px-8">
				<div className="heading3">Shop By Category</div>
			</div>
			<div className="list-collection relative section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4 ">
				{/* <div className="swiper-button-prev lg:left-10 left-6" /> */}
				<Swiper
					slidesPerView={4}
					spaceBetween={30}
					loop={true}
					pagination={{
						dynamicBullets: true,
						clickable: true,
					}}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
					}}
					modules={[Autoplay]}
					className="w-full h-full p-8"
				>
					{data.slides.map((slide, index) => (
						<SwiperSlide className="h-full" key={index}>
							<div
								className="hover:scale-110 z-50 duration-700 group"
								key={index}
							>
								<div
									className="rounded-full w-5 h-5 top-1 left-1 relative"
									style={{ backgroundColor: "#C2915E" }}
								></div>
								<div className=" rounded-tl-[100px] rounded-br-2xl  h-72 relative -top-5">
									<img
										src={slide.imgSrc}
										alt={slide.altText}
										className="w-full h-full overflow-hidden object-cover  rounded-tl-[100px] rounded-br-2xl"
									/>

									{/* <Image src={slide.imgSrc} alt={slide.altText} fill/> */}
								</div>
								<div className=" group-hover:scale-110 duration-700 text-[20px]">
									{slide.heading}
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* <div className="swiper-button-next lg:right-10 right-6" /> */}
			</div>
		</div>
	);
}
