// import React, { useState } from "react";
// import Link from "next/link";

// const DescriptionTab = ({ product }) => {
//   const [selectedCategory, setSelectedCategory] = useState(1);

//   //     blouseColor: true,
//   //     palluColor: true,
//   //     borderColor: true,
//   //     zariColor: true,

//   const description = [
//     { key: "Category", value: product.category ? product.category.name : null },
//     { key: "Fabric", value: product.fabric ? product.fabric.name : null },
//     { key: "Color", value: product.color ? product.color.name : null },
//     { key: "Occasion", value: product.occasion ? product.occasion.name : null },
//     { key: "Design", value: product.pattern ? product.pattern.name : null },
//     { key: "Type", value: product.type ? product.type.name : null },
//     { key: "Sub Type", value: product.SubType ? product.SubType.name : null },
//     { key: "Border", value: product.border ? product.border.name : null },
//     {
//       key: "Blouse Pattern",
//       value: product.blousePattern ? product.blousePattern.name : null,
//     },
//     {
//       key: "Butti Type",
//       value: product.buttiType ? product.buttiType.name : null,
//     },
//     {
//       key: "Pallu Motif",
//       value: product.palluMotif ? product.palluMotif.name : null,
//     },
//     {
//       key: "Saree Motif",
//       value: product.sareeMotif ? product.sareeMotif.name : null,
//     },
//     { key: "Weave", value: product.weave ? product.weave.name : null },
//     {
//       key: "Weave Type",
//       value: product.weaveType ? product.weaveType.name : null,
//     },
//     { key: "Zari", value: product.zari ? product.zari.name : null },
//     ...product.description,
//   ];

//   const filteredDescription = description.filter((item) => item.value);

//   return (
//     <div className="relative flex">
//       {/* Left Side - Fabrics */}
//       <div className="w-1/4 flex flex-col border-r border-gray-200">
//         <div
//           className={`cursor-pointer p-2 hover:text-pink-500 font-bold`}
//           onMouseEnter={() => setSelectedCategory(1)}
//           onMouseLeave={() => setSelectedCategory(selectedCategory)}
//         >
//           Product Specs
//         </div>
//         <div
//           className={`cursor-pointer p-2 hover:text-pink-500 font-bold`}
//           onMouseEnter={() => setSelectedCategory(2)}
//           onMouseLeave={() => setSelectedCategory(selectedCategory)}
//         >
//           Description
//         </div>
//         <div
//           className={`cursor-pointer p-2 hover:text-pink-500 font-bold`}
//           onMouseEnter={() => setSelectedCategory(3)}
//           onMouseLeave={() => setSelectedCategory(selectedCategory)}
//         >
//           More
//         </div>
//       </div>

//       {/* Right Side - Images and Titles */}
//       {selectedCategory !== null && (
//         <div className="w-3/4 flex p-2">
//           {selectedCategory === 1 && (
//             <div className="w-full h-full grid grid-cols-8">
//               <div className="col-span-8">
//                 <div className="grid grid-cols-2  gap-x-24 ">
//                   {/* {product?.description?.map((desc, index) => ( */}
//                   {filteredDescription.map((desc, index) => (
//                     <div key={index} className=" flex flex-col gap-8">
//                       <div className="w-full grid grid-cols-2">
//                         <p className="p-1 text-lg font-medium">{desc.key}:</p>
//                         <p className="p-1 pl-3 bg-[#faf2e8] text-lg font-medium ">
//                           {desc.value}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {selectedCategory === 2 && (
//             <div className="w-full  h-full grid grid-cols-8 ">
//               <div className="col-span-8 ">
//                 <div className="mb-8">
//                   <p className="text-gray-600 mb-4">
//                     Handloom pista green pure kanjeevaram silk saree has golden
//                     butti upper side and butti with checks on the lower side
//                     with rama green-red border. Intricate rama green pallu and
//                     running plain rama green blouse piece with border.
//                   </p>
//                   <p className="text-gray-600">
//                     This beautiful kanjeevaram saree can be a pride possession
//                     for you. Kanjeevaram has a special traditional and cultural
//                     significance.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//           {selectedCategory === 3 && (
//             <div className="w-full  h-full grid grid-cols-8 ">
//               <div className="col-span-8 ">
//                 <div className="flex flex-col gap-2">
//                   <div className="text-xl">
//                     <span className="font-medium text-gray-800">Note: </span>
//                     <span>
//                       Product color may slightly vary due to photographic
//                       lighting sources or your monitor settings.
//                     </span>
//                   </div>
//                 </div>
//                 {/* <div className="mt-8">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                     Saree measurements
//                   </h2>
//                   <div className="grid gap-2">
//                     <div className="text-xl">
//                       <span className="font-medium text-gray-800">
//                         Length:{" "}
//                       </span>
//                       <span>5.24 meter</span>
//                     </div>
//                     <div className="text-xl">
//                       <span className="font-medium text-gray-800">
//                         Height:{" "}
//                       </span>
//                       <span>47 inches</span>
//                     </div>
//                     <div className="text-xl">
//                       <span className="font-medium text-gray-800">
//                         Blouse piece:{" "}
//                       </span>
//                       <span>85 centimeters</span>
//                     </div>
//                   </div>
//                 </div> */}
//                 <div className="mt-4">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                     Instructions
//                   </h2>
//                   <p className="text-gray-600">
//                     We strive to capture photographs that are as authentic as
//                     possible, no filters or other special effects are used.
//                     However, colours may differ depending on the screen
//                     resolution used to access the product.
//                   </p>
//                 </div>
//                 <div className="mt-4">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                     Shipping & Returns
//                   </h2>
//                   <ul className="list-disc list-inside text-gray-600">
//                     <li>
//                       Kindly note that within India we share the bill and
//                       tracking information 24hrs after the goods are shipped,
//                       and after about 72 hrs if its shipped Internationally.
//                     </li>
//                     <li>
//                       Within India, you would receive the shipment within a week
//                       after dispatched, 10 to 15 days outside India.
//                     </li>
//                     <li>
//                       Please do not accept the courier if the package is torn or
//                       not in good condition.
//                     </li>
//                     <li>
//                       You may relax knowing that your product has passed all the
//                       quality check procedures. Please be aware that we do not
//                       accept returns and exchanges.
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="mt-4">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                     Care Instructions
//                   </h2>
//                   <p className="text-gray-600">
//                     We would suggest dry clean only.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DescriptionTab;

