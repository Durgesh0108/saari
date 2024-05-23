"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const data = {
	testimonials: [
		{
			rating: 5,
			title: "Variety of Styles!",
			description:
				"Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!",
			name: "Lisa K.",
			date: "August 13, 2024",
		},
		{
			rating: 5,
			title: "Variety of Styles!",
			description:
				"Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!",
			name: "Lisa K.",
			date: "August 13, 2024",
		},
		{
			rating: 5,
			title: "Quality of Clothing!",
			description:
				"Anvouges fashion collection is a game-changer! Their unique and trendy pieces have completely transformed my style. Its comfortable, stylish, and always on-trend.",
			name: "Elizabeth A.",
			date: "August 13, 2024",
		},
		{
			rating: 5,
			title: "Customer Service!",
			description:
				"I absolutely love this shop! The products are high-quality and the customer service is excellent. I always leave with exactly what I need and a smile on my face.",
			name: "Christin H.",
			date: "August 13, 2024",
		},
		{
			rating: 5,
			title: "Quality of Clothing!",
			description:
				"I cant get enough of Anvouges high-quality clothing. Its comfortable, stylish, and always on-trend. The products are high-quality and the customer service is excellent.",
			name: "Emily G.",
			date: "August 13, 2024",
		},
		{
			rating: 5,
			title: "Customer Service!",
			description:
				"I love this shop! The products are always top-quality, and the staff is incredibly friendly and helpful. They go out of their way to make sure that Im satisfied my purchase.",
			name: "Carolina C.",
			date: "August 13, 2024",
		},
	],
};

const Testimonials = () => {
	return (
		<div>
			<div className="testimonial-block md:pt-20 md:pb-16 pt-10 pb-8 md:mt-20 mt-10 bg-surface">
				<div className="container">
					<div className="heading3 text-center">
						What People Are Saying
					</div>
					<div className="list-testimonial pagination-mt40 md:mt-10 mt-6">
						<div className="swiper swiper-list-testimonial h-full relative">
							<div className="swiper-wrapper">
								<Swiper
									slidesPerView={3}
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
									modules={[Pagination, Navigation, Autoplay]}
									className="w-full h-full"
								>
									{data.testimonials.map((test, index) => (
										<SwiperSlide
											className="h-full hover:"
											key={index}
										>
											<div className="swiper-slide">
												<div className="testimonial-item style-one h-full">
													<div className="testimonial-main bg-white p-8 rounded-2xl h-full">
														<div className="flex items-center gap-1">
															<i className="ph-fill ph-star text-yellow" />
															<i className="ph-fill ph-star text-yellow" />
															<i className="ph-fill ph-star text-yellow" />
															<i className="ph-fill ph-star text-yellow" />
															<i className="ph-fill ph-star text-yellow" />
														</div>
														<div className="heading6 title mt-4">
															{test.title}
														</div>
														<div className="desc mt-2">
															{test.description}
														</div>
														<div className="text-button name mt-4">
															{test.name}
														</div>
														<div className="caption2 date text-secondary2 mt-1">
															{test.date}
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
									))}
									{/* 
                  <SwiperSlide className="h-full">
                    <div className="swiper-slide">
                      <div className="testimonial-item style-one h-full">
                        <div className="testimonial-main bg-white p-8 rounded-2xl h-full">
                          <div className="flex items-center gap-1">
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                          </div>
                          <div className="heading6 title mt-4">
                            Variety of Styles!
                          </div>
                          <div className="desc mt-2">
                            Fantastic shop! Great selection, fair prices, and
                            friendly staff. Highly recommended. The quality of
                            the products is exceptional, and the prices are very
                            reasonable!
                          </div>
                          <div className="text-button name mt-4">Lisa K.</div>
                          <div className="caption2 date text-secondary2 mt-1">
                            August 13, 2024
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="h-full">
                    <div className="swiper-slide">
                      <div className="testimonial-item style-one h-full">
                        <div className="testimonial-main bg-white p-8 rounded-2xl h-full">
                          <div className="flex items-center gap-1">
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                          </div>
                          <div className="heading6 title mt-4">
                            Quality of Clothing!
                          </div>
                          <div className="desc mt-2">
                            Anvouges fashion collection is a game-changer! Their
                            unique and trendy pieces have completely transformed
                            my style. Its comfortable, stylish, and always
                            on-trend.
                          </div>
                          <div className="text-button name mt-4">
                            Elizabeth A.
                          </div>
                          <div className="caption2 date text-secondary2 mt-1">
                            August 13, 2024
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-slide">
                      <div className="testimonial-item style-one h-full">
                        <div className="testimonial-main bg-white p-8 rounded-2xl h-full">
                          <div className="flex items-center gap-1">
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                          </div>
                          <div className="heading6 title mt-4">
                            Customer Service!
                          </div>
                          <div className="desc mt-2">
                            I absolutely love this shop! The products are
                            high-quality and the customer service is excellent.
                            I always leave with exactly what I need and a smile
                            on my face.
                          </div>
                          <div className="text-button name mt-4">
                            Christin H.
                          </div>
                          <div className="caption2 date text-secondary2 mt-1">
                            August 13, 2024
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-slide">
                      <div className="testimonial-item style-one h-full">
                        <div className="testimonial-main bg-white p-8 rounded-2xl h-full">
                          <div className="flex items-center gap-1">
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                          </div>
                          <div className="heading6 title mt-4">
                            Quality of Clothing!
                          </div>
                          <div className="desc mt-2">
                            I cant get enough of Anvouges high-quality clothing.
                            Its comfortable, stylish, and always on-trend. The
                            products are high-quality and the customer service
                            is excellent.
                          </div>
                          <div className="text-button name mt-4">Emily G.</div>
                          <div className="caption2 date text-secondary2 mt-1">
                            August 13, 2024
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-slide">
                      <div className="testimonial-item style-one h-full">
                        <div className="testimonial-main bg-white p-8 rounded-2xl h-full">
                          <div className="flex items-center gap-1">
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                            <i className="ph-fill ph-star text-yellow" />
                          </div>
                          <div className="heading6 title mt-4">
                            Customer Service!
                          </div>
                          <div className="desc mt-2">
                            I love this shop! The products are always
                            top-quality, and the staff is incredibly friendly
                            and helpful. They go out of their way to make sure
                            that Im satisfied my purchase.
                          </div>
                          <div className="text-button name mt-4">
                            Carolina C.
                          </div>
                          <div className="caption2 date text-secondary2 mt-1">
                            August 13, 2024
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide> */}
								</Swiper>
							</div>
							<div className="swiper-pagination" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Testimonials;
