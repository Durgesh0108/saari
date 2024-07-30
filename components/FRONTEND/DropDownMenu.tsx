import React, { useState } from "react";
import Link from "next/link";
import SFPROFont from "../SFPROFont";

const DropdownMenu = ({ Fabrics }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    // <SFPROFont>
    <div className="relative flex ">
      {/* Left Side - Fabrics */}
      <div className="w-1/4 flex flex-col border-r border-gray-200">
        {Fabrics.map((category, index) => (
          <div
            key={index}
            className={`cursor-pointer p-2 hover:text-pink-500 ${
              selectedCategory === index ? "text-pink-500" : ""
            }`}
            onMouseEnter={() => setSelectedCategory(index)}
            onMouseLeave={() => setSelectedCategory(selectedCategory)}
          >
            <Link href={`/products?fabricId=${category.id}`}>
              {category.name}
            </Link>
          </div>
        ))}
      </div>

      {/* Right Side - Images and Titles */}
      {selectedCategory !== null && (
        <div className="w-3/4 flex p-2">
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-8 ">
            {Fabrics[selectedCategory].Type.map((type, idx) => (
              <div className="flex flex-col gap-4" key={idx}>
                <div className="">
                  <Link href={`/products?typeId=${type.id}`}>{type.name}</Link>
                </div>
                <div>
                  {type.SubType.map((subtype, index) => (
                    <div key={index} className="text-lg">
                      <Link href={`/products?subTypeId=${subtype.id}`}>
                        {subtype.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    // </SFPROFont>
  );
};

export default DropdownMenu;