import React, { useState } from "react";
import Link from "next/link";

const DescriptionTab = ({ product }) => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const description = [
    { key: "Category", value: product.category ? product.category.name : null },
    { key: "Fabric", value: product.fabric ? product.fabric.name : null },
    { key: "Color", value: product.color ? product.color.name : null },
    { key: "Occasion", value: product.occasion ? product.occasion.name : null },
    { key: "Design", value: product.pattern ? product.pattern.name : null },
    { key: "Type", value: product.type ? product.type.name : null },
    { key: "Sub Type", value: product.SubType ? product.SubType.name : null },
    { key: "Border", value: product.border ? product.border.name : null },
    {
      key: "Blouse Pattern",
      value: product.blousePattern ? product.blousePattern.name : null,
    },
    {
      key: "Butti Type",
      value: product.buttiType ? product.buttiType.name : null,
    },
    {
      key: "Pallu Motif",
      value: product.palluMotif ? product.palluMotif.name : null,
    },
    {
      key: "Saree Motif",
      value: product.sareeMotif ? product.sareeMotif.name : null,
    },
    { key: "Weave", value: product.weave ? product.weave.name : null },
    {
      key: "Weave Type",
      value: product.weaveType ? product.weaveType.name : null,
    },
    { key: "Zari", value: product.zari ? product.zari.name : null },
    ...product.description,
  ];

  const filteredDescription = description.filter((item) => item.value);

  return (
    <div className="relative flex flex-col md:flex-row">
      {/* Left Side - Categories */}
      <div className="w-full flex md:block gap-4 md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 md:pr-4">
        <div
          className={`cursor-pointer p-2 hover:text-pink-500 font-bold ${
            selectedCategory === 1 ? "text-pink-500" : ""
          }`}
          onClick={() => setSelectedCategory(1)}
        >
          Product Specs
        </div>
        <div
          className={`cursor-pointer p-2 hover:text-pink-500 font-bold ${
            selectedCategory === 2 ? "text-pink-500" : ""
          }`}
          onClick={() => setSelectedCategory(2)}
        >
          Description
        </div>
        <div
          className={`cursor-pointer p-2 hover:text-pink-500 font-bold ${
            selectedCategory === 3 ? "text-pink-500" : ""
          }`}
          onClick={() => setSelectedCategory(3)}
        >
          More
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-3/4 p-4">
        {selectedCategory === 1 && (
          <div className="w-full h-full grid grid-cols-8">
            <div className="col-span-8">
              <div className="grid grid-cols-2  gap-x-24 ">
                {/* {product?.description?.map((desc, index) => ( */}
                {filteredDescription.map((desc, index) => (
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
          <div className="text-gray-600">
            <p className="mb-4">
              Handloom pista green pure kanjeevaram silk saree has golden butti
              upper side and butti with checks on the lower side with rama
              green-red border. Intricate rama green pallu and running plain
              rama green blouse piece with border.
            </p>
            <p>
              This beautiful kanjeevaram saree can be a pride possession for
              you. Kanjeevaram has a special traditional and cultural
              significance.
            </p>
          </div>
        )}

        {selectedCategory === 3 && (
          <div className="text-gray-600">
            <div className="text-xl font-semibold mb-2">
              <span className="font-medium text-gray-800">Note: </span>
              Product color may slightly vary due to photographic lighting
              sources or your monitor settings.
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Instructions
              </h2>
              <p>
                We strive to capture photographs that are as authentic as
                possible, no filters or other special effects are used. However,
                colours may differ depending on the screen resolution used to
                access the product.
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Shipping & Returns
              </h2>
              <ul className="list-disc list-inside">
                <li>
                  Kindly note that within India we share the bill and tracking
                  information 24hrs after the goods are shipped, and after about
                  72 hrs if its shipped Internationally.
                </li>
                <li>
                  Within India, you would receive the shipment within a week
                  after dispatched, 10 to 15 days outside India.
                </li>
                <li>
                  Please do not accept the courier if the package is torn or not
                  in good condition.
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
              <p>We would suggest dry clean only.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionTab;
