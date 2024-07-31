import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductListing({ products }) {
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // let newArray = [...products, ...products, ...products, ...products];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(
    indexOfFirstItem,
    indexOfLastItem || products.length
  );

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 py-6 md:px-4 overflow-auto no-scrollbar z-30">
        {currentItems.map((product, index) => (
          <Link key={index} href={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      <div className="mt-4">
        <ul className="flex justify-center">
          {Array.from(
            Array(Math.ceil(products.length / itemsPerPage || 0)).keys()
          ).map((number) => (
            <li key={number} className="mx-1">
              <button
                onClick={() => paginate(number + 1)}
                className={`${
                  currentPage === number + 1
                    ? "bg-blue-500 text-white"
                    : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                } font-bold py-2 px-4 rounded-full focus:outline-none`}
              >
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
