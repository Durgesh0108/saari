// // components/FilterPanel.js

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { X } from "lucide-react";

// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
// import Typography from "@mui/material/Typography";

// const MAX = 100000;
// const MIN = 0;
// const marks = [
//   {
//     value: MIN,
//     label: "",
//   },
//   {
//     value: MAX,
//     label: "",
//   },
// ];

// export default function FilterPanel({
//   results,
//   filters,
//   setFilters,
//   handleResetFilters,
// }) {
//   const [distinctFabrics, setDistinctFabrics] = useState([]);
//   const [distinctWeaves, setDistinctWeaves] = useState([]);
//   const [distinctTypes, setDistinctTypes] = useState([]);
//   const [distinctMotifs, setDistinctMotifs] = useState([]);
//   const [distinctOccassions, setDistinctOccassions] = useState([]);
//   const [distinctColors, setDistinctColors] = useState([]);
//   const [distinctZaris, setDistinctZaris] = useState([]);
//   const [distinctPalluDesigns, setDistinctPalluDesigns] = useState([]);
//   const [distinctBorders, setDistinctBorders] = useState([]);
//   const [distinctCategories, setDistinctCategories] = useState([]);
//   const [distinctSubTypes, setDistinctSubTypes] = useState([]);
//   const [distinctPatterns, setDistinctPatterns] = useState([]);

//   useEffect(() => {
//     const fetchDistinctFilters = () => {
//       const Fabrics = results.map((product) => product.fabric.name);
//       setDistinctFabrics(Array.from(new Set(Fabrics)));

//       const Weaves = results.map((product) => product.weave.name);
//       setDistinctWeaves(Array.from(new Set(Weaves)));

//       const types = results.map((product) => product.type.name);
//       setDistinctTypes(Array.from(new Set(types)));

//       // *********************
//       // const Motifs = results.map((product) => product.weave.name);
//       // setDistinctMotifs(Array.from(new Set(Motifs)));
//       // *********************

//       const occassions = results.map((product) => product.occassion.name);
//       setDistinctOccassions(Array.from(new Set(occassions)));

//       const colors = results.map((product) => product.color.name);
//       setDistinctColors(Array.from(new Set(colors)));

//       const Zaris = results.map((product) => product.zari.name);
//       setDistinctZaris(Array.from(new Set(Zaris)));

//       const PalluDesigns = results.map((product) => product.palluMotif.name);
//       setDistinctPalluDesigns(Array.from(new Set(PalluDesigns)));

//       const Borders = results.map((product) => product.border.name);
//       setDistinctBorders(Array.from(new Set(Borders)));

//       const categories = results.map((product) => product.category.name);
//       setDistinctCategories(Array.from(new Set(categories)));

//       const subtypes = results.map((product) => product.SubType.name);
//       setDistinctSubTypes(Array.from(new Set(subtypes)));

//       const patterns = results.map((product) => product.pattern.name);
//       setDistinctPatterns(Array.from(new Set(patterns)));
//     };

//     fetchDistinctFilters();
//   }, [results]);

//   const handleFilterChange = (filterType, value) => {
//     setFilters((prevFilters) => {
//       let updatedFilter = [...prevFilters[filterType]];
//       if (updatedFilter.includes(value)) {
//         updatedFilter = updatedFilter.filter((item) => item !== value);
//       } else {
//         updatedFilter.push(value);
//       }
//       return { ...prevFilters, [filterType]: updatedFilter };
//     });
//   };

//   const handlePriceRangeChange = (_, newValue) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       priceRange: newValue,
//     }));
//   };

