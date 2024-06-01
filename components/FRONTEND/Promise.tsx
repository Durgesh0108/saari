"use client";

import React from "react";
import promise from "@/public/assets/images/sarri/promise.png";
import silkmark from "@/public/assets/images/sarri/silkmark.png";
import Image from "next/image";

const Promise = () => {
  return (
    <div>
      <div className="container px-8">
        <div className="sanket shadow-2xl flex flex-col items-center p-16 px-32">
          <div className="heading3 mb-5">Our Promise To You</div>
          <Image src={promise} alt="promise" height={1} width={1000} className="w-1/2 "/>
          <hr className="border-[0.2px] mt-2 border-[#b48b66] w-full" />
          <h4 className="text-2xl text-[#b48b66] font-semibold mt-6 mb-5">
            Trusted Certificate
          </h4>
          <p className="flex flex-col w-1/2 text-center">
            We uphold the TATA trust, and assure the highest quality of
            personalized service and a delightful experience. We are proud
            partners with organisations that certify authentic material and
            crafts recognised across the nation.
          </p>
          <Image
            src={silkmark}
            height={1}
            width={1000}
            alt="silkmark"
            className="w-1/3"
          />
        </div>
      </div>
    </div>
  );
};

export default Promise;
