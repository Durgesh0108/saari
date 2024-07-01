// import SearchResultListingPage from "./_components/SearchResultListingPage";
// import prismadb from "@/lib/prisma";

// export default async function SearchPage({ searchParams }) {
//   const query = searchParams.query || "";

//   // Prisma query to fetch products based on the search query
//   const results = await prismadb.product.findMany({
//     where: {
//       OR: [
//         { name: { contains: query, mode: "insensitive" } },
//         { category: { name: { contains: query, mode: "insensitive" } } },
//         { fabric: { name: { contains: query, mode: "insensitive" } } },
//         { pattern: { name: { contains: query, mode: "insensitive" } } },
//         { type: { name: { contains: query, mode: "insensitive" } } },
//         { SubType: { name: { contains: query, mode: "insensitive" } } },
//         { color: { name: { contains: query, mode: "insensitive" } } },
//         { blouseColor: { name: { contains: query, mode: "insensitive" } } },
//         { palluColor: { name: { contains: query, mode: "insensitive" } } },
//       ],
//       // isArchived: false,
//     },
//     include: {
//       category: true,
//       color: true,
//       description: true,
//       images: true,
//       occassion: true,
//       pattern: true,
//       type: true,
//       SubType: true,
//       blouseColor: true,
//       palluColor: true,
//       fabric: true,
//     },
//   });

//   return (
//     <>
//       <SearchResultListingPage results={results} />
//     </>
//   );
// }





import SearchResultListingPage from "./_components/SearchResultListingPage";
import prismadb from "@/lib/prisma";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query || "";
  
  // Split the query into individual words
  const queryWords = query.split(" ").filter(Boolean);

  // Build the dynamic query
  const queryConditions = queryWords.map(word => ({
    OR: [
      { name: { contains: word, mode: "insensitive" } },
      { category: { name: { contains: word, mode: "insensitive" } } },
      { occassion: { name: { contains: word, mode: "insensitive" } } },
      { fabric: { name: { contains: word, mode: "insensitive" } } },
      { pattern: { name: { contains: word, mode: "insensitive" } } },
      { type: { name: { contains: word, mode: "insensitive" } } },
      { SubType: { name: { contains: word, mode: "insensitive" } } },
      { color: { name: { contains: word, mode: "insensitive" } } },
      { blouseColor: { name: { contains: word, mode: "insensitive" } } },
      { palluColor: { name: { contains: word, mode: "insensitive" } } },
    ]
  }));

  // Prisma query to fetch products based on the search query
  const results = await prismadb.product.findMany({
    where: {
      AND: queryConditions, // Combine conditions with AND
      // isArchived: false,
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
    },
  });

  return (
    <>
      <SearchResultListingPage results={results} />
    </>
  );
}