//   return (
//     <div className="block col-span-2 h-full max-h-screen overflow-auto no-scrollbar p-4 md:p-8 sticky top-20">
//       <div className="flex justify-between w-full items-center ">
//         <h1 className="text-xl  md:text-xl lg:text-2xl font-bold ">Filters</h1>
//         <div>
//           <Button
//             className="bg-red-500 hover:bg-red-500/90 text-white px-4 py-2 rounded"
//             onClick={handleResetFilters}
//           >
//             Reset
//           </Button>
//         </div>
//       </div>
//       <Accordion type="single" collapsible className="sticky top-20 bg-white">
//         <div>
//           <h1 className="text-xl text-black">Price Range</h1>
//           <Box sx={{ width: 250 }}>
//             <Slider
//               step={500}
//               marks={marks}
//               value={filters.priceRange}
//               onChange={handlePriceRangeChange}
//               valueLabelDisplay="auto"
//               min={MIN}
//               max={MAX}
//             />
//             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//               <Typography
//                 variant="body2"
//                 onClick={() =>
//                   setFilters((prev) => ({
//                     ...prev,
//                     priceRange: [MIN, prev.priceRange[1]],
//                   }))
//                 }
//                 sx={{ cursor: "pointer" }}
//               >
//                 {MIN}
//               </Typography>
//               <Typography
//                 variant="body2"
//                 onClick={() =>
//                   setFilters((prev) => ({
//                     ...prev,
//                     priceRange: [prev.priceRange[0], MAX],
//                   }))
//                 }
//                 sx={{ cursor: "pointer" }}
//               >
//                 {MAX}
//               </Typography>
//             </Box>
//           </Box>
//         </div>

