// import SearchResultListingPage from "./_components/SearchResultListingPage";
// import prismadb from "@/lib/prisma";

// export default async function SearchPage({ searchParams }) {
//   const query = searchParams.query || "";

//   // Split the query into individual words
//   const queryWords = query.split(" ").filter(Boolean);

//   // Build the dynamic query
//   const queryConditions = queryWords.map((word) => ({
//     OR: [
//       { name: { contains: word, mode: "insensitive" } },
//       { category: { name: { contains: word, mode: "insensitive" } } },
//       { occassion: { name: { contains: word, mode: "insensitive" } } },
//       { fabric: { name: { contains: word, mode: "insensitive" } } },
//       { pattern: { name: { contains: word, mode: "insensitive" } } },
//       { type: { name: { contains: word, mode: "insensitive" } } },
//       { SubType: { name: { contains: word, mode: "insensitive" } } },
//       { color: { name: { contains: word, mode: "insensitive" } } },
//     ],
//   }));

//   // Prisma query to fetch products based on the search query
//   const results = await prismadb.product.findMany({
//     where: {
//       AND: queryConditions, // Combine conditions with AND
//       // isArchived: false,
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

//   return (
//     <>
//       {/* <div>Search Results</div> */}
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
  const queryConditions = queryWords.map((word) => ({
    name: { contains: word, mode: "insensitive" },
  }));

  const categoryConditions = queryWords.map((word) => ({
    category: { name: { contains: word, mode: "insensitive" } },
  }));

  const occassionConditions = queryWords.map((word) => ({
    occassion: { name: { contains: word, mode: "insensitive" } },
  }));

  const fabricConditions = queryWords.map((word) => ({
    fabric: { name: { contains: word, mode: "insensitive" } },
  }));

  const patternConditions = queryWords.map((word) => ({
    pattern: { name: { contains: word, mode: "insensitive" } },
  }));

  const typeConditions = queryWords.map((word) => ({
    type: { name: { contains: word, mode: "insensitive" } },
  }));

  const subTypeConditions = queryWords.map((word) => ({
    SubType: { name: { contains: word, mode: "insensitive" } },
  }));

  const colorConditions = queryWords.map((word) => ({
    color: { name: { contains: word, mode: "insensitive" } },
  }));

  // Prisma query to fetch products based on the search query
  const results = await prismadb.product.findMany({
    where: {
      OR: [
        ...queryConditions,
        ...categoryConditions,
        ...occassionConditions,
        ...fabricConditions,
        ...patternConditions,
        ...typeConditions,
        ...subTypeConditions,
        ...colorConditions,
      ],
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

  return (
    <>
      {/* <div>Search Results</div> */}
      <SearchResultListingPage results={results} />
    </>
  );
}
