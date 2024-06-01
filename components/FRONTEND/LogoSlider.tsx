// "use client";

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";

// const data = {
// 	slides: [
// 		{
// 			imgSrc: "assets/images/brand/1.png",
// 			altText: "1",
// 		},
// 		{
// 			imgSrc: "assets/images/brand/2.png",
// 			altText: "2",
// 		},
// 		{
// 			imgSrc: "assets/images/brand/3.png",
// 			altText: "3",
// 		},
// 		{
// 			imgSrc: "assets/images/brand/4.png",
// 			altText: "4",
// 		},
// 		{
// 			imgSrc: "assets/images/brand/5.png",
// 			altText: "5",
// 		},
// 		{
// 			imgSrc: "assets/images/brand/6.png",
// 			altText: "6",
// 		},
// 		{
// 			imgSrc: "assets/images/brand/7.png",
// 			altText: "7",
// 		},
// 	],
// };

// const Logoslider = () => {
// 	return (
// 		<div>
// 			<div className="brand-block md:py-[60px] py-[32px]">
// 				<div className="container">
// 					<div className="list-brand">
// 						<div className="swiper swiper-list-brand">
// 							<div className="swiper-wrapper">
// 								<Swiper
// 									slidesPerView={6}
// 									spaceBetween={30}
// 									loop={true}
// 									pagination={{
// 										dynamicBullets: true,
// 										clickable: true,
// 									}}
// 									autoplay={{
// 										delay: 2000,
// 										disableOnInteraction: false,
// 									}}
// 									modules={[Autoplay]}
// 									className="w-full h-full"
// 								>
// 									<SwiperSlide className="h-full ">
// 										<div className="swiper-slide">
// 											<div className="brand-item relative flex items-center justify-center h-[36px]">
// 												<img
// 													src="assets/images/brand/1.png"
// 													alt="1"
// 													className="h-full w-auto duration-500 relative object-cover"
// 												/>
// 											</div>
// 										</div>
// 									</SwiperSlide>
// 									<SwiperSlide className="h-full">
// 										<div className="swiper-slide">
// 											<div className="brand-item relative flex items-center justify-center h-[36px]">
// 												<img
// 													src="assets/images/brand/2.png"
// 													alt="2"
// 													className="h-full w-auto duration-500 relative object-cover"
// 												/>
// 											</div>
// 										</div>
// 									</SwiperSlide>
// 									<SwiperSlide className="h-full">
// 										<div className="swiper-slide">
// 											<div className="brand-item relative flex items-center justify-center h-[36px]">
// 												<img
// 													src="assets/images/brand/3.png"
// 													alt="3"
// 													className="h-full w-auto duration-500 relative object-cover"
// 												/>
// 											</div>
// 										</div>
// 									</SwiperSlide>
// 									<SwiperSlide>
// 										<div className="swiper-slide">
// 											<div className="brand-item relative flex items-center justify-center h-[36px]">
// 												<img
// 													src="assets/images/brand/4.png"
// 													alt="4"
// 													className="h-full w-auto duration-500 relative object-cover"
// 												/>
// 											</div>
// 										</div>
// 									</SwiperSlide>
// 									<SwiperSlide>
// 										<div className="swiper-slide">
// 											<div className="brand-item relative flex items-center justify-center h-[36px]">
// 												<img
// 													src="assets/images/brand/5.png"
// 													alt="5"
// 													className="h-full w-auto duration-500 relative object-cover"
// 												/>
// 											</div>
// 										</div>
// 									</SwiperSlide>
// 									<SwiperSlide>
// 										<div className="swiper-slide">
// 											<div className="brand-item relative flex items-center justify-center h-[36px]">
// 												<img
// 													src="assets/images/brand/6.png"
// 													alt="6"
// 													className="h-full w-auto duration-500 relative object-cover"
// 												/>
// 											</div>
// 										</div>
// 									</SwiperSlide>
// 									<SwiperSlide>
// 										<div className="swiper-slide">
// 											<div className="brand-item relative flex items-center justify-center h-[36px]">
// 												<img
// 													src="assets/images/brand/7.png"
// 													alt="7"
// 													className="h-full w-auto duration-500 relative object-cover"
// 												/>
// 											</div>
// 										</div>
// 									</SwiperSlide>
// 								</Swiper>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Logoslider;
