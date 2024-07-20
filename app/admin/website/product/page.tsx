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

  const Weave = await prismadb.weave.findMany({
    include: {
      WeaveType: {
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const Category = await prismadb.category.findMany({
    include: {
      BlousePattern: {
        orderBy: {
          name: "asc",
        },
      },
      Border: {
        orderBy: {
          name: "asc",
        },
      },
      ButtiType: {
        orderBy: {
          name: "asc",
        },
      },
      Fabric: {
        include: {
          Type: {
            include: {
              SubType: {
                orderBy: {
                  name: "asc",
                },
              },
            },
            orderBy: {
              name: "asc",
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      },
      PalluMotif: {
        orderBy: {
          name: "asc",
        },
      },
      Pattern: {
        orderBy: {
          name: "asc",
        },
      },
      SareeMotif: {
        orderBy: {
          name: "asc",
        },
      },
      Type: {
        include: {
          SubType: {
            orderBy: {
              name: "asc",
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      },
      Zari: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  const Color = await prismadb.color.findMany({});
  const Occassion = await prismadb.occassion.findMany({});

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Products</h1>
      <hr className="border-1 border-gray-400 " />
      <div className="grid grid-cols-1  gap-8">
        <Card className={"p-8"}>
          <ProductFormPage
            Category={Category}
            Color={Color}
            Occassion={Occassion}
            Weave={Weave}
          />
        </Card>
        <Card className={"p-8"}>
          <ProductsListPage Products={products} />
        </Card>
      </div>
    </div>
  );
}
