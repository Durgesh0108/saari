// @ts-nocheck

"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "@/components/ui/header";
import { useRouter } from "next/navigation";
import {
  Category,
  Color,
  Fabric,
  Occassion,
  Pattern,
  Type,
} from "@prisma/client";
import { colors } from "@mui/material";

const formSchema = z.object({
  name: z.string().min(1),
  qty: z.coerce.number().min(1),
  // price: z.coerce.number().min(1),
  // offer_price: z.coerce.number().min(1),
  // size_value: z.coerce.number().min(1),
  shortDescription: z.string().min(1),
  // features: z.string().min(1),
  // images: z.object({ url: z.string() }).array(),
  images: z.array(z.string().url()),
});

type ProductFormValues = z.infer<typeof formSchema>;

export default function ProductFormPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [Occassions, setOccassions] = useState<Occassion[]>([]);
  const [Fabrics, setFabrics] = useState<Fabric[]>([]);
  const [Patterns, setPatterns] = useState<Pattern[]>([]);
  const [Types, setTypes] = useState<Type[]>([]);
  const [SubTypes, setSubTypes] = useState([]);
  const [Colors, setColors] = useState<Color[]>([]);

  //////////////
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOccassion, setSelectedOccassion] = useState<string | null>(
    null
  );
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [selectedBlouseColor, setSelectedBlouseColor] = useState<string | null>(
    null
  );
  const [selectedPalluColor, setSelectedPalluColor] = useState<string | null>(
    null
  );

  const [price, setPrice] = useState<number | 0>();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      // features: "",
      // qty: 0,
    },
  });

  const handleSubmit = async (values: ProductFormValues) => {
    console.log(form.getValues());

    try {
      setLoading(true);
      const data = {
        categoryId: selectedCategory === null ? null : selectedCategory,
        occassionId: selectedOccassion === null ? null : selectedOccassion,
        patternId: selectedPattern === null ? null : selectedPattern,
        fabricId: selectedFabric === null ? null : selectedFabric,
        typeId: selectedType === null ? null : selectedType,
        subTypeId: selectedSubType === null ? null : selectedSubType,
        colorId: selectedColor === null ? null : selectedColor,
        blouseColorId:
          selectedBlouseColor === null ? null : selectedBlouseColor,
        palluColorId: selectedPalluColor === null ? null : selectedPalluColor,
        name: values.name,
        qty: values.qty,
        price: price,
        shortDescription: values.shortDescription,
        images: values.images,
        // size_value: values.size_value,
        // features: values.features,
        // discountId: selectedDiscount === null ? null : selectedDiscount,
        // offer_price: selectedDiscount ? new_offer_price : price,
        // sizeId: selectedSize === null ? null : selectedSize,
        // colorId: selectedColor === null ? null : selectedColor,
        // PersonCategoryId:
        //   selectedPersonCategory === null ? null : selectedPersonCategory,
        // materialId: selectedMaterial === null ? null : selectedMaterial,
        // patternId: selectedPattern === null ? null : selectedPattern,
      };
      const response = await axios.post(`/api/website/product`, data);
      toast.success("Product Added Successfully");
      router.push(`/admin/website/product/${response.data.id}`);
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Check if the input is a valid number or empty string
    if (/^\d*$/.test(value) || value === "") {
      setPrice(value === "" ? 0 : parseInt(value, 10));
    }
    // setPrice(value);
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

  // Colors

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
  //

  // let new_offer_price: number = price || 0;
  // // @ts-ignore
  // if (OneDiscount?.discount) {
  //   const discount_price =
  //     // @ts-ignore
  //     (parseInt(price) * parseInt(OneDiscount.discount)) / 100;
  //   // @ts-ignore
  //   new_offer_price = price - discount_price;
  // }

  return (
    // <div className="flex flex-col gap-4">
    // 	<h1 className="text-4xl font-bold">Advertisement</h1>
    // 	<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    // 		<div className="rounded-lg border-black border-2 p-8">
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-semibold">Add Products</h1> */}
        <Header>Add Product</Header>
        {!isEditing && (
          <Button className="flex" onClick={() => setIsEditing(true)}>
            <Plus />
            New
          </Button>
        )}
      </div>

      {isEditing && (
        <div className="mb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 w-full grid grid-cols-1 gap-2"
            >
              {/* Categories and Brand */}
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
              </div>
              {/* Name and Inventry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:grid gap-8 ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Product name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="md:grid gap-8 ">
                  <FormField
                    control={form.control}
                    name="qty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity / Inventory</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Product Quantity / Inventory"
                            {...field}
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Price */}
              <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                <div className="flex flex-col gap-4 mt-1">
                  {/* <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="flex flex-col mt-2 gap-1">
                      <FormControl>
                      <Input
                      disabled={loading}
                      placeholder="Product Price"
                      {...field}
                      type="number"
                    /> */}
                  <FormLabel>Price</FormLabel>
                  <input
                    className="p-2 border-[2px] text-sm rounded-lg active:ring-2 ring-black placeholder:text-muted-foreground"
                    type="text"
                    value={price === 0 ? 0 : price}
                    onChange={handlePriceChange}
                    disabled={loading}
                    placeholder="Product Price"
                  />
                  {/* </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
                {/* <div className="flex flex-col gap-4 mt-1">
                  <FormLabel>Discount</FormLabel>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handleDiscountChange}
                  >
                    {Discounts.length === 0 ? (
                      <option>No Discount Available</option>
                    ) : (
                      <option>Please Select Discount</option>
                    )}
                    {Discounts.map((discount) => (
                      <option
                        value={discount.id}
                        key={discount.id}
                        className="px-4 py-1"
                      >
                        {discount.discount} %
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-4 mt-1">
                  <FormLabel>Offer Price</FormLabel>
                  <input
                    className="p-2 border-[2px] text-sm  rounded-lg active:ring-2 ring-black placeholder:text-muted-foreground"
                    type="number"
                    value={new_offer_price || 0}
                    disabled={loading}
                    placeholder="Offer Price"
                  />
                </div> */}
              </div>
              {/* Size */}
              {/* {selectedCategory === Patterns[0]?.categoryId && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                    <div className="flex flex-col gap-4 mt-1">
                      <FormLabel>Unit</FormLabel>
                      <select
                        name="category"
                        id="category"
                        className="p-2 border-black border-[1px] rounded-lg"
                        onChange={handleSizeChange}
                      >
                        {sizes.length === 0 ? (
                          <option>No Sizes Available</option>
                        ) : (
                          <option>Please Select Size</option>
                        )}
                        {sizes.map((size) => (
                          <option
                            value={size.id}
                            key={size.id}
                            className="px-4 py-1"
                          >
                            {size.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:grid gap-8 ">
                      <FormField
                        control={form.control}
                        name="size_value"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                              <div className="flex items-center relative">
                                <Input
                                  disabled={loading}
                                  placeholder="Size"
                                  {...field}
                                />
                                <span className="absolute right-4 lg:right-16 md:right-8">
                                  {Size?.name}
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </>
              )} */}
              {/* Descriptions */}
              <div className="grid grid-cols-1 gap-4">
                <div className="md:grid gap-8 ">
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Short Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <div className="md:grid gap-8 ">
                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Features</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Features"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
              </div>

              {/* Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

              {/* Images*/}
              <div className="md:grid gap-8">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          disabled={loading}
                          onChange={(urls) => field.onChange(urls)}
                          onRemove={(url) =>
                            field.onChange(
                              field.value.filter((image) => image !== url)
                            )
                          }
                        />
                        {/* <ImageUpload
                          value={field.value.map(
                            (image: { url: string }) => image.url
                          )} // Ensure correct mapping
                          disabled={loading}
                          onChange={(urls) =>
                            field.onChange(urls.map((url) => ({ url })))
                          } // Ensure correct mapping
                          onRemove={(url) =>
                            field.onChange(
                              field.value.filter(
                                (current: { url: string }) =>
                                  current.url !== url
                              )
                            )
                          }
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Buttons */}
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
  );
}
