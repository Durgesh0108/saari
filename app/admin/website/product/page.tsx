// "use client";

import { Card } from "@/components/ui/Card";
import React from "react";
import ProductFormPage from "./_components/productForm";
import prismadb from "@/lib/prisma";
import ProductList from "./_components/ProductList";
import { useAuthMiddleware } from "@/app/middleware";
import ProductsListPage from "./_components/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Probiz5",
};
export default async function ProductsPage() {
  // useAuthMiddleware();

  const products = await prismadb.product.findMany({
    include: {
      category: true,
      color: true,
      description: true,
      occassion: true,
      images: true,
      pattern: true,
      SubType: true,
      type: true,
      fabric: true,
      blouseColor: true,
      palluColor: true,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Products</h1>
      <hr className="border-1 border-gray-400 " />
      <div className="grid grid-cols-1  gap-8">
        <Card className={"p-8"}>
          <ProductFormPage />
        </Card>
        <Card className={"p-8"}>
          <ProductsListPage Products={products} />
        </Card>
      </div>
    </div>
  );
}
