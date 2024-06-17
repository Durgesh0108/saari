import Image from "next/image";
import React from "react";

export default function NoProduct() {
  return (
    <div className="flex flex-col justify-center items-center text-center w-full h-full ">
      <p className=" flex items-center">
        <Image
          src={
            "https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
          }
          alt="no Product"
          height={1}
          width={1000}
          className="w-fit h-full object-contain "
        />
      </p>
    </div>
  );
}
