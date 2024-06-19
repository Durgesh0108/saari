// "use client";

// import React from "react";
// import promise from "@/public/assets/images/sarri/promise.png";
// import silkmark from "@/public/assets/images/sarri/silkmark.png";
// import Image from "next/image";

// const Promise = () => {
//   return (
//     <div>
//       <div className="container">
//         <div className=" shadow-2xl flex flex-col items-center p-16 px-32  rounded-tl-[100px] rounded-br-[100px]">
//           <div className="text-2xl font-semibold mb-5">Our Promise To You</div>
//           <Image
//             src={promise}
//             alt="promise"
//             height={1}
//             width={1000}
//             className="w-1/2 "
//           />
//           <hr className="border-[0.2px] mt-2 border-[#b48b66] w-full" />
//           <h4 className="text-2xl text-[#b48b66] font-semibold mt-6 mb-5">
//             Trusted Certificate
//           </h4>
//           <p className="flex flex-col w-1/2 text-center">
//             We uphold the TATA trust, and assure the highest quality of
//             personalized service and a delightful experience. We are proud
//             partners with organisations that certify authentic material and
//             crafts recognised across the nation.
//           </p>
//           <Image
//             src={silkmark}
//             height={1}
//             width={1000}
//             alt="silkmark"
//             className="w-1/3"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Promise;

// @ts-nocheck

import React from "react";
import promiseImage from "@/public/assets/images/sarri/promise.png";
import silkmarkImage from "@/public/assets/images/sarri/silkmark.png";
import Image from "next/image";

const Promise = () => {
  return (
    <div className="">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="shadow-xl rounded-tl-3xl rounded-br-3xl p-8 md:p-16 bg-white flex flex-col   items-center">
          <div className="text-center mb-8 w-2/3">
            <div className="text-3xl font-semibold mb-5">
              Our Promise To You
            </div>
            <Image
              src={promiseImage}
              alt="Promise"
              // layout="responsive"
              width={600}
              height={400}
              className="w-full rounded-lg"
            />
          </div>
          <hr className="border-[0.5px] border-[#b48b66] my-6 w-full" />
          <div className="text-center mb-8">
            <h4 className="text-2xl text-[#b48b66] font-semibold mb-4">
              Trusted Certificate
            </h4>
            <p className="mx-auto max-w-2xl text-lg">
              We uphold the TATA trust and assure the highest quality of
              personalized service and a delightful experience. We are proud
              partners with organizations that certify authentic materials and
              crafts recognized across the nation.
            </p>
          </div>
          <div className="flex justify-center mb-8 w-1/2">
            <Image
              src={silkmarkImage}
              alt="Silkmark"
              // layout="responsive"
              width={300}
              height={200}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promise;
