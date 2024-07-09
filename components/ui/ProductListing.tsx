// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import ProductCard from "./ProductCard";

// export default function ProductListing({ products }) {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8 py-12 md:px-4 h-[400px] max-h-screen overflow-auto no-scrollbar">
//       {products.map((product, index) => (
//         <Link key={index} href={`/product/${product.id}`}>
//           <ProductCard product={product} />
//         </Link>
//       ))}
//     </div>
//   );
// }

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

  let newArray = [...products, ...products, ...products, ...products];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newArray.slice(
    indexOfFirstItem,
    indexOfLastItem || newArray.length
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
            Array(Math.ceil(newArray.length / itemsPerPage || 0)).keys()
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

{
  /* <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }

        .grid-gap {
          gap: 2rem;
        }

        .py-12 {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }

        .md\:px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }

        .max-h-screen {
          max-height: 100vh;
        }

        .overflow-auto {
          overflow: auto;
        }

        .no-scrollbar {
          scrollbar-width: none; 
          -ms-overflow-style: none; 
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style> */
}
