// @ts-nocheck

"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Product } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1),
});

type CategoriesProductForm = z.infer<typeof formSchema>;

interface CategoriesProductFormProps {
  productId: string;
  initialdata: Product;
}

export const CategoriesProductForm = ({
  productId,
  initialdata,
}: CategoriesProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [Fabrics, setFabrics] = useState<Category[]>([]);
  const [Occassions, setOccassions] = useState<Occassion[]>([]);
  const [Patterns, setPatterns] = useState<Pattern[]>([]);
  const [Types, setTypes] = useState<Type[]>([]);
  const [SubTypes, setSubTypes] = useState([]);
  const [Colors, setColors] = useState<Color[]>([]);

  //////////////
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [selectedOccassion, setSelectedOccassion] = useState<string | null>(
    null
  );
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [selectedBlouseColor, setSelectedBlouseColor] = useState<string | null>(
    null
  );
  const [selectedPalluColor, setSelectedPalluColor] = useState<string | null>(
    null
  );

  const form = useForm<CategoriesProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialdata.name,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: CategoriesProductForm) => {
    const data = {
      categoryId: selectedCategory === null ? null : selectedCategory,
      fabricId: selectedFabric === null ? null : selectedFabric,
      occassionId: selectedOccassion === null ? null : selectedOccassion,
      patternId: selectedPattern === null ? null : selectedPattern,
      typeId: selectedType === null ? null : selectedType,
      subTypeId: selectedSubType === null ? null : selectedSubType,
      colorId: selectedColor === null ? null : selectedColor,
      blouseColorId: selectedBlouseColor === null ? null : selectedBlouseColor,
      palluColorId: selectedPalluColor === null ? null : selectedPalluColor,
    };

    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/website/product/${productId}`,
        data
      );
      toggleEdit();
      location.reload();
      toast.success("Product Updated");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Category
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryRes = await fetch(`/api/category`);
      const category = await categoryRes.json();
      setCategories(category);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  //

  // Occassion

  useEffect(() => {
    const fetchOccassion = async () => {
      const OccassionRes = await fetch(`/api/occassion`);
      const Occassion = await OccassionRes.json();
      setOccassions(Occassion);
    };

    fetchOccassion();
  }, []);

  const handleOccassionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOccassion(e.target.value);
  };

  //

  //Pattern

  useEffect(() => {
    const fetchPatterns = async () => {
      if (selectedCategory) {
        const PatternRes = await fetch(
          `/api/category/${selectedCategory}/pattern`
        );
        const Pattern = await PatternRes.json();
        setPatterns(Pattern);
      }
    };

    fetchPatterns();
  }, [selectedCategory]);

  const handlePatternChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPattern(e.target.value);
  };
  //

  //Fabric

  useEffect(() => {
    const fetchFabric = async () => {
      if (selectedCategory) {
        const fabricRes = await fetch(
          `/api/category/${selectedCategory}/fabric`
        );
        const Fabric = await fabricRes.json();
        setFabrics(Fabric);
      }
    };

    fetchFabric();
  }, [selectedCategory]);

  const handleFabricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFabric(e.target.value);
  };
  //

  // Brands

  useEffect(() => {
    const fetchTypes = async () => {
      if (selectedFabric) {
        const TypeRes = await fetch(`/api/fabric/${selectedFabric}/type`);
        const Types = await TypeRes.json();
        setTypes(Types);
      }
      // setSelectedCategory(data[0]?.id);
    };

    fetchTypes();
  }, [selectedFabric]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  // SubType

  useEffect(() => {
    const fetchSubTypes = async () => {
      if (selectedType) {
        const subTypeRes = await fetch(`/api/type/${selectedType}/subType`);
        const SubType = await subTypeRes.json();
        setSubTypes(SubType);
      }
    };

    fetchSubTypes();
  }, [selectedType]);

  const handleSubTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubType(e.target.value);
  };

  // Color

  useEffect(() => {
    const fetchColors = async () => {
      const ColorRes = await fetch(`/api/color`);
      const Colors = await ColorRes.json();
      setColors(Colors);
    };

    fetchColors();
  }, []);

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
  };

  const handleBlouseColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBlouseColor(e.target.value);
  };

  const handlePalluColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPalluColor(e.target.value);
  };

  return (
    // <Card className={"flex flex-col gap-6 p-4 border-2"}>
    <div className="border bg-slate-100 rounded-md p-4 ">
      <div className="text-sm lg:text-base font-medium flex items-center justify-between">
        Product Name
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}

          {!isEditing && initialdata && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Details
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="relative mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label>Catgeory</label>
            <Input
              disabled={true}
              placeholder="Category name"
              value={initialdata.category ? initialdata.category.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Fabric</label>
            <Input
              disabled={true}
              placeholder="Fabric name"
              value={initialdata.fabric ? initialdata.fabric.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Occassion</label>
            <Input
              disabled={true}
              placeholder="Occassion name"
              value={initialdata.occassion ? initialdata.occassion.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Type</label>
            <Input
              disabled={true}
              placeholder="Type name"
              value={initialdata.type ? initialdata.type.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Sub Type</label>
            <Input
              disabled={true}
              placeholder="Sub Type name"
              value={initialdata.SubType ? initialdata.SubType.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Pattern</label>
            <Input
              disabled={true}
              placeholder="Pattern name"
              value={initialdata.pattern ? initialdata.pattern.name : ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Color</label>
            <Input
              disabled={true}
              placeholder="color name"
              value={initialdata.color ? initialdata.color.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Blouse Color</label>
            <Input
              disabled={true}
              placeholder="color name"
              value={
                initialdata.blouseColor ? initialdata.blouseColor.name : ""
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Blouse Color</label>
            <Input
              disabled={true}
              placeholder="color name"
              value={initialdata.palluColor ? initialdata.palluColor.name : ""}
            />
          </div>
        </div>
      )}
      {isEditing && (
        <div className="mb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <FormLabel>Category</FormLabel>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handleCategoryChange}
                  >
                    {categories.length === 0 ? (
                      <option>No Category Available</option>
                    ) : (
                      <option>Please Select Category</option>
                    )}
                    {categories.map((category) => (
                      <option
                        value={category.id}
                        key={category.id}
                        className="px-4 py-1"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel>Occassion</FormLabel>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handleOccassionChange}
                  >
                    {Occassions.length === 0 ? (
                      <option>No Occassion Available</option>
                    ) : (
                      <option>Please Select Occassion</option>
                    )}
                    {Occassions.map((occasion) => (
                      <option
                        value={occasion.id}
                        key={occasion.id}
                        className="px-4 py-1"
                      >
                        {occasion.name}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedCategory === Fabrics[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Fabric</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleFabricChange}
                    >
                      {Fabrics.length === 0 ? (
                        <option>No Fabric Available</option>
                      ) : (
                        <option>Please Select Fabric</option>
                      )}
                      {Fabrics.map((fabric) => (
                        <option
                          value={fabric.id}
                          key={fabric.id}
                          className="px-4 py-1"
                        >
                          {fabric.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedCategory === Types[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Type</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleTypeChange}
                    >
                      {Types.length === 0 ? (
                        <option>No Type Available</option>
                      ) : (
                        <option>Please Select Type</option>
                      )}
                      {Types.map((type) => (
                        <option
                          value={type.id}
                          key={type.id}
                          className="px-4 py-1"
                        >
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {selectedType === SubTypes[0]?.typeId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Sub Type</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleSubTypeChange}
                    >
                      {SubTypes.length === 0 ? (
                        <option>No Sub Type Available</option>
                      ) : (
                        <option>Please Select Type</option>
                      )}
                      {SubTypes.map((type) => (
                        <option
                          value={type.id}
                          key={type.id}
                          className="px-4 py-1"
                        >
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {selectedCategory === Patterns[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Pattern</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handlePatternChange}
                    >
                      {Patterns.length === 0 ? (
                        <option>No Pattern Available</option>
                      ) : (
                        <option>Please Select Pattern</option>
                      )}
                      {Patterns.map((pattern) => (
                        <option
                          value={pattern.id}
                          key={pattern.id}
                          className="px-4 py-1"
                        >
                          {pattern.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Color */}
                <div className="flex flex-col gap-2">
                  <FormLabel>Color</FormLabel>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handleColorChange}
                  >
                    {Colors.length === 0 ? (
                      <option>No Colors Available</option>
                    ) : (
                      <option>Please Select Color</option>
                    )}
                    {Colors.map((color) => (
                      <option
                        value={color.id}
                        key={color.id}
                        className="px-4 py-1"
                      >
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Blouse Color */}
                <div className="flex flex-col gap-2">
                  <FormLabel>Blouse Color</FormLabel>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handleBlouseColorChange}
                  >
                    {Colors.length === 0 ? (
                      <option>No Colors Available</option>
                    ) : (
                      <option>Please Select Color</option>
                    )}
                    {Colors.map((color) => (
                      <option
                        value={color.id}
                        key={color.id}
                        className="px-4 py-1"
                      >
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Pallu Color */}
                <div className="flex flex-col gap-2">
                  <FormLabel>Pallu Color</FormLabel>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handlePalluColorChange}
                  >
                    {Colors.length === 0 ? (
                      <option>No Colors Available</option>
                    ) : (
                      <option>Please Select Color</option>
                    )}
                    {Colors.map((color) => (
                      <option
                        value={color.id}
                        key={color.id}
                        className="px-4 py-1"
                      >
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex gap-2">
                  <Button
                    disabled={loading}
                    className="ml-auto"
                    type="submit"
                    variant={"success"}
                  >
                    Save
                  </Button>
                  <Button
                    disabled={loading}
                    className="ml-auto"
                    variant="destructive"
                    type="button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
    // </Card>
  );
};
