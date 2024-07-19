import React, { useState } from "react";
import Link from "next/link";

const DescriptionTab = ({ product }) => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  let description = [
    { key: "Category", value: product.category.name },
    { key: "Fabric", value: product.fabric.name },
    { key: "Color", value: product.color.name },
    { key: "Occassion", value: product.occassion.name },
    { key: "Design", value: product.pattern.name },
    ...product.description,
  ];
  console.log(product);
  console.log(product.description);
  console.log(description);

  return (
    <div className="relative flex">
      {/* Left Side - Fabrics */}
      <div className="w-1/4 flex flex-col border-r border-gray-200">
        <div
          className={`cursor-pointer p-2 hover:text-pink-500 font-bold`}
          onMouseEnter={() => setSelectedCategory(1)}
          onMouseLeave={() => setSelectedCategory(selectedCategory)}
        >
          Product Specs
        </div>
        <div
          className={`cursor-pointer p-2 hover:text-pink-500 font-bold`}
          onMouseEnter={() => setSelectedCategory(2)}
          onMouseLeave={() => setSelectedCategory(selectedCategory)}
        >
          Description
        </div>
        <div
          className={`cursor-pointer p-2 hover:text-pink-500 font-bold`}
          onMouseEnter={() => setSelectedCategory(3)}
          onMouseLeave={() => setSelectedCategory(selectedCategory)}
        >
          More
        </div>
      </div>

      {/* Right Side - Images and Titles */}
      {selectedCategory !== null && (
        <div className="w-3/4 flex p-2">
          {selectedCategory === 1 && (
            <div className="w-full h-full grid grid-cols-8">
              <div className="col-span-8">
                <div className="grid grid-cols-2  gap-x-24 ">
                  {/* {product?.description?.map((desc, index) => ( */}
                  {description.map((desc, index) => (
                    <div key={index} className=" flex flex-col gap-8">
                      <div className="w-full grid grid-cols-2">
                        <p className="p-1 text-lg font-medium">{desc.key}:</p>
                        <p className="p-1 pl-3 bg-[#faf2e8] text-lg font-medium ">
                          {desc.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 2 && (
            <div className="w-full  h-full grid grid-cols-8 ">
              <div className="col-span-8 ">
                <div className="mb-8">
                  <p className="text-gray-600 mb-4">
                    Handloom pista green pure kanjeevaram silk saree has golden
                    butti upper side and butti with checks on the lower side
                    with rama green-red border. Intricate rama green pallu and
                    running plain rama green blouse piece with border.
                  </p>
                  <p className="text-gray-600">
                    This beautiful kanjeevaram saree can be a pride possession
                    for you. Kanjeevaram has a special traditional and cultural
                    significance.
                  </p>
                </div>
              </div>
            </div>
          )}
          {selectedCategory === 3 && (
            <div className="w-full  h-full grid grid-cols-8 ">
              <div className="col-span-8 ">
                <div className="flex flex-col gap-2">
                  <div className="text-xl">
                    <span className="font-medium text-gray-800">Note: </span>
                    <span>
                      Product color may slightly vary due to photographic
                      lighting sources or your monitor settings.
                    </span>
                  </div>
                </div>
                {/* <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Saree measurements
                  </h2>
                  <div className="grid gap-2">
                    <div className="text-xl">
                      <span className="font-medium text-gray-800">
                        Length:{" "}
                      </span>
                      <span>5.24 meter</span>
                    </div>
                    <div className="text-xl">
                      <span className="font-medium text-gray-800">
                        Height:{" "}
                      </span>
                      <span>47 inches</span>
                    </div>
                    <div className="text-xl">
                      <span className="font-medium text-gray-800">
                        Blouse piece:{" "}
                      </span>
                      <span>85 centimeters</span>
                    </div>
                  </div>
                </div> */}
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Instructions
                  </h2>
                  <p className="text-gray-600">
                    We strive to capture photographs that are as authentic as
                    possible, no filters or other special effects are used.
                    However, colours may differ depending on the screen
                    resolution used to access the product.
                  </p>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Shipping & Returns
                  </h2>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>
                      Kindly note that within India we share the bill and
                      tracking information 24hrs after the goods are shipped,
                      and after about 72 hrs if its shipped Internationally.
                    </li>
                    <li>
                      Within India, you would receive the shipment within a week
                      after dispatched, 10 to 15 days outside India.
                    </li>
                    <li>
                      Please do not accept the courier if the package is torn or
                      not in good condition.
                    </li>
                    <li>
                      You may relax knowing that your product has passed all the
                      quality check procedures. Please be aware that we do not
                      accept returns and exchanges.
                    </li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Care Instructions
                  </h2>
                  <p className="text-gray-600">
                    We would suggest dry clean only.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* <div className="w-full  h-full grid grid-cols-8 ">
        <div className="col-span-8 ">
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              Handloom pista green pure kanjeevaram silk saree has golden butti
              upper side and butti with checks on the lower side with rama
              green-red border. Intricate rama green pallu and running plain
              rama green blouse piece with border.
            </p>
            <p className="text-gray-600">
              This beautiful kanjeevaram saree can be a pride possession for
              you. Kanjeevaram has a special traditional and cultural
              significance.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full  h-full grid grid-cols-8 ">
        <div className="col-span-8 ">
          <div className="flex flex-col gap-2">
            <div className="text-xl">
              <span className="font-medium text-gray-800">Saree Color: </span>
              <span>Pista Green</span>
            </div>
            <div className="text-xl">
              <span className="font-medium text-gray-800">Fabric: </span>
              <span>Pure Silk</span>
            </div>
            <div className="text-xl">
              <span className="font-medium text-gray-800">Wash Care: </span>
              <span>Dry clean only</span>
            </div>
            <div className="text-xl">
              <span className="font-medium text-gray-800">Occasion: </span>
              <span>Traditional Wear/ Special Wear</span>
            </div>
            <div className="text-xl">
              <span className="font-medium text-gray-800">Note: </span>
              <span>
                Product color may slightly vary due to photographic lighting
                sources or your monitor settings.
              </span>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Saree measurements
            </h2>
            <div className="grid gap-2">
              <div className="text-xl">
                <span className="font-medium text-gray-800">Length: </span>
                <span>5.24 meter</span>
              </div>
              <div className="text-xl">
                <span className="font-medium text-gray-800">Height: </span>
                <span>47 inches</span>
              </div>
              <div className="text-xl">
                <span className="font-medium text-gray-800">
                  Blouse piece:{" "}
                </span>
                <span>85 centimeters</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Instructions
            </h2>
            <p className="text-gray-600">
              We strive to capture photographs that are as authentic as
              possible, no filters or other special effects are used. However,
              colours may differ depending on the screen resolution used to
              access the product.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Shipping & Returns
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>
                Kindly note that within India we share the bill and tracking
                information 24hrs after the goods are shipped, and after about
                72 hrs if its shipped Internationally.
              </li>
              <li>
                Within India, you would receive the shipment within a week after
                dispatched, 10 to 15 days outside India.
              </li>
              <li>
                Please do not accept the courier if the package is torn or not
                in good condition.
              </li>
              <li>
                You may relax knowing that your product has passed all the
                quality check procedures. Please be aware that we do not accept
                returns and exchanges.
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Care Instructions
            </h2>
            <p className="text-gray-600">We would suggest dry clean only.</p>
          </div>
        </div>
      </div> */}

      {/* <div className="w-full  h-full grid grid-cols-8 ">
        <div className="col-span-8 ">
          <div className="grid grid-cols-2">
            {product?.description?.map((desc, index) => (
              <div className="w-full grid grid-cols-2  " key={index}>
                <p className=" p-4 text-xl font-medium">{desc.key}:</p>
                <p className=" p-4 bg-[#fdf6ee] text-xl font-medium">
                  {desc.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DescriptionTab;