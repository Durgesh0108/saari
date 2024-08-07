import SearchResultListingPage from "./_components/SearchResultListingPage";
import prismadb from "@/lib/prisma";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query || "";

  // Split the query into individual words
  const queryWords = query.split(" ").filter(Boolean);

  // Build the dynamic query conditions
  const queryConditions = queryWords.flatMap((word) => [
    { name: { contains: word, mode: "insensitive" } },
    { category: { name: { contains: word, mode: "insensitive" } } },
    { occassion: { name: { contains: word, mode: "insensitive" } } },
    { fabric: { name: { contains: word, mode: "insensitive" } } },
    { pattern: { name: { contains: word, mode: "insensitive" } } },
    { type: { name: { contains: word, mode: "insensitive" } } },
    { SubType: { name: { contains: word, mode: "insensitive" } } },
    { color: { name: { contains: word, mode: "insensitive" } } },
    { zari: { name: { contains: word, mode: "insensitive" } } },
    { border: { name: { contains: word, mode: "insensitive" } } },
    { buttiType: { name: { contains: word, mode: "insensitive" } } },
    { palluMotif: { name: { contains: word, mode: "insensitive" } } },
    { sareeMotif: { name: { contains: word, mode: "insensitive" } } },
    { weave: { name: { contains: word, mode: "insensitive" } } },
    { weaveType: { name: { contains: word, mode: "insensitive" } } },
  ]);

  // Fetch similar results by querying each condition individually and accumulating results
  let similarResults = [];
  for (const condition of queryConditions) {
    const partialResults = await prismadb.product.findMany({
      where: {
        OR: [condition],
        // isArchived: false,
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
    similarResults = [...similarResults, ...partialResults];
  }

  // Remove duplicate products based on product ID
  const uniqueSimilarResults = Array.from(
    new Set(similarResults.map((product) => product.id))
  ).map((id) => {
    return similarResults.find((product) => product.id === id);
  });

  const specifiedResults = uniqueSimilarResults.filter((product) => {
    return queryWords.every((word) => {
      return (
        product.name.toLowerCase().includes(word.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.occassion?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.fabric?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.pattern?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.type?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.SubType?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.color?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.zari?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.border?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.buttiType?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.palluMotif?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.sareeMotif?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.weave?.name.toLowerCase().includes(word.toLowerCase()) ||
        product.weaveType?.name.toLowerCase().includes(word.toLowerCase())
      );
    });
  });

  return (
    <>
      <SearchResultListingPage
        results={specifiedResults}
        similarResults={uniqueSimilarResults}
      />
    </>
  );
}

