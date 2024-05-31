// // @ts-nocheck

// "use client";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// export default function Navbar() {
//   const [CategoryProducts, setCategoryProducts] = useState<Product[]>([]);
//   const [OccassionProducts, setOccassionProducts] = useState<Product[]>([]);
//   const [isCategoryVisible, setIsCategoryVisible] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productRes = await fetch(`/api/website/product`);
//       const products = await productRes.json();

//       // Create a map to store unique categories
//       const categoryMap = new Map();
//       products.forEach((product) => {
//         const category = product.category;
//         if (!categoryMap.has(category.name)) {
//           categoryMap.set(category.name, product);
//         }
//       });

//       // Convert map values to an array
//       const uniqueCategory = Array.from(categoryMap.values());
//       setCategoryProducts(uniqueCategory);
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productRes = await fetch(`/api/website/product`);
//       const products = await productRes.json();

//       const uniqueOccasions = products.reduce((acc, curr) => {
//         if (!acc.some((item) => item.name === curr.occassion.name)) {
//           acc.push({
//             name: curr.occassion.name,
//             imageUrl: curr.occassion.imageUrl,
//             id: curr.occassion.id,
//           });
//         }
//         return acc;
//       }, []);
//       console.log({ uniqueOccasions });
//       setOccassionProducts(uniqueOccasions);
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <>
//       <div className=" w-screen bg-transparent container items-center px-8 py-4  grid grid-cols-12">
//         <div className="col-span-2">
//           <Link
//             href="/"
//             className="flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
//           >
//             <div className="text-2xl font-bold uppercase">SAARI WALI</div>
//           </Link>
//         </div>
//         <div className="col-span-8 flex w-full  relative ">
//           <div className="cursor-pointer py-2 text-[14px] group/speciality">
//             <div className="flex justify-center bg-white px-1 z-10 container">
//               <div className="text-xl font-bold duration-300 h-full flex items-center justify-center">
//                 Shop by Speciality
//               </div>
//             </div>

//             <div className="duration-500 fade-in-0 absolute z-50 top-full left-0 w-full bg-white py-1 px-4 text-gray-800 shadow-xl hidden group-hover/speciality:block">
//               <div className="flex  w-full ">
//                 <div className=" grid grid-cols-4 gap-8 gap-y-8">
//                   <div
//                     className="  relative"
//                     onMouseEnter={() => setIsCategoryVisible(true)}
//                     onMouseLeave={() => {
//                       setIsCategoryVisible(false);
//                       setActiveCategory(null);
//                     }}
//                   >
//                     <div className=" w-screen ">Category</div>
//                     {/* <div className="uppercase font-bold pb-2 ">Category</div> */}
//                     {isCategoryVisible && (
//                       <ul className="group-hover/category:flex hidden w-screen ">
//                         {CategoryProducts.map((slide, index) => (
//                           <div className="h-full m-8" key={index}>
//                             <Link href={`/category/${slide.categoryId}`}>
//                               <div
//                                 className="hover:scale-110 z-50 duration-700 group "
//                                 key={index}
//                               >
//                                 <div className=" rounded-full w-32 h-32  relative -top-5 ">
//                                   <img
//                                     src={slide?.category?.imageUrl}
//                                     alt={slide?.category?.name}
//                                     className="w-full h-full overflow-hidden object-cover  rounded-full"
//                                   />
//                                 </div>
//                                 <div className=" text-lg">
//                                   {slide?.category?.name}
//                                 </div>
//                               </div>
//                             </Link>
//                           </div>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                   <div className="group/occassion w-screen  ">
//                     <div className="uppercase font-bold pb-2 ">Occassion</div>
//                     <ul className="group-hover/occassion:flex hidden w-screen mx-auto ">
//                       {OccassionProducts.map((occassion, index) => {
//                         return (
//                           <div className="h-full m-8 group" key={index}>
//                             <Link href={`/occassion/${occassion.id}`}>
//                               <div
//                                 className="hover:scale-110 z-50 duration-700  "
//                                 key={index}
//                               >
//                                 <div className=" rounded-full w-32 h-32  relative -top-5  ">
//                                   <img
//                                     src={occassion.imageUrl}
//                                     alt={occassion.name}
//                                     className="w-full h-full overflow-hidden object-cover  rounded-full "
//                                   />
//                                 </div>
//                                 <div className=" text-lg">{occassion.name}</div>
//                               </div>
//                             </Link>
//                           </div>
//                         );
//                       })}
//                     </ul>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-span-2"></div>
//       </div>
//     </>
//   );
// }