//         {/* Fabric */}
//         <AccordionItem value="item-2">
//           <AccordionTrigger className="text-xl font-medium ">
//             FABRIC
//           </AccordionTrigger>
//           <AccordionContent className="text-lg font-medium">
//             <div>
//               {distinctFabrics.map((fabric) => (
//                 <div key={fabric} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={fabric}
//                     name="fabric"
//                     value={fabric}
//                     checked={filters.fabric.includes(fabric)}
//                     onChange={(e) =>
//                       handleFilterChange("fabric", e.target.value)
//                     }
//                   />
//                   <label htmlFor={fabric} className="ml-2">
//                     {fabric}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* Weave */}
//         <AccordionItem value="item-3">
//           <AccordionTrigger className="text-xl font-medium ">
//             WEAVE
//           </AccordionTrigger>
//           <AccordionContent className="text-lg font-medium">
//             <div>
//               {distinctWeaves.map((weave) => (
//                 <div key={weave} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={weave}
//                     name="weave"
//                     value={weave}
//                     checked={filters.weave.includes(weave)}
//                     onChange={(e) =>
//                       handleFilterChange("weave", e.target.value)
//                     }
//                   />
//                   <label htmlFor={weave} className="ml-2">
//                     {weave}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* Types */}
//         <AccordionItem value="item-4">
//           <AccordionTrigger className="text-xl font-medium">
//             TYPES
//           </AccordionTrigger>
//           <AccordionContent className="text-lg font-medium">
//             <div>
//               {distinctTypes.map((type) => (
//                 <div key={type} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={type}
//                     name="type"
//                     value={type}
//                     checked={filters.type.includes(type)}
//                     onChange={(e) => handleFilterChange("type", e.target.value)}
//                   />
//                   <label htmlFor={type} className="ml-2">
//                     {type}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* MOTIF */}
//         <AccordionItem value="item-6">
//           <AccordionTrigger className="text-xl font-medium">
//             MOTIF
//           </AccordionTrigger>
//           <AccordionContent className="text-lg font-medium">
//             <div>
//               {distinctPatterns.map((pattern) => (
//                 <div key={pattern} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={pattern}
//                     name="pattern"
//                     value={pattern}
//                     checked={filters.pattern.includes(pattern)}
//                     onChange={(e) =>
//                       handleFilterChange("pattern", e.target.value)
//                     }
//                   />
//                   <label htmlFor={pattern} className="ml-2">
//                     {pattern}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* Occassion */}
//         <AccordionItem value="item-7">
//           <AccordionTrigger className="text-xl font-medium ">
//             OCCASSION
//           </AccordionTrigger>
//           <AccordionContent className="text-lg font-medium">
//             <div>
//               {distinctOccassions.map((occassion) => (
//                 <div key={occassion} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={occassion}
//                     name="occassion"
//                     value={occassion}
//                     checked={filters.occassion.includes(occassion)}
//                     onChange={(e) =>
//                       handleFilterChange("occassion", e.target.value)
//                     }
//                   />
//                   <label htmlFor={occassion} className="ml-2">
//                     {occassion}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* Color */}
//         <AccordionItem value="item-8">
//           <AccordionTrigger className="text-xl font-medium">
//             COLOR
//           </AccordionTrigger>
//           <AccordionContent className="text-lg font-medium">
//             <div>
//               {distinctColors.map((color) => (
//                 <div key={color} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={color}
//                     name="color"
//                     value={color}
//                     checked={filters.color.includes(color)}
//                     onChange={(e) =>
//                       handleFilterChange("color", e.target.value)
//                     }
//                   />
//                   <label htmlFor={color} className="ml-2">
//                     {color}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* ZARI */}
//         <AccordionItem value="item-9">
//           <AccordionTrigger className="text-xl font-medium">
//             ZARI
//           </AccordionTrigger>
//           <AccordionContent className="text-lg font-medium">
//             <div>
//               {distinctZaris.map((zari) => (
//                 <div key={zari} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={zari}
//                     name="zari"
//                     value={zari}
//                     checked={filters.zari.includes(zari)}
//                     onChange={(e) => handleFilterChange("zari", e.target.value)}
//                   />
//                   <label htmlFor={zari} className="ml-2">
//                     {zari}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* PALLU DESIGN */}
//         <AccordionItem value="item-10">
//           <AccordionTrigger className="text-xl font-medium">
//             PALLU DESIGN
//           </AccordionTrigger>
//           <AccordionContent className="text-lg font-medium">
//             <div>
//               {distinctPalluDesigns.map((palluDesign) => (
//                 <div key={palluDesign} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={palluDesign}
//                     name="palluDesign"
//                     value={palluDesign}
//                     checked={filters.palluDesign.includes(palluDesign)}
//                     onChange={(e) =>
//                       handleFilterChange("palluDesign", e.target.value)
//                     }
//                   />
//                   <label htmlFor={palluDesign} className="ml-2">
//                     {palluDesign}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* BORDER */}
//         <AccordionItem value="item-11">
//           <AccordionTrigger className="text-xl font-medium">
//             BORDER
//           </AccordionTrigger>
//           <AccordionContent className="text-lg font-medium">
//             <div>
//               {distinctBorders.map((border) => (
//                 <div key={border} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={border}
//                     name="border"
//                     value={border}
//                     checked={filters.border.includes(border)}
//                     onChange={(e) =>
//                       handleFilterChange("border", e.target.value)
//                     }
//                   />
//                   <label htmlFor={border} className="ml-2">
//                     {border}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const MAX = 100000;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

