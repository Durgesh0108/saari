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
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductListing({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 py-12 md:px-4 max-h-screen overflow-auto no-scrollbar">
      {products.map((product, index) => (
        <Link key={index} href={`/product/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
      <style jsx>{`
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
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      `}</style>
    </div>
  );
}