// @ts-nocheck

"use client";

import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [CategoryProducts, setCategoryProducts] = useState([]);
  const [OccassionProducts, setOccassionProducts] = useState([]);
  const [isCategoryVisible, setIsCategoryVisible] = useState(true);
  const [isOccasionVisible, setIsOccasionVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productRes = await fetch(`/api/category`);
      // const productRes = await fetch(`/api/website/product`);
      const products = await productRes.json();
      setCategoryProducts(products);
      // Create a map to store unique categories
      // const categoryMap = new Map();
      // products.forEach((product) => {
      //   const category = product.category;
      //   if (!categoryMap.has(category.name)) {
      //     categoryMap.set(category.name, product);
      //   }
      // });

      // // Convert map values to an array
      // const uniqueCategory = Array.from(categoryMap.values());
      // setCategoryProducts(uniqueCategory);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productRes = await fetch(`/api/occassion`);
      // const productRes = await fetch(`/api/website/product`);
      const products = await productRes.json();
      setOccassionProducts(products);
      // const uniqueOccasions = products.reduce((acc, curr) => {
      //   if (!acc.some((item) => item.name === curr.occassion.name)) {
      //     acc.push({
      //       name: curr.occassion.name,
      //       imageUrl: curr.occassion.imageUrl,
      //       id: curr.occassion.id,
      //     });
      //   }
      //   return acc;
      // }, []);
      // console.log({ uniqueOccasions });
      // setOccassionProducts(uniqueOccasions);
    };
    fetchProducts();
  }, []);

  return (
    // <div className="fixed top-0 z-50 w-scree ">
    <div className="w-full bg-white container px-8 py-4  grid grid-cols-12 items-center  ">
      <div className="col-span-2">
        <Link href="/" className="flex items-center ">
          <div className="text-2xl font-bold uppercase">SAARI WALI</div>
        </Link>
      </div>
      <div className="col-span-8 w-full  relative group">
        <div className="cursor-pointer py-2 text-[14px]">
          <div className="flex  bg-white px-1 z-10 container">
            <div className="text-xl font-bold duration-300 h-full flex items-center justify-center">
              Shop by Speciality
            </div>
          </div>

          <div className="absolute z-50 top-full left-0 w-full bg-white py-1 px-4 text-gray-800 shadow-xl hidden group-hover:block">
            <div className="grid grid-cols-4 py-4">
              <div
                className={`flex flex-col  relative group/category `}
                onMouseEnter={() => {
                  setIsCategoryVisible(true);
                  setIsOccasionVisible(false);
                }}
              >
                <div className="uppercase text-lg font-bold pb-2">Category</div>
                <div
                  className={`duration-500 ${
                    isCategoryVisible
                      ? "w-1/2 border-b-2 border-b-black"
                      : "w-0  group-hover/category:w-1/2 rounded-full border-b-2 border-b-black"
                  } `}
                ></div>
              </div>
              <div
                className="  relative group/occasion"
                onMouseEnter={() => {
                  setIsOccasionVisible(true);
                  setIsCategoryVisible(false);
                }}
                // onMouseLeave={() => {
                //   setIsOccasionVisible(false);
                //   setIsCategoryVisible(true);
                // }}
              >
                <div className="uppercase text-lg font-bold pb-2">
                  Occassion
                </div>
                <div
                  className={` duration-500  ${
                    isOccasionVisible
                      ? "w-1/2 border-b-2 border-b-black"
                      : "w-0  group-hover/category:w-1/2 rounded-full border-b-2 border-b-black"
                  } `}
                ></div>
              </div>
            </div>
            <div className="relative h-full">
              <div>
                {isCategoryVisible && (
                  <div className="flex">
                    {CategoryProducts.map((slide, index) => (
                      <div className="h-full m-8 text-center" key={index}>
                        <Link href={`/category/${slide.id}`}>
                          {/* <Link href={`/category/${slide.categoryId}`}> */}
                          <div className="hover:scale-110 z-50 duration-700 group">
                            <div className="rounded-full w-32 h-32 relative -top-5">
                              <img
                                src={slide.imageUrl}
                                alt={slide.name}
                                // src={slide?.category?.imageUrl}
                                // alt={slide?.category?.name}
                                className="w-full h-full overflow-hidden object-cover rounded-full"
                              />
                            </div>
                            <div className="text-lg">
                              {slide.name}
                              {/* {slide?.category?.name} */}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {isOccasionVisible && (
                  <div className="flex">
                    {OccassionProducts.map((occasion, index) => (
                      <div className="h-full m-8 group text-center" key={index}>
                        <Link href={`/occassion/${occasion.id}`}>
                          <div className="hover:scale-110 z-50 duration-700">
                            <div className="rounded-full w-32 h-32 relative -top-5">
                              <img
                                src={occasion.imageUrl}
                                alt={occasion.name}
                                className="w-full h-full overflow-hidden object-cover rounded-full"
                              />
                            </div>
                            <div className="text-lg">{occasion.name}</div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 justify-center flex gap-8 items-center">
        <div>
          <Search />
        </div>
        <div>
          <User />
        </div>
        <div className=" flex justify-center items-center">
          <Link href={"/wishlist"}>
            <div className="relative py-2">
              <div className="-top-[1px] absolute left-3">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-pink-500 p-2 text-sm text-white">
                  0
                </p>
              </div>
              <Heart />
            </div>
          </Link>
        </div>

        <div className=" flex justify-center items-center">
          <Link href={"/cart"}>
            <div className="relative py-2">
              <div className="-top-[1px] absolute left-3">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-pink-500 p-2 text-sm text-white">
                  0
                </p>
              </div>
              <ShoppingCart />
            </div>
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
}

const header = () => {
  <div id="header" className="relative w-full hidden">
    <div className="header-menu style-one absolute top-0 left-0 right-0 w-full md:h-[74px] h-[56px] bg-transparent">
      <div className="container mx-auto h-full">
        <div className="header-main flex justify-between h-full">
          <div className="menu-mobile-icon lg:hidden flex items-center">
            <i className="icon-category text-2xl" />
          </div>
          <div className="left flex items-center gap-16">
            <Link
              href="/"
              className="flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
            >
              <div className="heading4 uppercase">SAARI WALI</div>
            </Link>
            <div className="menu-main h-full max-lg:hidden">
              <ul className="flex items-center gap-8 h-full">
                <li className="h-full group/special1">
                  <div
                    href=""
                    className=" text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Shop by Speciality
                  </div>
                  <div className="group-hover/special1:flex hidden absolute top-[74px] left-0 bg-white w-screen">
                    <div className="container">
                      <div className="flex justify-between py-8">
                        <div className="nav-link basis-2/3 grid grid-cols-4 gap-8 gap-y-8">
                          <div className="nav-item group w-screen">
                            {/* <div className="text-button-uppercase pb-2 ">
                                  
                                </div> */}
                            <div
                              className="col-span-8 w-full  relative"
                              onMouseEnter={() => setIsCategoryVisible(true)}
                              onMouseLeave={() => {
                                setIsCategoryVisible(false);
                                setActiveCategory(null);
                              }}
                            >
                              Category
                            </div>
                            <ul className="group-hover:flex hidden w-screen">
                              {CategoryProducts.map((slide, index) => (
                                <div className="h-full m-8" key={index}>
                                  <Link href={`/category/${slide.categoryId}`}>
                                    <div
                                      className="hover:scale-110 z-50 duration-700 group "
                                      key={index}
                                    >
                                      {/* <div
                                          className="rounded-full w-5 h-5 top-1 left-1 relative"
                                          style={{ backgroundColor: "#C2915E" }}
                                        ></div> */}
                                      <div className=" rounded-full w-32 h-32  relative -top-5 ">
                                        <img
                                          src={slide?.category?.imageUrl}
                                          alt={slide?.category?.name}
                                          className="w-full h-full overflow-hidden object-cover  rounded-full"
                                        />

                                        {/* <Image src={slide.imgSrc} alt={slide.altText} fill/> */}
                                      </div>
                                      <div className=" text-lg">
                                        {slide?.category?.name}
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </ul>
                          </div>
                          <div className="nav-item group w-screen  ">
                            <div className="text-button-uppercase pb-2 ">
                              Occassion
                            </div>
                            <ul className="group-hover:flex hidden w-screen mx-auto ">
                              {OccassionProducts.map((occassion, index) => {
                                return (
                                  <div className="h-full m-8 group" key={index}>
                                    <Link href={`/occassion/${occassion.id}`}>
                                      <div
                                        className="hover:scale-110 z-50 duration-700  "
                                        key={index}
                                      >
                                        {/* <div
                                          className="rounded-full w-5 h-5 top-1 left-1 relative"
                                          style={{ backgroundColor: "#C2915E" }}
                                        ></div> */}
                                        <div className=" rounded-full w-32 h-32  relative -top-5  ">
                                          <img
                                            src={occassion.imageUrl}
                                            alt={occassion.name}
                                            className="w-full h-full overflow-hidden object-cover  rounded-full "
                                          />

                                          {/* <Image src={slide.imgSrc} alt={slide.altText} fill/> */}
                                        </div>
                                        <div className=" text-lg">
                                          {occassion.name}
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Menu Mobile */}
    <div id="menu-mobile" className="">
      <div className="menu-container bg-white h-full">
        <div className="container h-full">
          <div className="menu-main h-full overflow-hidden">
            <div className="heading py-2 relative flex items-center justify-center">
              <div className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center">
                <i className="ph ph-x text-sm" />
              </div>
              <Link
                href="index.htm"
                className="logo text-3xl font-semibold text-center"
              >
                Anvogue
              </Link>
            </div>
            <div className="form-search relative mt-2">
              <i className="ph ph-magnifying-glass text-xl absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className=" h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4"
              />
            </div>
            <div className="list-nav mt-6">
              <ul>
                <li>
                  <Link
                    href="#!"
                    className="text-xl font-semibold flex items-center justify-between"
                  >
                    Demo
                    <span className="text-right">
                      <i className="ph ph-caret-right text-xl" />
                    </span>
                  </Link>
                  <div className="sub-nav-mobile">
                    <div className="back-btn flex items-center gap-3">
                      <i className="ph ph-caret-left text-xl" />
                      Back
                    </div>
                    <div className="list-nav-item w-full grid grid-cols-2 pt-2 pb-6">
                      <ul>
                        <li>
                          <Link
                            href="index.html"
                            className="nav-item-mobile link text-secondary duration-300 active"
                          >
                            Home Fashion 1
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="fashion2.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Fashion 2
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="fashion3.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Fashion 3
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="fashion4.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Fashion 4
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="fashion5.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Fashion 5
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="fashion6.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Fashion 6
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="fashion7.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Fashion 7
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="fashion8.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Fashion 8
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="fashion9.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Fashion 9
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="fashion10.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Fashion 10
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="fashion11.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Fashion 11
                          </Link>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <Link
                            href="underwear.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Underwear
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="cosmetic1.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Cosmetic 1
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="cosmetic2.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Cosmetic 2
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="cosmetic3.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Cosmetic 3
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="pet.html"
                            className="nav-item-mobile link text-secondary duration-300"
                          >
                            Home Pet Store
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="jewelry.html"
                            className="nav-item-mobile link text-secondary duration-300"
                          >
                            Home Jewelry
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="furniture.html"
                            className="nav-item-mobile link text-secondary
                                                  duration-300"
                          >
                            Home Furniture
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="watch.html"
                            className="nav-item-mobile link text-secondary duration-300"
                          >
                            Home Watch
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="toys.html"
                            className="nav-item-mobile link text-secondary duration-300"
                          >
                            Home Toys Kid
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="yoga.html"
                            className="nav-item-mobile link text-secondary duration-300"
                          >
                            Home Yoga
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="organic.html"
                            className="nav-item-mobile link text-secondary duration-300"
                          >
                            Home Organic
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="marketplace.html"
                            className="nav-item-mobile link text-secondary duration-300"
                          >
                            Home Marketplace
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="#!"
                    className="text-xl font-semibold flex items-center justify-between mt-5"
                  >
                    Features
                    <span className="text-right">
                      <i className="ph ph-caret-right text-xl" />
                    </span>
                  </Link>
                  <div className="sub-nav-mobile">
                    <div className="back-btn flex items-center gap-3">
                      <i className="ph ph-caret-left text-xl" />
                      Back
                    </div>
                    <div className="list-nav-item w-full pt-2 pb-6">
                      <div className="nav-link grid grid-cols-2 gap-5 gap-y-6">
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            For Men
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Starting From 50% Off
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Outerwear | Coats
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Sweaters | Cardigans
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Shirt | Sweatshirts
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 view-all-btn"
                              >
                                View All
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            Skincare
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Faces Skin
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Eyes Makeup
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Lip Polish
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Hair Care
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 view-all-btn"
                              >
                                View All
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            Health
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Cented Candle
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Health Drinks
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Yoga Clothes
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Yoga Equipment
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 view-all-btn"
                              >
                                View All
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            For Women
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Starting From 60% Off
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Dresses | Jumpsuits
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                T-shirts | Sweatshirts
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Accessories | Jewelry
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 view-all-btn"
                              >
                                View All
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            For Kid
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Kids Bed
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Boys Toy
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Baby Blanket
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Newborn Clothing
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 view-all-btn"
                              >
                                View All
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            For Home
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Furniture | Decor
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Table | Living Room
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Chair | Work Room
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Lighting | Bed Room
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300 view-all-btn"
                              >
                                View All
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="#!"
                    className="text-xl font-semibold flex items-center justify-between mt-5"
                  >
                    Shop
                    <span className="text-right">
                      <i className="ph ph-caret-right text-xl" />
                    </span>
                  </Link>
                  <div className="sub-nav-mobile">
                    <div className="back-btn flex items-center gap-3">
                      <i className="ph ph-caret-left text-xl" />
                      Back
                    </div>
                    <div className="list-nav-item w-full pt-2 pb-6">
                      <div className="nav-link grid grid-cols-2 gap-5 gap-y-6 justify-between">
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            Shop Features
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="shop-breadcrumb-img.html"
                                className="link text-secondary duration-300"
                              >
                                Shop Breadcrumb IMG
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb1.html"
                                className="link text-secondary duration-300"
                              >
                                Shop Breadcrumb 1
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-breadcrumb2.html"
                                className="link text-secondary duration-300"
                              >
                                Shop Breadcrumb 2
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-collection.html"
                                className="link text-secondary duration-300"
                              >
                                Shop Collection
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            Shop Features
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="shop-filter-canvas.html"
                                className="link text-secondary duration-300"
                              >
                                Shop Filter Canvas
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-filter-options.html"
                                className="link text-secondary duration-300"
                              >
                                Shop Filter Options
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-filter-dropdown.html"
                                className="link text-secondary duration-300"
                              >
                                Shop Filter Dropdown
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-sidebar-list.html"
                                className="link text-secondary duration-300"
                              >
                                Shop Sidebar List
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            Shop Layout
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="shop-default.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Shop Default
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-default-grid.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Shop Default Grid
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-default-list.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Shop Default List
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-fullwidth.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Shop Full Width
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="shop-square.html"
                                className="link text-secondary duration-300"
                              >
                                Shop Square
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            Products Pages
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="wishlist.html"
                                className="link text-secondary duration-300"
                              >
                                Wish List
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="search-result.html"
                                className="link text-secondary duration-300"
                              >
                                Search Result
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="cart.html"
                                className="link text-secondary duration-300"
                              >
                                Shopping Cart
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="login.html"
                                className="link text-secondary duration-300"
                              >
                                Login/Register
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="forgot-password.html"
                                className="link text-secondary duration-300"
                              >
                                Forgot Password
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="order-tracking.html"
                                className="link text-secondary duration-300"
                              >
                                Order Tracking
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="my-account.html"
                                className="link text-secondary duration-300"
                              >
                                My Account
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="#!"
                    className="text-xl font-semibold flex items-center justify-between mt-5"
                  >
                    Product
                    <span className="text-right">
                      <i className="ph ph-caret-right text-xl" />
                    </span>
                  </Link>
                  <div className="sub-nav-mobile">
                    <div className="back-btn flex items-center gap-3">
                      <i className="ph ph-caret-left text-xl" />
                      Back
                    </div>
                    <div className="list-nav-item w-full pt-2 pb-6">
                      <div className="nav-link grid grid-cols-2 gap-5 gap-y-6 justify-between">
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            Products Features
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="product-default.html"
                                className="link text-secondary duration-300"
                              >
                                Products Defaults
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-sale.html"
                                className="link text-secondary duration-300"
                              >
                                Products Sale
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-countdown-timer.html"
                                className="link text-secondary duration-300"
                              >
                                Products Countdown Timer
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-grouped.html"
                                className="link text-secondary duration-300"
                              >
                                Products Grouped
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-bought-together.html"
                                className="link text-secondary duration-300"
                              >
                                Frequently Bought Together
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-out-of-stock.html"
                                className="link text-secondary duration-300"
                              >
                                Products Out Of Stock
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-variable.html"
                                className="link text-secondary duration-300"
                              >
                                Products Variable
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            Products Features
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="product-external.html"
                                className="link text-secondary duration-300"
                              >
                                Products External
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-on-sale.html"
                                className="link text-secondary duration-300"
                              >
                                Products On Sale
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-discount.html"
                                className="link text-secondary duration-300"
                              >
                                Products With Discount
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-sidebar.html"
                                className="link text-secondary duration-300"
                              >
                                Products With Sidebar
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-fixed-price.html"
                                className="link text-secondary duration-300"
                              >
                                Products Fixed Price
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="nav-item">
                          <div className="text-button-uppercase pb-1">
                            Products Layout
                          </div>
                          <ul>
                            <li>
                              <Link
                                href="product-thumbnail-left.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Products Thumbnails Left
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-thumbnail-bottom.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Products Thumbnails Bottom
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-one-scrolling.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Products Grid 1 Scrolling
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-two-scrolling.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Products Grid 2 Scrolling
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-combined-one.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Products Combined 1
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="product-combined-two.html"
                                className="link text-secondary duration-300 cursor-pointer"
                              >
                                Products Combined 2
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="#!"
                    className="text-xl font-semibold flex items-center justify-between mt-5"
                  >
                    Blog
                    <span className="text-right">
                      <i className="ph ph-caret-right text-xl" />
                    </span>
                  </Link>
                  <div className="sub-nav-mobile">
                    <div className="back-btn flex items-center gap-3">
                      <i className="ph ph-caret-left text-xl" />
                      Back
                    </div>
                    <div className="list-nav-item w-full pt-2 pb-6">
                      <ul className="w-full">
                        <li>
                          <Link
                            href="blog-default.html"
                            className="link text-secondary duration-300"
                          >
                            Blog Default
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="blog-list.html"
                            className="link text-secondary duration-300"
                          >
                            Blog List
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="blog-grid.html"
                            className="link text-secondary duration-300"
                          >
                            Blog Grid
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="blog-detail1.html"
                            className="link text-secondary duration-300"
                          >
                            Blog Detail 1
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="blog-detail2.html"
                            className="link text-secondary duration-300"
                          >
                            Blog Detail 2
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="#!"
                    className="text-xl font-semibold flex items-center justify-between mt-5"
                  >
                    Pages
                    <span className="text-right">
                      <i className="ph ph-caret-right text-xl" />
                    </span>
                  </Link>
                  <div className="sub-nav-mobile">
                    <div className="back-btn flex items-center gap-3">
                      <i className="ph ph-caret-left text-xl" />
                      Back
                    </div>
                    <div className="list-nav-item w-full pt-2 pb-6">
                      <ul className="w-full">
                        <li>
                          <Link
                            href={"/Aboutus"}
                            // className="link text-secondary duration-300"
                          >
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="contact.html"
                            className="link text-secondary duration-300"
                          >
                            Contact Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="store-list.html"
                            className="link text-secondary duration-300"
                          >
                            Store List
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="page-not-found.html"
                            className="link text-secondary duration-300"
                          >
                            404
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="faqs.html"
                            className="link text-secondary duration-300"
                          >
                            FAQs
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="coming-soon.html"
                            className="link text-secondary duration-300"
                          >
                            Coming Soon
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="customer-feedbacks.html"
                            className="link text-secondary duration-300"
                          >
                            Customer Feedbacks
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-search-block">
      <div className="modal-search-main md:p-10 p-6 rounded-[32px]">
        <div className="form-search relative w-full">
          <i className="ph ph-magnifying-glass absolute heading5 right-6 top-1/2 -translate-y-1/2 cursor-pointer" />
          <input
            type="text"
            placeholder="Searching..."
            className="text-button-lg h-14 rounded-2xl border border-line w-full pl-6 pr-12"
          />
        </div>
      </div>
    </div>
  </div>;
};
