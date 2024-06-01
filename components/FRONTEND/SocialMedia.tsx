import React from "react";
import { Nunito_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

const nunito = Nunito_Sans({ subsets: ["latin"] });
export default function SocialMedia() {
  return (
    <div className="">
      <div className="container m-auto py-8 px-10  flex-col gap-y-4 flex items-center">
        <div
          className={`font-medium text-[#afafaf] text-2xl ${nunito.className}`}
        >
          Social Media Section
        </div>
        <div className="font-medium text-5xl italic ">
          View Social Media Photos
        </div>
      </div>
      <div className="grid grid-cols-2 h-96">
        <div className="border-2 border-black h-full flex justify-center items-center">Image</div>
        <div className="grid grid-cols-2">
          {[{}, {}, {}, {}].map((post, index) => (
            <div className="border-2 border-black flex text-center items-center justify-center" key={index}>
              image
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
