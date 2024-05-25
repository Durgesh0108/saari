// @ts-nocheck

"use client";

// import React from 'react'

// export default function navbar() {
//   return (
// 	<div>navbar</div>
//   )
// }

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [CategoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [OccassionProducts, setOccassionProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productRes = await fetch(`/api/website/product`);
      const products = await productRes.json();

      // Create a map to store unique categories
      const categoryMap = new Map();
      products.forEach((product) => {
        const category = product.category;
        if (!categoryMap.has(category.name)) {
          categoryMap.set(category.name, product);
        }
      });

      // Convert map values to an array
      const uniqueCategory = Array.from(categoryMap.values());
      setCategoryProducts(uniqueCategory);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productRes = await fetch(`/api/website/product`);
      const products = await productRes.json();

      const uniqueOccasions = products.reduce((acc, curr) => {
        if (!acc.some((item) => item.name === curr.occassion.name)) {
          acc.push({
            name: curr.occassion.name,
            imageUrl: curr.occassion.imageUrl,
          });
        }
        return acc;
      }, []);
      setOccassionProducts(uniqueOccasions);
    };
    fetchProducts();
  }, []);

  return (
    <div id="header" className="relative w-full">
      <div className="header-menu style-one absolute top-0 left-0 right-0 w-full md:h-[74px] h-[56px] bg-transparent">
        <div className="container mx-auto h-full">
          <div className="header-main flex justify-between h-full">
            <div className="menu-mobile-icon lg:hidden flex items-center">
              <i className="icon-category text-2xl" />
            </div>
            <div className="left flex items-center gap-16">
              <a
                href="index.htm"
                className="flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
              >
                <div className="heading4 uppercase">SAARI WALI</div>
              </a>
              <div className="menu-main h-full max-lg:hidden">
                <ul className="flex items-center gap-8 h-full">
                  <li className="h-full">
                    <a
                      href="#!"
                      className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                    >
                      Shop by Speciality
                    </a>
                    <div className="mega-menu absolute top-[74px] left-0 bg-white w-screen">
                      <div className="container">
                        <div className="flex justify-between py-8">
                          <div className="nav-link basis-2/3 grid grid-cols-4 gap-8 gap-y-8">
                            <div className="nav-item group w-screen">
                              <div className="text-button-uppercase pb-2 ">
                                Category
                              </div>
                              <ul className="group-hover:flex hidden w-screen">
                                {CategoryProducts.map((slide, index) => (
                                  <div className="h-full m-8" key={index}>
                                    <Link
                                      href={`/category/${slide.categoryId}`}
                                    >
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
                                    <div
                                      className="h-full m-8 group"
                                      key={index}
                                    >
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
                  {/* <li className="h-full">
                    <a
                      href="#!"
                      className="text-button-uppercase duration-300 h-full flex items-center justify-center"
                    >
                      Features
                    </a>
                    <div className="mega-menu absolute top-[74px] left-0 bg-white w-screen">
                      <div className="container">
                        <div className="flex justify-between py-8">
                          <div className="nav-link basis-2/3 grid grid-cols-4 gap-y-8">
                            <div className="nav-item">
                              <div className="text-button-uppercase pb-2">
                                For Men
                              </div>
                              <ul>
                                <li>
                                  <a
                                    href="shop-breadcrumb1.html"
                                    className="link text-secondary duration-300 cursor-pointer"
                                  >
                                    Starting From 50% Off
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-breadcrumb1.html"
                                    className="link text-secondary duration-300 cursor-pointer"
                                  >
                                    Outerwear | Coats
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-breadcrumb1.html"
                                    className="link text-secondary duration-300 cursor-pointer"
                                  >
                                    Sweaters | Cardigans
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-breadcrumb1.html"
                                    className="link text-secondary duration-300 cursor-pointer"
                                  >
                                    Shirt | Sweatshirts
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-breadcrumb1.html"
                                    className="link text-secondary duration-300 cursor-pointer view-all-btn"
                                  >
                                    View All
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="right flex gap-12">
              <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                <i className="ph-bold ph-magnifying-glass text-2xl" />
                <div className="line absolute bg-line w-px h-6 -right-6" />
              </div>
              <div className="list-action flex items-center gap-4">
                <div className="user-icon flex items-center justify-center cursor-pointer">
                  <i className="ph-bold ph-user text-2xl" />
                  <div className="login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-small">
                    <a
                      href="login.html"
                      className="button-main w-full text-center"
                    >
                      Login
                    </a>
                    <div className="text-secondary text-center mt-3 pb-4">
                      Don’t have an account?
                      <a
                        href="register.html"
                        className="text-black pl-1 hover:underline"
                      >
                        Register
                      </a>
                    </div>
                    <div className="bottom pt-4 border-t border-line" />
                    <a href="#!" className="body1 hover:underline">
                      Support
                    </a>
                  </div>
                </div>
                <div className="max-md:hidden wishlist-icon flex items-center relative cursor-pointer">
                  <i className="ph-bold ph-heart text-2xl" />
                  <span className="quantity wishlist-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                    0
                  </span>
                </div>
                <div className="max-md:hidden cart-icon flex items-center relative cursor-pointer">
                  <i className="ph-bold ph-handbag text-2xl" />
                  <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                    0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Menu Mobile */}
      {/* <div id="menu-mobile" className="">
				<div className="menu-container bg-white h-full">
					<div className="container h-full">
						<div className="menu-main h-full overflow-hidden">
							<div className="heading py-2 relative flex items-center justify-center">
								<div className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center">
									<i className="ph ph-x text-sm" />
								</div>
								<a
									href="index.htm"
									className="logo text-3xl font-semibold text-center"
								>
									Anvogue
								</a>
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
										<a
											href="#!"
											className="text-xl font-semibold flex items-center justify-between"
										>
											Demo
											<span className="text-right">
												<i className="ph ph-caret-right text-xl" />
											</span>
										</a>
										<div className="sub-nav-mobile">
											<div className="back-btn flex items-center gap-3">
												<i className="ph ph-caret-left text-xl" />
												Back
											</div>
											<div className="list-nav-item w-full grid grid-cols-2 pt-2 pb-6">
												<ul>
													<li>
														<a
															href="index.html"
															className="nav-item-mobile link text-secondary duration-300 active"
														>
															Home Fashion 1
														</a>
													</li>
													<li>
														<a
															href="fashion2.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Fashion 2
														</a>
													</li>
													<li>
														<a
															href="fashion3.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Fashion 3
														</a>
													</li>
													<li>
														<a
															href="fashion4.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Fashion 4
														</a>
													</li>
													<li>
														<a
															href="fashion5.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Fashion 5
														</a>
													</li>
													<li>
														<a
															href="fashion6.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Fashion 6
														</a>
													</li>
													<li>
														<a
															href="fashion7.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Fashion 7
														</a>
													</li>
													<li>
														<a
															href="fashion8.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Fashion 8
														</a>
													</li>
													<li>
														<a
															href="fashion9.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Fashion 9
														</a>
													</li>
													<li>
														<a
															href="fashion10.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Fashion 10
														</a>
													</li>
													<li>
														<a
															href="fashion11.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Fashion 11
														</a>
													</li>
												</ul>
												<ul>
													<li>
														<a
															href="underwear.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Underwear
														</a>
													</li>
													<li>
														<a
															href="cosmetic1.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Cosmetic 1
														</a>
													</li>
													<li>
														<a
															href="cosmetic2.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Cosmetic 2
														</a>
													</li>
													<li>
														<a
															href="cosmetic3.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Cosmetic 3
														</a>
													</li>
													<li>
														<a
															href="pet.html"
															className="nav-item-mobile link text-secondary duration-300"
														>
															Home Pet Store
														</a>
													</li>
													<li>
														<a
															href="jewelry.html"
															className="nav-item-mobile link text-secondary duration-300"
														>
															Home Jewelry
														</a>
													</li>
													<li>
														<a
															href="furniture.html"
															className="nav-item-mobile link text-secondary
                                                  duration-300"
														>
															Home Furniture
														</a>
													</li>
													<li>
														<a
															href="watch.html"
															className="nav-item-mobile link text-secondary duration-300"
														>
															Home Watch
														</a>
													</li>
													<li>
														<a
															href="toys.html"
															className="nav-item-mobile link text-secondary duration-300"
														>
															Home Toys Kid
														</a>
													</li>
													<li>
														<a
															href="yoga.html"
															className="nav-item-mobile link text-secondary duration-300"
														>
															Home Yoga
														</a>
													</li>
													<li>
														<a
															href="organic.html"
															className="nav-item-mobile link text-secondary duration-300"
														>
															Home Organic
														</a>
													</li>
													<li>
														<a
															href="marketplace.html"
															className="nav-item-mobile link text-secondary duration-300"
														>
															Home Marketplace
														</a>
													</li>
												</ul>
											</div>
										</div>
									</li>
									<li>
										<a
											href="#!"
											className="text-xl font-semibold flex items-center justify-between mt-5"
										>
											Features
											<span className="text-right">
												<i className="ph ph-caret-right text-xl" />
											</span>
										</a>
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
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Starting
																	From 50% Off
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Outerwear |
																	Coats
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Sweaters |
																	Cardigans
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Shirt |
																	Sweatshirts
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 view-all-btn"
																>
																	View All
																</a>
															</li>
														</ul>
													</div>
													<div className="nav-item">
														<div className="text-button-uppercase pb-1">
															Skincare
														</div>
														<ul>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Faces Skin
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Eyes Makeup
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Lip Polish
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Hair Care
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 view-all-btn"
																>
																	View All
																</a>
															</li>
														</ul>
													</div>
													<div className="nav-item">
														<div className="text-button-uppercase pb-1">
															Health
														</div>
														<ul>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Cented
																	Candle
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Health
																	Drinks
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Yoga Clothes
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Yoga
																	Equipment
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 view-all-btn"
																>
																	View All
																</a>
															</li>
														</ul>
													</div>
													<div className="nav-item">
														<div className="text-button-uppercase pb-1">
															For Women
														</div>
														<ul>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Starting
																	From 60% Off
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Dresses |
																	Jumpsuits
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	T-shirts |
																	Sweatshirts
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Accessories
																	| Jewelry
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 view-all-btn"
																>
																	View All
																</a>
															</li>
														</ul>
													</div>
													<div className="nav-item">
														<div className="text-button-uppercase pb-1">
															For Kid
														</div>
														<ul>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Kids Bed
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Boys Toy
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Baby Blanket
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Newborn
																	Clothing
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 view-all-btn"
																>
																	View All
																</a>
															</li>
														</ul>
													</div>
													<div className="nav-item">
														<div className="text-button-uppercase pb-1">
															For Home
														</div>
														<ul>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Furniture |
																	Decor
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Table |
																	Living Room
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Chair | Work
																	Room
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Lighting |
																	Bed Room
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300 view-all-btn"
																>
																	View All
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</li>
									<li>
										<a
											href="#!"
											className="text-xl font-semibold flex items-center justify-between mt-5"
										>
											Shop
											<span className="text-right">
												<i className="ph ph-caret-right text-xl" />
											</span>
										</a>
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
																<a
																	href="shop-breadcrumb-img.html"
																	className="link text-secondary duration-300"
																>
																	Shop
																	Breadcrumb
																	IMG
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb1.html"
																	className="link text-secondary duration-300"
																>
																	Shop
																	Breadcrumb 1
																</a>
															</li>
															<li>
																<a
																	href="shop-breadcrumb2.html"
																	className="link text-secondary duration-300"
																>
																	Shop
																	Breadcrumb 2
																</a>
															</li>
															<li>
																<a
																	href="shop-collection.html"
																	className="link text-secondary duration-300"
																>
																	Shop
																	Collection
																</a>
															</li>
														</ul>
													</div>
													<div className="nav-item">
														<div className="text-button-uppercase pb-1">
															Shop Features
														</div>
														<ul>
															<li>
																<a
																	href="shop-filter-canvas.html"
																	className="link text-secondary duration-300"
																>
																	Shop Filter
																	Canvas
																</a>
															</li>
															<li>
																<a
																	href="shop-filter-options.html"
																	className="link text-secondary duration-300"
																>
																	Shop Filter
																	Options
																</a>
															</li>
															<li>
																<a
																	href="shop-filter-dropdown.html"
																	className="link text-secondary duration-300"
																>
																	Shop Filter
																	Dropdown
																</a>
															</li>
															<li>
																<a
																	href="shop-sidebar-list.html"
																	className="link text-secondary duration-300"
																>
																	Shop Sidebar
																	List
																</a>
															</li>
														</ul>
													</div>
													<div className="nav-item">
														<div className="text-button-uppercase pb-1">
															Shop Layout
														</div>
														<ul>
															<li>
																<a
																	href="shop-default.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Shop Default
																</a>
															</li>
															<li>
																<a
																	href="shop-default-grid.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Shop Default
																	Grid
																</a>
															</li>
															<li>
																<a
																	href="shop-default-list.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Shop Default
																	List
																</a>
															</li>
															<li>
																<a
																	href="shop-fullwidth.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Shop Full
																	Width
																</a>
															</li>
															<li>
																<a
																	href="shop-square.html"
																	className="link text-secondary duration-300"
																>
																	Shop Square
																</a>
															</li>
														</ul>
													</div>
													<div className="nav-item">
														<div className="text-button-uppercase pb-1">
															Products Pages
														</div>
														<ul>
															<li>
																<a
																	href="wishlist.html"
																	className="link text-secondary duration-300"
																>
																	Wish List
																</a>
															</li>
															<li>
																<a
																	href="search-result.html"
																	className="link text-secondary duration-300"
																>
																	Search
																	Result
																</a>
															</li>
															<li>
																<a
																	href="cart.html"
																	className="link text-secondary duration-300"
																>
																	Shopping
																	Cart
																</a>
															</li>
															<li>
																<a
																	href="login.html"
																	className="link text-secondary duration-300"
																>
																	Login/Register
																</a>
															</li>
															<li>
																<a
																	href="forgot-password.html"
																	className="link text-secondary duration-300"
																>
																	Forgot
																	Password
																</a>
															</li>
															<li>
																<a
																	href="order-tracking.html"
																	className="link text-secondary duration-300"
																>
																	Order
																	Tracking
																</a>
															</li>
															<li>
																<a
																	href="my-account.html"
																	className="link text-secondary duration-300"
																>
																	My Account
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</li>
									<li>
										<a
											href="#!"
											className="text-xl font-semibold flex items-center justify-between mt-5"
										>
											Product
											<span className="text-right">
												<i className="ph ph-caret-right text-xl" />
											</span>
										</a>
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
																<a
																	href="product-default.html"
																	className="link text-secondary duration-300"
																>
																	Products
																	Defaults
																</a>
															</li>
															<li>
																<a
																	href="product-sale.html"
																	className="link text-secondary duration-300"
																>
																	Products
																	Sale
																</a>
															</li>
															<li>
																<a
																	href="product-countdown-timer.html"
																	className="link text-secondary duration-300"
																>
																	Products
																	Countdown
																	Timer
																</a>
															</li>
															<li>
																<a
																	href="product-grouped.html"
																	className="link text-secondary duration-300"
																>
																	Products
																	Grouped
																</a>
															</li>
															<li>
																<a
																	href="product-bought-together.html"
																	className="link text-secondary duration-300"
																>
																	Frequently
																	Bought
																	Together
																</a>
															</li>
															<li>
																<a
																	href="product-out-of-stock.html"
																	className="link text-secondary duration-300"
																>
																	Products Out
																	Of Stock
																</a>
															</li>
															<li>
																<a
																	href="product-variable.html"
																	className="link text-secondary duration-300"
																>
																	Products
																	Variable
																</a>
															</li>
														</ul>
													</div>
													<div className="nav-item">
														<div className="text-button-uppercase pb-1">
															Products Features
														</div>
														<ul>
															<li>
																<a
																	href="product-external.html"
																	className="link text-secondary duration-300"
																>
																	Products
																	External
																</a>
															</li>
															<li>
																<a
																	href="product-on-sale.html"
																	className="link text-secondary duration-300"
																>
																	Products On
																	Sale
																</a>
															</li>
															<li>
																<a
																	href="product-discount.html"
																	className="link text-secondary duration-300"
																>
																	Products
																	With
																	Discount
																</a>
															</li>
															<li>
																<a
																	href="product-sidebar.html"
																	className="link text-secondary duration-300"
																>
																	Products
																	With Sidebar
																</a>
															</li>
															<li>
																<a
																	href="product-fixed-price.html"
																	className="link text-secondary duration-300"
																>
																	Products
																	Fixed Price
																</a>
															</li>
														</ul>
													</div>
													<div className="nav-item">
														<div className="text-button-uppercase pb-1">
															Products Layout
														</div>
														<ul>
															<li>
																<a
																	href="product-thumbnail-left.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Products
																	Thumbnails
																	Left
																</a>
															</li>
															<li>
																<a
																	href="product-thumbnail-bottom.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Products
																	Thumbnails
																	Bottom
																</a>
															</li>
															<li>
																<a
																	href="product-one-scrolling.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Products
																	Grid 1
																	Scrolling
																</a>
															</li>
															<li>
																<a
																	href="product-two-scrolling.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Products
																	Grid 2
																	Scrolling
																</a>
															</li>
															<li>
																<a
																	href="product-combined-one.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Products
																	Combined 1
																</a>
															</li>
															<li>
																<a
																	href="product-combined-two.html"
																	className="link text-secondary duration-300 cursor-pointer"
																>
																	Products
																	Combined 2
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</li>
									<li>
										<a
											href="#!"
											className="text-xl font-semibold flex items-center justify-between mt-5"
										>
											Blog
											<span className="text-right">
												<i className="ph ph-caret-right text-xl" />
											</span>
										</a>
										<div className="sub-nav-mobile">
											<div className="back-btn flex items-center gap-3">
												<i className="ph ph-caret-left text-xl" />
												Back
											</div>
											<div className="list-nav-item w-full pt-2 pb-6">
												<ul className="w-full">
													<li>
														<a
															href="blog-default.html"
															className="link text-secondary duration-300"
														>
															Blog Default
														</a>
													</li>
													<li>
														<a
															href="blog-list.html"
															className="link text-secondary duration-300"
														>
															Blog List
														</a>
													</li>
													<li>
														<a
															href="blog-grid.html"
															className="link text-secondary duration-300"
														>
															Blog Grid
														</a>
													</li>
													<li>
														<a
															href="blog-detail1.html"
															className="link text-secondary duration-300"
														>
															Blog Detail 1
														</a>
													</li>
													<li>
														<a
															href="blog-detail2.html"
															className="link text-secondary duration-300"
														>
															Blog Detail 2
														</a>
													</li>
												</ul>
											</div>
										</div>
									</li>
									<li>
										<a
											href="#!"
											className="text-xl font-semibold flex items-center justify-between mt-5"
										>
											Pages
											<span className="text-right">
												<i className="ph ph-caret-right text-xl" />
											</span>
										</a>
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
														<a
															href="contact.html"
															className="link text-secondary duration-300"
														>
															Contact Us
														</a>
													</li>
													<li>
														<a
															href="store-list.html"
															className="link text-secondary duration-300"
														>
															Store List
														</a>
													</li>
													<li>
														<a
															href="page-not-found.html"
															className="link text-secondary duration-300"
														>
															404
														</a>
													</li>
													<li>
														<a
															href="faqs.html"
															className="link text-secondary duration-300"
														>
															FAQs
														</a>
													</li>
													<li>
														<a
															href="coming-soon.html"
															className="link text-secondary duration-300"
														>
															Coming Soon
														</a>
													</li>
													<li>
														<a
															href="customer-feedbacks.html"
															className="link text-secondary duration-300"
														>
															Customer Feedbacks
														</a>
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
			</div> */}
      {/* <div className="modal-search-block">
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
			</div> */}
    </div>
  );
}
