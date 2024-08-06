// import ShopByOccassion from "./_component/Occassion";
// import FilterByColor from "./_component/Color";
// import ShopByCategory from "./_component/Category";
// import ShopByPattern from "./_component/Pattern";
// import prismadb from "@/lib/prisma";
// import DressStyleComponent from "./_component/DressStyle";

// export default async function CategoryPage({ params }) {
//   const types = await prismadb.type.findMany({
//     where: {
//       categoryId: params.categoryId,
//     },
//   });

//   const occassion = await prismadb.occassion.findMany({
//     orderBy: {
//       name: "asc",
//     },
//   });

//   const product = await prismadb.product.findMany({
//     where: {
//       categoryId: params.categoryId,
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
//       SubType: true,
//       blouseColor: true,
//       palluColor: true,
//       fabric: true,
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

//   const Color = await prismadb.color.findMany({
//     orderBy: {
//       name: "asc",
//     },
//   });

//   const category = await prismadb.category.findMany({
//     where: {
//       id: params.categoryId,
//     },
//   });

//   const DressStyles = await prismadb.dressStyle.findMany({});
//   const TopViews = await prismadb.topView.findMany({});
//   const Attires = await prismadb.attire.findMany({
//     include: {
//       dressstyle: true,
//       topView: true,
//       images: {
//         orderBy: {
//           position: "asc",
//         },
//       },
//     },
//   });

//   return (
//     <>
//       {/* *************************************** */}
//       <div className="no-scrollbar z-10">
//         <div className="">
//           <ShopByCategory types={types} />
//           <ShopByOccassion occassion={occassion} products={product} />
//           <FilterByColor color={Color} products={product} />
//           {/* <ShopByPattern/> */}
//           {category.name === "Saree" && (
//             <DressStyleComponent
//               DressStyles={DressStyles}
//               TopViews={TopViews}
//               Attires={Attires}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import ShopByOccassion from "./_component/Occassion";
import FilterByColor from "./_component/Color";
import ShopByCategory from "./_component/Category";
import prismadb from "@/lib/prisma";
import DressStyleComponent from "./_component/DressStyle";

// Define the types for props
interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryId = params.categoryId;

  // Fetching data
  const types = await prismadb.type.findMany({
    where: {
      categoryId: categoryId,
    },
  });

  const occassion = await prismadb.occassion.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const products = await prismadb.product.findMany({
    where: {
      categoryId: categoryId,
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

  const colors = await prismadb.color.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      id: categoryId,
    },
  });

  const dressStyles = await prismadb.dressStyle.findMany({});
  const topViews = await prismadb.topView.findMany({});
  const attires = await prismadb.attire.findMany({
    include: {
      dressstyle: true,
      topView: true,
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  // Determine if the current category is "Saree"
  const isSareeCategory = categories.some(category => category.name === "Saree");

  return (
    <>
      <div className="no-scrollbar z-10">
        <div>
          <ShopByCategory types={types} />
          <ShopByOccassion occassion={occassion} products={products} />
          <FilterByColor color={colors} products={products} />
          {/* <ShopByPattern /> */}
          {isSareeCategory && (
            <DressStyleComponent
              DressStyles={dressStyles}
              TopViews={topViews}
              Attires={attires}
            />
          )}
        </div>
      </div>
    </>
  );
}
