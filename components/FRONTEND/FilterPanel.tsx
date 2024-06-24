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

export default function FilterPanel({
  results,
  filters,
  setFilters,
  handleResetFilters,
}) {
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [distinctOccasions, setDistinctOccasions] = useState([]);
  const [distinctTypes, setDistinctTypes] = useState([]);
  const [distinctSubTypes, setDistinctSubTypes] = useState([]);
  const [distinctPatterns, setDistinctPatterns] = useState([]);
  const [distinctColors, setDistinctColors] = useState([]);

  useEffect(() => {
    const fetchDistinctFilters = () => {
      const categories = results.map((product) => product.category.name);
      setDistinctCategories(Array.from(new Set(categories)));

      const occasions = results.map((product) => product.occassion.name);
      setDistinctOccasions(Array.from(new Set(occasions)));

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

  return (
    <div className="block col-span-2 h-full p-4 md:p-8 sticky">
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
      <Accordion className="mb-4" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-medium">
            CATEGORY
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {distinctCategories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category}
                    name="category"
                    value={category}
                    checked={filters.category.includes(category)}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                  />
                  <label htmlFor={category} className="ml-2">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl font-medium">
            OCCASION
          </AccordionTrigger>
          <AccordionContent className="text-lg font-medium">
            <div>
              {distinctOccasions.map((occasion) => (
                <div key={occasion} className="flex items-center">
                  <input
                    type="checkbox"
                    id={occasion}
                    name="occasion"
                    value={occasion}
                    checked={filters.occasion.includes(occasion)}
                    onChange={(e) =>
                      handleFilterChange("occasion", e.target.value)
                    }
                  />
                  <label htmlFor={occasion} className="ml-2">
                    {occasion}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
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

        <AccordionItem value="item-4">
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
        </AccordionItem>

        <AccordionItem value="item-5">
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

        <AccordionItem value="item-6">
          <AccordionTrigger className="text-xl font-medium">
            PATTERN
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
      </Accordion>
    </div>
  );
}