export default function FilterPanel({
  results,
  filters,
  setFilters,
  handleResetFilters,
}) {
  const [distinctFabrics, setDistinctFabrics] = useState([]);
  const [distinctWeaves, setDistinctWeaves] = useState([]);
  const [distinctTypes, setDistinctTypes] = useState([]);
  const [distinctMotifs, setDistinctMotifs] = useState([]);
  const [distinctOccassions, setDistinctOccassions] = useState([]);
  const [distinctColors, setDistinctColors] = useState([]);
  const [distinctZaris, setDistinctZaris] = useState([]);
  const [distinctpalluMotifs, setDistinctpalluMotifs] = useState([]);
  const [distinctBorders, setDistinctBorders] = useState([]);
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [distinctSubTypes, setDistinctSubTypes] = useState([]);
  const [distinctPatterns, setDistinctPatterns] = useState([]);

  useEffect(() => {
    const fetchDistinctFilters = () => {
      const Fabrics = results
        .map((product) => product.fabric?.name)
        .filter((name) => name);
      setDistinctFabrics(Array.from(new Set(Fabrics)));

      const Weaves = results
        .map((product) => product.weave?.name)
        .filter((name) => name);
      setDistinctWeaves(Array.from(new Set(Weaves)));

      const types = results
        .map((product) => product.type?.name)
        .filter((name) => name);
      setDistinctTypes(Array.from(new Set(types)));

      // const Motifs = results
      //   .map((product) => product.motif?.name)
      //   .filter((name) => name);
      // setDistinctMotifs(Array.from(new Set(Motifs)));

      const occassions = results
        .map((product) => product.occassion?.name)
        .filter((name) => name);
      setDistinctOccassions(Array.from(new Set(occassions)));

      const colors = results
        .map((product) => product.color?.name)
        .filter((name) => name);
      setDistinctColors(Array.from(new Set(colors)));

      const Zaris = results
        .map((product) => product.zari?.name)
        .filter((name) => name);
      setDistinctZaris(Array.from(new Set(Zaris)));

      const palluMotifs = results
        .map((product) => product.palluMotif?.name)
        .filter((name) => name);
      setDistinctpalluMotifs(Array.from(new Set(palluMotifs)));

      const Borders = results
        .map((product) => product.border?.name)
        .filter((name) => name);
      setDistinctBorders(Array.from(new Set(Borders)));

      const categories = results
        .map((product) => product.category?.name)
        .filter((name) => name);
      setDistinctCategories(Array.from(new Set(categories)));

      const subtypes = results
        .map((product) => product.SubType?.name)
        .filter((name) => name);
      setDistinctSubTypes(Array.from(new Set(subtypes)));

      const patterns = results
        .map((product) => product.pattern?.name)
        .filter((name) => name);
      setDistinctPatterns(Array.from(new Set(patterns)));
    };

    fetchDistinctFilters();
  }, [results]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      let updatedFilter = [...prevFilters[filterType]];
      if (updatedFilter.includes(value)) {
        updatedFilter = updatedFilter.filter((item) => item !== value);
      } else {
        updatedFilter.push(value);
      }
      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  const handlePriceRangeChange = (_, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: newValue,
    }));
  };

  return (
    <div className="block col-span-2 h-full max-h-screen overflow-auto no-scrollbar p-4 md:p-8 sticky top-20">
      <div className="flex justify-between w-full items-center ">
        <h1 className="text-xl  md:text-xl lg:text-2xl font-bold ">Filters</h1>
        <div>
          <Button
            className="bg-red-500 hover:bg-red-500/90 text-white px-4 py-2 rounded"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
      <Accordion type="single" collapsible className="sticky top-20 bg-white">
        <div>
          <h1 className="text-xl text-black">Price Range</h1>
          <Box sx={{ width: 250 }}>
            <Slider
              step={500}
              marks={marks}
              value={filters.priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={MIN}
              max={MAX}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [MIN, prev.priceRange[1]],
                  }))
                }
                sx={{ cursor: "pointer" }}
              >
                {MIN}
              </Typography>
              <Typography
                variant="body2"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], MAX],
                  }))
                }
                sx={{ cursor: "pointer" }}
              >
                {MAX}
              </Typography>
            </Box>
          </Box>
        </div>

        {/* Fabric */}
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl font-medium ">
            FABRIC
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {distinctFabrics.map((fabric) => (
                <div key={fabric} className="flex items-center">
                  <input
                    type="checkbox"
                    id={fabric}
                    name="fabric"
                    value={fabric}
                    checked={filters.fabric.includes(fabric)}
                    onChange={(e) =>
                      handleFilterChange("fabric", e.target.value)
                    }
                  />
                  <label htmlFor={fabric} className="ml-2">
                    {fabric}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Weave */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl font-medium ">
            WEAVE
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {distinctWeaves.map((weave) => (
                <div key={weave} className="flex items-center">
                  <input
                    type="checkbox"
                    id={weave}
                    name="weave"
                    value={weave}
                    checked={filters.weave.includes(weave)}
                    onChange={(e) =>
                      handleFilterChange("weave", e.target.value)
                    }
                  />
                  <label htmlFor={weave} className="ml-2">
                    {weave}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Types */}
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-xl font-medium">
            TYPES
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {distinctTypes.map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={type}
                    name="type"
                    value={type}
                    checked={filters.type.includes(type)}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                  />
                  <label htmlFor={type} className="ml-2">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* MOTIF */}
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-xl font-medium">
            MOTIF
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {distinctPatterns.map((pattern) => (
                <div key={pattern} className="flex items-center">
                  <input
                    type="checkbox"
                    id={pattern}
                    name="pattern"
                    value={pattern}
                    checked={filters.pattern.includes(pattern)}
                    onChange={(e) =>
                      handleFilterChange("pattern", e.target.value)
                    }
                  />
                  <label htmlFor={pattern} className="ml-2">
                    {pattern}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Occassion */}
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-xl font-medium ">
            OCCASSION
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {distinctOccassions.map((occassion) => (
                <div key={occassion} className="flex items-center">
                  <input
                    type="checkbox"
                    id={occassion}
                    name="occassion"
                    value={occassion}
                    checked={filters.occassion.includes(occassion)}
                    onChange={(e) =>
                      handleFilterChange("occassion", e.target.value)
                    }
                  />
                  <label htmlFor={occassion} className="ml-2">
                    {occassion}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color */}
        <AccordionItem value="item-8">
          <AccordionTrigger className="text-xl font-medium">
            COLOR
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {distinctColors.map((color) => (
                <div key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    id={color}
                    name="color"
                    value={color}
                    checked={filters.color.includes(color)}
                    onChange={(e) =>
                      handleFilterChange("color", e.target.value)
                    }
                  />
                  <label htmlFor={color} className="ml-2">
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ZARI */}
        <AccordionItem value="item-9">
          <AccordionTrigger className="text-xl font-medium">
            ZARI
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {distinctZaris.map((zari) => (
                <div key={zari} className="flex items-center">
                  <input
                    type="checkbox"
                    id={zari}
                    name="zari"
                    value={zari}
                    checked={filters.zari.includes(zari)}
                    onChange={(e) => handleFilterChange("zari", e.target.value)}
                  />
                  <label htmlFor={zari} className="ml-2">
                    {zari}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* PALLU DESIGN */}
        <AccordionItem value="item-10">
          <AccordionTrigger className="text-xl font-medium">
            PALLU DESIGN
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {distinctpalluMotifs.map((palluMotif) => (
                <div key={palluMotif} className="flex items-center">
                  <input
                    type="checkbox"
                    id={palluMotif}
                    name="palluMotif"
                    value={palluMotif}
                    checked={filters.palluMotif.includes(palluMotif)}
                    onChange={(e) =>
                      handleFilterChange("palluMotif", e.target.value)
                    }
                  />
                  <label htmlFor={palluMotif} className="ml-2">
                    {palluMotif}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* BORDER */}
        <AccordionItem value="item-11">
          <AccordionTrigger className="text-xl font-medium">
            BORDER
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {distinctBorders.map((border) => (
                <div key={border} className="flex items-center">
                  <input
                    type="checkbox"
                    id={border}
                    name="border"
                    value={border}
                    checked={filters.border.includes(border)}
                    onChange={(e) =>
                      handleFilterChange("border", e.target.value)
                    }
                  />
                  <label htmlFor={border} className="ml-2">
                    {border}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

{
  /* Subtypes */
}
{
  /* <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl font-medium">
                  SUBTYPES
                </AccordionTrigger>
                <AccordionContent className="text-lg font-medium">
                  <div>
                    {distinctSubTypes.map((subtype) => (
                      <div key={subtype} className="flex items-center">
                        <input
                          type="checkbox"
                          id={subtype}
                          name="subtype"
                          value={subtype}
                          checked={filters.subtype.includes(subtype)}
                          onChange={(e) =>
                            handleFilterChange("subtype", e.target.value)
                          }
                        />
                        <label htmlFor={subtype} className="ml-2">
                          {subtype}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem> */
}
