import prismadb from "@/lib/prisma";
import ProductInsightPage from "./_component/ProductInsightPage";

export default async function ProductPage({ params }) {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
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

  const Colorproduct = await prismadb.product.findMany({
    where: {
      colorId: product.color.id,
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

  const Categoryproduct = await prismadb.product.findMany({
    where: {
      categoryId: product.category.id,
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

  const Occassionproduct = await prismadb.product.findMany({
    where: {
      occassionId: product.occassion.id,
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
      <ProductInsightPage
        product={product}
        Colorproduct={Colorproduct}
        Categoryproduct={Categoryproduct}
        Occassionproduct={Occassionproduct}
      />
    </>
  );
}
