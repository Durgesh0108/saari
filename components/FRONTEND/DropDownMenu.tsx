import React, { useState } from "react";
import Link from "next/link";

const DropdownMenu = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  console.log("dropdown", { categories });

  return (
    <div className="relative flex">
      {/* Left Side - Categories */}
      <div className="w-1/4 flex flex-col border-r border-gray-200">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`cursor-pointer p-2 hover:text-pink-500 ${
              selectedCategory === index ? "text-pink-500" : ""
            }`}
            onMouseEnter={() => setSelectedCategory(index)}
            onMouseLeave={() => setSelectedCategory(selectedCategory)}
          >
            {category.name}
          </div>
        ))}
      </div>

      {/* Right Side - Images and Titles */}
      {selectedCategory !== null && (
        <div className="w-3/4 flex p-4">
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-8 ">
            {categories[selectedCategory].Type.map((type, idx) => (
              <div className="flex flex-col gap-4">
                <div key={idx} className="">
                  <Link href={`/products?typeId=${type.id}`}>{type.name}</Link>
                </div>
                <div>
                  {type.SubType.map((subtype, index) => (
                    <div key={index} className="text-base">
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
  );
};

export default DropdownMenu;
