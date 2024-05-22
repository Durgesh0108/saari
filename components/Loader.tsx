import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <div className="my-32">
      <div className="relative flex justify-center items-center animate-bounce">
        {/* <div className="absolute animate-spin rounded h-32 w-32 border-t-4 border-b-4 border-purple-500"></div> */}
        <Image
          src="https://res.cloudinary.com/dttieobbt/image/upload/v1715673113/Probiz5_fevicon_ogoblo.png"
          className=" h-28 w-28"
          height={200}
          alt="Loader"
          width={200}
          loading="lazy"
        />
      </div>
    </div>
  );
}
