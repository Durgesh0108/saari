// // @ts-nocheck

// "use client";

// import { Preview } from "@/components/preview";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";

// export default function DressStyleComponent({
//   DressStyles,
//   TopViews,
//   Attires,
// }) {
//   const [selectedDressStyle, setSelectedDressStyle] = useState(
//     DressStyles[0].id
//   );
//   const [selectedTopView, setSelectedTopView] = useState(TopViews[0].id);

//   const [dressStyle, setDressStyle] = useState([]);
//   const [topView, setTopView] = useState([]);
//   const [attire, setAttire] = useState([]);

//   useEffect(() => {
//     const dress = DressStyles.find((dress) => dress.id === selectedDressStyle);
//     setDressStyle(dress);
//   }, [DressStyles, selectedDressStyle]);

//   useEffect(() => {
//     const topview = TopViews.find((top) => top.id === selectedTopView);
//     setTopView(topview);
//   }, [TopViews, selectedTopView]);

//   useEffect(() => {
//     const attires = Attires.filter(
//       (attire) =>
//         attire.dressStyleId === selectedDressStyle &&
//         attire.topViewId === selectedTopView
//     );

//     console.log(attires[0]);
//     setAttire(attires[0]);
//   }, [selectedDressStyle, selectedTopView, Attires]);

//   return (
//     <div className="mt-4 container">
//       <div className="grid grid-cols-3 gap-4">
//         <div className="border-2 border-black h-full w-full col-span-1 flex flex-col gap-4">
//           <div className="h-3/4 border-2 border-black">
//             <div className="h-full">

//               <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//                 loop={true}
//                 pagination={{
//                   dynamicBullets: true,
//                   clickable: true,
//                 }}
//                 autoplay={{
//                   delay: 2000,
//                   disableOnInteraction: false,
//                 }}
//                 modules={[Pagination, Navigation, Autoplay]}
//                 className="w-full h-full"
//               >
//                 {/* {attire.images.map((image, index) => (
//                   <SwiperSlide className="h-full " key={index}>
//                     <div className="h-full w-full">
//                       <Image
//                         src={image.url}
//                         alt={image.id}
//                         width={150}
//                         height={100}
//                         className="h-full w-full"
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))} */}
//               </Swiper>
//             </div>
//           </div>
//           <div className="h-1/4 border-2 border-black">
//             <div className="h-full flex gap-4 justify-center">
//               {TopViews.map((top, index) => (
//                 <div
//                   key={index}
//                   onClick={() => setSelectedTopView(top.id)}
//                   className="h-24 w-36 cursor-pointer"
//                 >
//                   <Image
//                     src={top.imageUrl}
//                     height={100}
//                     width={150}
//                     alt={`top-view-${top.name}`}
//                     className="h-full w-full object-cover rounded-md"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="col-span-2 gap-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <ol>
//                 {DressStyles.map((dress, index) => (
//                   <li
//                     key={index}
//                     onClick={() => setSelectedDressStyle(dress.id)}
//                     className="cursor-pointer"
//                   >
//                     {dress.name}
//                   </li>
//                 ))}
//               </ol>
//             </div>
//             <div className="w-full">
//               <Preview value={dressStyle?.description} />
//             </div>
//           </div>
//           <div className="grid grid-cols-4 gap-4 ">
//             {dressStyle.videoUrl?.split(", ").map((video, index) => (
//               <div key={index} className="w-full">
//                 <iframe
//                   src={video}
//                   height={120}
//                   width={200}
//                   key={index}
//                 ></iframe>
//               </div>
//             ))}

//             {dressStyle.videoUrl?.split(", ").map((video, index) => (
//               <div key={index} className="w-full">
//                 <iframe
//                   src={video}
//                   height={120}
//                   width={200}
//                   key={index}
//                 ></iframe>
//               </div>
//             ))}

//             {dressStyle.videoUrl?.split(", ").map((video, index) => (
//               <div key={index} className="w-full">
//                 <iframe
//                   src={video}
//                   height={120}
//                   width={200}
//                   key={index}
//                 ></iframe>
//               </div>
//             ))}

//             {dressStyle.videoUrl?.split(", ").map((video, index) => (
//               <div key={index} className="w-full">
//                 <iframe
//                   src={video}
//                   height={120}
//                   width={200}
//                   key={index}
//                 ></iframe>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// @ts-nocheck

// "use client";

// import { Preview } from "@/components/preview";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";

// export default function DressStyleComponent({
//   DressStyles,
//   TopViews,
//   Attires,
// }) {
//   const [selectedDressStyle, setSelectedDressStyle] = useState(
//     DressStyles[0].id
//   );
//   const [selectedTopView, setSelectedTopView] = useState(TopViews[0].id);

//   const [dressStyle, setDressStyle] = useState([]);
//   const [topView, setTopView] = useState([]);
//   const [attire, setAttire] = useState([]);

//   useEffect(() => {
//     const dress = DressStyles.find((dress) => dress.id === selectedDressStyle);
//     setDressStyle(dress);
//   }, [DressStyles, selectedDressStyle]);

//   useEffect(() => {
//     const topview = TopViews.find((top) => top.id === selectedTopView);
//     setTopView(topview);
//   }, [TopViews, selectedTopView]);

