// @ts-nocheck

import React from "react";
import prismadb from "@/lib/prisma";
import ProductsList from "./_components/ProductList";

export default async function Products({ params, searchParams }) {
  // Initialize query filters
  const queryFilters = {};

  // Add filters conditionally
  if (searchParams.typeId) {
    queryFilters.typeId = searchParams.typeId;
  }
  if (searchParams.fabricId) {
    queryFilters.fabricId = searchParams.fabricId;
  }
  if (searchParams.occassionId) {
    queryFilters.occassionId = searchParams.occassionId;
  }
  if (searchParams.categoryId) {
    queryFilters.categoryId = searchParams.categoryId;
  }
  if (searchParams.subTypeId) {
    queryFilters.subTypeId = searchParams.subTypeId;
  }
  if (searchParams.patternId) {
    queryFilters.patternId = searchParams.patternId;
  }
  if (searchParams.colorId) {
    queryFilters.colorId = searchParams.colorId;
  }

  // Query products with dynamic filters
  const products = await prismadb.product.findMany({
    where: {
      ...queryFilters,
    },
    include: {
      category: true,
      color: true,
      description: true,
      images: true,
      occassion: true,
      pattern: true,
      type: true,
      SubType: true,
      blouseColor: true,
      palluColor: true,
      fabric: true,
      blousePattern: true,
      border: true,
      borderColor: true,
      buttiType: true,
      palluMotif: true,
      sareeMotif: true,
      weave: true,
      weaveType: true,
      zari: true,
      zariColor: true,
    },
  });

  // Fetch categories including their types and subtypes
  const categories = await prismadb.category.findMany({
    where: {
      name: {
        not: "Gift Card",
      },
    },
    include: {
      Pattern: true,
      Type: {
        include: {
          SubType: true,
        },
      },
    },
  });

  // Extract types for the current filters to pass them to the ProductsList
  let currentTypes;

  if (searchParams.typeId) {
    currentTypes = await prismadb.type.findUnique({
      where: {
        id: searchParams.typeId,
      },
    });
  }
  if (searchParams.fabricId) {
    currentTypes = await prismadb.fabric.findUnique({
      where: {
        id: searchParams.fabricId,
      },
    });
  }
  if (searchParams.occassionId) {
    currentTypes = await prismadb.occassion.findUnique({
      where: {
        id: searchParams.occassionId,
      },
    });
  }
  if (searchParams.categoryId) {
    currentTypes = await prismadb.category.findUnique({
      where: {
        id: searchParams.categoryId,
      },
    });
  }
  if (searchParams.subTypeId) {
    currentTypes = await prismadb.subType.findUnique({
      where: {
        id: searchParams.subTypeId,
      },
    });
  }
  if (searchParams.patternId) {
    currentTypes = await prismadb.pattern.findUnique({
      where: {
        id: searchParams.patternId,
      },
    });
  }
  if (searchParams.colorId) {
    currentTypes = await prismadb.color.findUnique({
      where: {
        id: searchParams.colorId,
      },
    });
  }

  // Pass the currentTypes, products, and categories to ProductsList
  return (
    <>
      <ProductsList
        Types={currentTypes}
        products={products}
        // category={categories}
      />
    </>
  );
}
