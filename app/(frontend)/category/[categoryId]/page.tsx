import ShopByOccassion from "./_component/Occassion";
import FilterByColor from "./_component/Color";
import ShopByCategory from "./_component/Category";
import ShopByPattern from "./_component/Pattern";
import prismadb from "@/lib/prisma";

export default async function CategoryPage({ params }) {
  const types = await prismadb.type.findMany({
    where: {
      categoryId: params.categoryId,
    },
  });

  const occassion = await prismadb.occassion.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const product = await prismadb.product.findMany({
    where: {
      categoryId: params.categoryId,
    },
    include: {
      category: true,
      color: true,
      description: true,
      images: true,
      occassion: true,
      pattern: true,
      type: true,
    },
  });

  const Color = await prismadb.color.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      {/* *************************************** */}
      <div className="no-scrollbar z-10">
        <div className="">
          <ShopByCategory types={types} />
          <ShopByOccassion occassion={occassion} products={product} />
          <FilterByColor color={Color} products={product} />
          {/* <ShopByPattern/> */}
        </div>
      </div>
    </>
  );
}
