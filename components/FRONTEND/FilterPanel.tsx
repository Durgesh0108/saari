// components/FilterPanel.js

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
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [distinctOccassions, setDistinctOccassions] = useState([]);
  const [distinctTypes, setDistinctTypes] = useState([]);
  const [distinctSubTypes, setDistinctSubTypes] = useState([]);
  const [distinctPatterns, setDistinctPatterns] = useState([]);
  const [distinctColors, setDistinctColors] = useState([]);

  useEffect(() => {
    const fetchDistinctFilters = () => {
      const categories = results.map((product) => product.category.name);
      setDistinctCategories(Array.from(new Set(categories)));

      const occassions = results.map((product) => product.occassion.name);
      setDistinctOccassions(Array.from(new Set(occassions)));

      const types = results.map((product) => product.type.name);
      setDistinctTypes(Array.from(new Set(types)));

      const subtypes = results.map((product) => product.SubType.name);
      setDistinctSubTypes(Array.from(new Set(subtypes)));

      const patterns = results.map((product) => product.pattern.name);
      setDistinctPatterns(Array.from(new Set(patterns)));

      const colors = results.map((product) => product.color.name);
      setDistinctColors(Array.from(new Set(colors)));
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

        {/* Weave */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl font-medium ">
            WEAVE
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {/* {distinctOccassions.map((occassion) => (
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
                    ))} */}
              <div className="flex items-center">
                <input type="checkbox" id="weave" />
                <label htmlFor="weave" className="ml-2">
                  Handloom
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="weave" />
                <label htmlFor="weave" className="ml-2">
                  Powerloom
                </label>
              </div>
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

        {/* Subtypes */}
        {/* <AccordionItem value="item-4">
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
              </AccordionItem> */}

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
              {/* {distinctColors.map((color) => (
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
                    ))} */}
              <div className="flex items-center">
                <input type="checkbox" id="weave" />
                <label htmlFor="weave" className="ml-2">
                  Fast Zari
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="weave" />
                <label htmlFor="weave" className="ml-2">
                  Metallic Zari
                </label>
              </div>
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
              {/* {distinctColors.map((color) => (
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
                    ))} */}

              <div className="flex items-center">
                <input type="checkbox" id="weave" />
                <label htmlFor="weave" className="ml-2">
                  Zari Lines
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="weave" />
                <label htmlFor="weave" className="ml-2">
                  Ghicha
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="weave" />
                <label htmlFor="weave" className="ml-2">
                  Hand Block Print
                </label>
              </div>
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
              {/* {distinctColors.map((color) => (
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
                    ))} */}
              <div className="flex items-center">
                <input type="checkbox" id="weave" />
                <label htmlFor="weave" className="ml-2">
                  Narali
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="weave" />
                <label htmlFor="weave" className="ml-2">
                  Narmada & Chatai
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="weave" />
                <label htmlFor="weave" className="ml-2">
                  Kadiyal
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
