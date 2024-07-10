import SearchResultListingPage from "./_components/SearchResultListingPage";
import prismadb from "@/lib/prisma";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query || "";

  // Split the query into individual words
  const queryWords = query.split(" ").filter(Boolean);
  console.log({ query, queryWords });

  // Build the dynamic query
  const queryConditions = queryWords.map((word) => ({
    OR: [
      { name: { contains: word, mode: "insensitive" } },
      { category: { name: { contains: word, mode: "insensitive" } } },
      { occassion: { name: { contains: word, mode: "insensitive" } } },
      { fabric: { name: { contains: word, mode: "insensitive" } } },
      { pattern: { name: { contains: word, mode: "insensitive" } } },
      { type: { name: { contains: word, mode: "insensitive" } } },
      { SubType: { name: { contains: word, mode: "insensitive" } } },
      { color: { name: { contains: word, mode: "insensitive" } } },
    ],
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

  console.log({ results });

  return (
    <>
      {/* <div>Search Results</div> */}
      <SearchResultListingPage results={results} />
    </>
  );
}

// import NoProduct from "@/components/ui/NoProduct";
// import SearchResultListingPage from "./_components/SearchResultListingPage";
// import prismadb from "@/lib/prisma";

// export default async function SearchPage({ searchParams }) {
//   const query = searchParams.query || "";

//   // Split the query into individual words
//   const queryWords = query.split(" ").filter(Boolean);
//   console.log({ query, queryWords });

//   // Build the dynamic query
//   const orConditions = queryWords.flatMap((word) => [
//     { name: { contains: word, mode: "insensitive" } },
//     { category: { name: { contains: word, mode: "insensitive" } } },
//     { occassion: { name: { contains: word, mode: "insensitive" } } },
//     { fabric: { name: { contains: word, mode: "insensitive" } } },
//     { pattern: { name: { contains: word, mode: "insensitive" } } },
//     { type: { name: { contains: word, mode: "insensitive" } } },
//     { SubType: { name: { contains: word, mode: "insensitive" } } },
//     { color: { name: { contains: word, mode: "insensitive" } } },
//     // { blouseColor: { contains: word, mode: "insensitive" } },
//     // { palluColor: { contains: word, mode: "insensitive" } },
//   ]);

//   // Adjusted for nested objects
//   const adjustedOrConditions = queryWords.flatMap((word) => [
//     { name: { contains: word, mode: "insensitive" } },
//     { category: { is: { name: { contains: word, mode: "insensitive" } } } },
//     { occassion: { is: { name: { contains: word, mode: "insensitive" } } } },
//     { fabric: { is: { name: { contains: word, mode: "insensitive" } } } },
//     { pattern: { is: { name: { contains: word, mode: "insensitive" } } } },
//     { type: { is: { name: { contains: word, mode: "insensitive" } } } },
//     { SubType: { is: { name: { contains: word, mode: "insensitive" } } } },
//     { color: { is: { name: { contains: word, mode: "insensitive" } } } },
//     // { blouseColor: { contains: word, mode: "insensitive" } },
//     // { palluColor: { contains: word, mode: "insensitive" } },
//   ]);

//   // Prisma query to fetch products based on the search query
//   const results = await prismadb.product.findMany({
//     where: {
//       OR: orConditions, // Combine conditions with OR
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

//   console.log({ results });

//   return (
//     <>
//       {/* <div>Search Results</div> */}
//       <SearchResultListingPage results={results} />
//     </>
//   );
// }
