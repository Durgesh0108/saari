// import prismadb from "@/lib/prisma";
// import ProductInsightPage from "./_component/ProductInsightPage";

// export default async function ProductPage({ params }) {
//   const product = await prismadb.product.findUnique({
//     where: {
//       id: params.productId,
//     },
//     include: {
//       category: true,
//       color: true,
//       description: true,
//       images: {
//         orderBy: {
//           position: "asc",
//         },
//       },
//       occassion: true,
//       pattern: true,
//       type: true,
//       fabric: true,
//       blouseColor: true,
//       palluColor: true,
//       SubType: true,
//       blousePattern: true,
//       border: true,
//       borderColor: true,
//       buttiType: true,
//       palluMotif: true,
//       sareeMotif: true,
//       weave: true,
//       weaveType: true,
//       zari: true,
//       zariColor: true,
//     },
//   });

//   const Colorproduct = await prismadb.product.findMany({
//     where: {
//       colorId: product.color.id,
//     },
//     include: {
//       images: {
//         orderBy: {
//           position: "asc",
//         },
//       },
//     },
//   });

//   const Categoryproduct = await prismadb.product.findMany({
//     where: {
//       categoryId: product.category.id,
//     },
//     include: {
//       images: {
//         orderBy: {
//           position: "asc",
//         },
//       },
//     },
//   });

//   const Occassionproduct = await prismadb.product.findMany({
//     where: {
//       occassionId: product.occassion.id,
//     },
//     include: {
//       images: {
//         orderBy: {
//           position: "asc",
//         },
//       },
//     },
//   });

//   return (
//     <>
//       <ProductInsightPage
//         product={product}
//         Colorproduct={Colorproduct}
//         Categoryproduct={Categoryproduct}
//         Occassionproduct={Occassionproduct}
//       />
//     </>
//   );
// }

import prismadb from "@/lib/prisma";
import ProductInsightPage from "./_component/ProductInsightPage";
import ErrorPage from "./error";
import NotFound from "./not-found";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        category: true,
        color: true,
        description: true,
        images: {
          orderBy: {
            position: "asc",
          },
        },
        occassion: true,
        pattern: true,
        type: true,
        fabric: true,
        blouseColor: true,
        palluColor: true,
        SubType: true,
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

    if (!product) {
      return <NotFound />;
    }

    const colorId = product.color?.id;
    const categoryId = product.category?.id;
    const occassionId = product.occassion?.id;

    const colorProducts = colorId
      ? await prismadb.product.findMany({
          where: {
            colorId: colorId,
          },
          include: {
            images: {
              orderBy: {
                position: "asc",
              },
            },
          },
        })
      : [];

    const categoryProducts = categoryId
      ? await prismadb.product.findMany({
          where: {
            categoryId: categoryId,
          },
          include: {
            images: {
              orderBy: {
                position: "asc",
              },
            },
          },
        })
      : [];

    const occassionProducts = occassionId
      ? await prismadb.product.findMany({
          where: {
            occassionId: occassionId,
          },
          include: {
            images: {
              orderBy: {
                position: "asc",
              },
            },
          },
        })
      : [];

    return (
      <ProductInsightPage
        product={product}
        Colorproduct={colorProducts}
        Categoryproduct={categoryProducts}
        Occassionproduct={occassionProducts}
      />
    );
  } catch (error) {
    console.error("Error fetching product data:", error);
    return <ErrorPage />; // Return the custom error page component
  }
}