//   useEffect(() => {
//     const attires = Attires.filter(
//       (attire) =>
//         attire.dressStyleId === selectedDressStyle &&
//         attire.topViewId === selectedTopView
//     );

//     console.log(attires[0]);
//     setAttire(attires[0]);
//   }, [selectedDressStyle, selectedTopView, Attires]);

//   return (
//     <div className="mt-4 container">
//       <div className="grid grid-cols-3 gap-4">
//         <div className="h-96 w-full col-span-1 flex flex-col gap-4">
//           <div className="h-3/4 ">
//             <div className="h-full">
//               <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//                 loop={true}
//                 pagination={{
//                   dynamicBullets: true,
//                   clickable: true,
//                 }}
//                 // autoplay={{
//                 //   delay: 2000,
//                 //   disableOnInteraction: false,
//                 // }}
//                 modules={[Pagination, Navigation]}
//                 className="w-full h-full"
//               >
//                 {attire?.images?.map((image, index) => (
//                   <SwiperSlide className="h-full" key={index}>
//                     <div className="h-full w-full">
//                       <Image
//                         src={image.url}
//                         alt={image.id}
//                         width={150}
//                         height={100}
//                         className="h-full w-full object-cover rounded-md"
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           </div>
//           <div className="h-1/4 ">
//             <div className="h-full flex gap-4 justify-center">
//               {TopViews.map((top, index) => (
//                 <div
//                   key={index}
//                   onClick={() => setSelectedTopView(top.id)}
//                   className="h-24 w-36 cursor-pointer"
//                 >
//                   <Image
//                     src={top.imageUrl}
//                     height={100}
//                     width={150}
//                     alt={`top-view-${top.name}`}
//                     className="h-full w-full object-cover rounded-md"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="col-span-2 gap-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <ol>
//                 {DressStyles.map((dress, index) => (
//                   <li
//                     key={index}
//                     onClick={() => setSelectedDressStyle(dress.id)}
//                     className="cursor-pointer"
//                   >
//                     {dress.name}
//                   </li>
//                 ))}
//               </ol>
//             </div>
//             <div className="w-full">
//               <Preview value={dressStyle?.description} />
//             </div>
//           </div>
//           <div className="grid grid-cols-4 gap-4 ">
//             {dressStyle?.videoUrl?.split(", ").map((video, index) => (
//               <div key={index} className="w-full">
//                 <iframe
//                   src={video}
//                   height={120}
//                   width={200}
//                   key={index}
//                 ></iframe>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Preview } from "@/components/preview";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function DressStyleComponent({
  DressStyles,
  TopViews,
  Attires,
}) {
  const [selectedDressStyle, setSelectedDressStyle] = useState(
    DressStyles[0].id
  );
  const [selectedTopView, setSelectedTopView] = useState(TopViews[0].id);

  const [dressStyle, setDressStyle] = useState([]);
  const [topView, setTopView] = useState([]);
  const [attire, setAttire] = useState([]);

  useEffect(() => {
    const dress = DressStyles.find((dress) => dress.id === selectedDressStyle);
    setDressStyle(dress);
  }, [DressStyles, selectedDressStyle]);

  useEffect(() => {
    const topview = TopViews.find((top) => top.id === selectedTopView);
    setTopView(topview);
  }, [TopViews, selectedTopView]);

  useEffect(() => {
    const attires = Attires.filter(
      (attire) =>
        attire.dressStyleId === selectedDressStyle &&
        attire.topViewId === selectedTopView
    );

    setAttire(attires[0]);
  }, [selectedDressStyle, selectedTopView, Attires]);

  return (
    <div className="mt-4 container">
      <div className="grid grid-cols-3 gap-4">
        <div className="h-full w-full col-span-1 flex flex-col gap-4">
          <div className="h-96 ">
            <div className="h-full">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  dynamicBullets: true,
                  clickable: true,
                }}
                // autoplay={{
                //   delay: 2000,
                //   disableOnInteraction: false,
                // }}
                modules={[Pagination, Navigation]}
                className="w-full h-full"
              >
                {attire?.images?.map((image, index) => (
                  <SwiperSlide className="h-full" key={index}>
                    <div className="h-full w-full">
                      <Image
                        src={image.url}
                        alt={image.id}
                        width={150}
                        height={100}
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="h-1/4 ">
            <div className="h-full flex gap-4 justify-center">
              {TopViews.map((top, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedTopView(top.id)}
                  className={`h-24 w-36 cursor-pointer ${
                    selectedTopView === top.id ? "border-2 border-blue-500" : ""
                  }`}
                >
                  <Image
                    src={top.imageUrl}
                    height={100}
                    width={150}
                    alt={`top-view-${top.name}`}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ol>
                {DressStyles.map((dress, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedDressStyle(dress.id)}
                    className={`cursor-pointer ${
                      selectedDressStyle === dress.id
                        ? "font-bold text-blue-500"
                        : ""
                    }`}
                  >
                    {dress.name}
                  </li>
                ))}
              </ol>
            </div>
            <div className="w-full">
              <Preview value={dressStyle?.description} />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 ">
            {dressStyle?.videoUrl?.split(", ").map((video, index) => (
              <div key={index} className="w-full">
                <iframe
                  src={video}
                  height={120}
                  width={200}
                  key={index}
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
