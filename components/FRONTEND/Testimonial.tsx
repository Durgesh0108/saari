// "use client";

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import { Star } from "lucide-react";

// const data = {
//   testimonials: [
//     {
//       rating: 5,
//       title: "Variety of Styles!",
//       description:
//         "Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!",
//       name: "Lisa K.",
//       date: "August 13, 2024",
//     },
//     {
//       rating: 5,
//       title: "Quality of Clothing!",
//       description:
//         "Anvouges fashion collection is a game-changer! Their unique and trendy pieces have completely transformed my style. Its comfortable, stylish, and always on-trend.",
//       name: "Elizabeth A.",
//       date: "August 13, 2024",
//     },
//     {
//       rating: 5,
//       title: "Customer Service!",
//       description:
//         "I absolutely love this shop! The products are high-quality and the customer service is excellent. I always leave with exactly what I need and a smile on my face.",
//       name: "Christin H.",
//       date: "August 13, 2024",
//     },
//     {
//       rating: 5,
//       title: "Quality of Clothing!",
//       description:
//         "I cant get enough of Anvouges high-quality clothing. Its comfortable, stylish, and always on-trend. The products are high-quality and the customer service is excellent.",
//       name: "Emily G.",
//       date: "August 13, 2024",
//     },
//     {
//       rating: 5,
//       title: "Customer Service!",
//       description:
//         "I love this shop! The products are always top-quality, and the staff is incredibly friendly and helpful. They go out of their way to make sure that Im satisfied my purchase.",
//       name: "Carolina C.",
//       date: "August 13, 2024",
//     },
//   ],
// };

// const Testimonials = () => {
//   return (
//     <div>
//       <div className="">
//         <div className="container">
//           <div className="text-4xl text-center">What People Are Saying</div>
//           <div className=" md:mt-10 mt-6">
//             <div className="swiper h-full relative">
//               <div className="swiper-wrapper">
//                 <Swiper
//                   slidesPerView={3}
//                   spaceBetween={30}
//                   loop={true}
//                   pagination={{
//                     dynamicBullets: true,
//                     clickable: true,
//                   }}
//                   autoplay={{
//                     delay: 2000,
//                     disableOnInteraction: false,
//                   }}
//                   modules={[Pagination, Navigation, Autoplay]}
//                   className="w-full h-full"
//                 >
//                   {data.testimonials.map((test, index) => (
//                     <SwiperSlide className="h-full hover:" key={index}>
//                       <div className="swiper-slide">
//                         <div className=" h-full">
//                           <div className=" bg-white p-8 rounded-2xl h-full">
//                             <div className="flex items-center gap-1">
//                               <Star
//                                 color="#cccc45"
//                                 strokeWidth={1}
//                                 fill="#cccc45"
//                                 className="h-4 w-4"
//                               />
//                               <Star
//                                 color="#cccc45"
//                                 strokeWidth={1}
//                                 fill="#cccc45"
//                                 className="h-4 w-4"
//                               />
//                               <Star
//                                 color="#cccc45"
//                                 strokeWidth={1}
//                                 fill="#cccc45"
//                                 className="h-4 w-4"
//                               />
//                               <Star
//                                 color="#cccc45"
//                                 strokeWidth={1}
//                                 fill="#cccc45"
//                                 className="h-4 w-4"
//                               />
//                               <Star
//                                 color="#cccc45"
//                                 strokeWidth={1}
//                                 fill="#cccc45"
//                                 className="h-4 w-4"
//                               />
//                             </div>
//                             <div className="text-xl font-semibold mt-4">
//                               {test.title}
//                             </div>
//                             <div className="mt-2">{test.description}</div>
//                             <div className="mt-4">{test.name}</div>
//                             <div className="text-xs text-gray-400  mt-1">
//                               {test.date}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               </div>
//               <div className="swiper-pagination" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

// @ts-nocheck

"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
import { Card } from "../ui/Card";
import Header1 from "../ui/Header1";
import Header2 from "../ui/Header2";

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
    <div className="">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center mb-8">
          <Header1>Testimonials</Header1>
          <Header2>What People Are Saying</Header2>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          // navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="w-full"
        >
          {data.testimonials.map((test, index) => (
            <SwiperSlide key={index}>
              <Card className="h-full p-6 bg-white rounded-2xl shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star
                      key={i}
                      color="#FBBF24"
                      strokeWidth={1}
                      fill="#FBBF24"
                      className="h-5 w-5"
                    />
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {test.description}
                </p>
                <p className="font-semibold">{test.name}</p>
                <p className="text-sm text-gray-500">{test.date}</p>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
