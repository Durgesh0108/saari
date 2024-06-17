import prismadb from "@/lib/prisma";
import PatternListPage from "./_component/PatternListPage";

export default async function PatternPage({ params }) {
  const pattern = await prismadb.pattern.findUnique({
    where: {
      id: params.patternId,
    },
  });

  const product = await prismadb.product.findMany({
    where: {
      patternId: params.patternId,
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

    // take: 3,
  });
  return (
    <>
      <PatternListPage Patterns={pattern} products={product} category={categories}/>
    </>
  );
}
