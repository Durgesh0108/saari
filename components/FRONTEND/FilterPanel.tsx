import React, { useEffect, useState } from "react";
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

const MAX = 20000;
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
  const [distinctFilters, setDistinctFilters] = useState({
    fabric: [],
    weave: [],
    type: [],
    occassion: [],
    color: [],
    zari: [],
    palluMotif: [],
    border: [],
    category: [],
    subtype: [],
    pattern: [],
  });

  useEffect(() => {
    const extractDistinct = (key) =>
      Array.from(
        new Set(results.map((product) => product[key]?.name).filter(Boolean))
      );

    setDistinctFilters({
      fabric: extractDistinct("fabric"),
      weave: extractDistinct("weave"),
      type: extractDistinct("type"),
      occassion: extractDistinct("occassion"),
      color: extractDistinct("color"),
      zari: extractDistinct("zari"),
      palluMotif: extractDistinct("palluMotif"),
      border: extractDistinct("border"),
      category: extractDistinct("category"),
      subtype: extractDistinct("SubType"),
      pattern: extractDistinct("pattern"),
    });
  }, [results]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value];
      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  const handlePriceRangeChange = (_, newValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, priceRange: newValue }));
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
          <Box className={"w-full"}>
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

        {Object.entries(distinctFilters).map(([filterType, values]) => (
          <AccordionItem key={filterType} value={filterType}>
            <AccordionTrigger className="text-xl font-medium ">
              {filterType.toUpperCase()}
            </AccordionTrigger>
            <AccordionContent className="text-lg font-medium">
              <div>
                {values.map((value) => (
                  <div key={value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={value}
                      name={filterType}
                      value={value}
                      checked={filters[filterType]?.includes(value)}
                      onChange={(e) =>
                        handleFilterChange(filterType, e.target.value)
                      }
                    />
                    <label htmlFor={value} className="ml-2">
                      {value}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
