// @ts-nocheck

"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CategoryPage() {
  const params = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/website/product`);
      const product = await res.json();
      setProducts(product);
    };

    fetchProducts();
  }, []);

  return (
    <div className="pt-36 h-80">
      CategoryPage
      <div>
        {products.map((product, index) => (
          <div key={index}>{product.name}</div>
        ))}
      </div>
    </div>
  );
}
