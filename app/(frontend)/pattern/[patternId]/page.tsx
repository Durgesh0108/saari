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
  return (
    <>
      <PatternListPage Patterns={pattern} products={product} />
    </>
  );
}
