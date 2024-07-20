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
  name: z.string().nonempty("Name is required"),
  shortDescription: z.string().nonempty("Short description is required"),
  qty: z.number().min(1, "Quantity must be at least 1"),
  images: z.array(z.string().url("Must be a valid URL")),
});

const ProductFormPage = ({ Category, Color, Occassion, Weave }) => {
  const router = useRouter();

  const [weaves, setWeaves] = useState(Weave);
  const [weaveTypes, setWeaveTypes] = useState([]);
  const [categories, setCategories] = useState<Category[]>(Category);
  const [occassions, setOccassions] = useState<Occassion[]>(Occassion);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [subTypes, setSubTypes] = useState<SubType[]>([]);
  const [colors, setColors] = useState<Color[]>(Color);

  const [borders, setBorders] = useState([]);
  const [palluMotifs, setPalluMotifs] = useState([]);
  const [zaris, setZaris] = useState([]);
  const [sareeMotifs, setSareeMotifs] = useState([]);
  const [buttiTypes, setButtiTypes] = useState([]);
  const [blousePatterns, setBlousePatterns] = useState([]);

  const [selectedWeave, setSelectedWeave] = useState<string | null>(null);
  const [selectedWeaveType, setSelectedWeaveType] = useState<string | null>(
    null
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOccassion, setSelectedOccassion] = useState<string | null>(
    null
  );
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedBlouseColor, setSelectedBlouseColor] = useState<string | null>(
    null
  );
  const [selectedPalluColor, setSelectedPalluColor] = useState<string | null>(
    null
  );
  const [selectedZariColor, setSelectedZariColor] = useState<string | null>(
    null
  );
  const [selectedBorderColor, setSelectedBorderColor] = useState<string | null>(
    null
  );

  const [selectedBorder, setSelectedBorder] = useState<string | null>(null);
  const [selectedPalluMotif, setSelectedPalluMotif] = useState<string | null>(
    null
  );
  const [selectedZari, setSelectedZari] = useState<string | null>(null);
  const [selectedSareeMotif, setSelectedSareeMotif] = useState<string | null>(
    null
  );
  const [selectedButtiType, setSelectedButtiType] = useState<string | null>(
    null
  );
  const [selectedBlousePattern, setSelectedBlousePattern] = useState<
    string | null
  >(null);

  const [price, setPrice] = useState<number | 0>(0);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      qty: 1,
      images: [],
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
        borderColorId:
          selectedBorderColor === null ? null : selectedBorderColor,
        zariColorId: selectedZariColor === null ? null : selectedZariColor,
        weaveId: selectedWeave === null ? null : selectedWeave,
        weaveTypeId: selectedWeaveType === null ? null : selectedWeaveType,
        borderId: selectedBorder === null ? null : selectedBorder,
        palluMotifId: selectedPalluMotif === null ? null : selectedPalluMotif,
        zariId: selectedZari === null ? null : selectedZari,
        sareeMotifId: selectedSareeMotif === null ? null : selectedSareeMotif,
        buttiTypeId: selectedButtiType === null ? null : selectedButtiType,
        blousePatternId:
          selectedBlousePattern === null ? null : selectedBlousePattern,
        name: values.name,
        qty: values.qty,
        price: price,
        shortDescription: values.shortDescription,
        images: values.images,
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
    if (/^\d*$/.test(value) || value === "") {
      setPrice(value === "" ? 0 : parseInt(value, 10));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedFabric(null);
    setSelectedPattern(null);
    setSelectedType(null);
    setSelectedSubType(null);
    setSelectedBorder(null);
    setSelectedPalluMotif(null);
    setSelectedZari(null);
    setSelectedSareeMotif(null);
    setSelectedButtiType(null);
    setSelectedBlousePattern(null);
    if (categoryId) {
      const selectedCategory = categories.find(
        (category) => category.id === categoryId
      );
      if (selectedCategory) {
        setFabrics(selectedCategory.Fabric || []);
        setPatterns(selectedCategory.Pattern || []);

        setBorders(selectedCategory.Border || []);
        setPalluMotifs(selectedCategory.PalluMotif || []);
        setZaris(selectedCategory.Zari || []);
        setSareeMotifs(selectedCategory.SareeMotif || []);
        setButtiTypes(selectedCategory.ButtiType || []);
        setBlousePatterns(selectedCategory.BlousePattern || []);
      }
    } else {
      setFabrics([]);
      setPatterns([]);
      setBorders([]);
      setPalluMotifs([]);
      setZaris([]);
      setSareeMotifs([]);
      setButtiTypes([]);
      setBlousePatterns([]);
    }
  };

  const handleOccassionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOccassion(e.target.value);
  };

  const handleFabricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fabricId = e.target.value;
    setSelectedFabric(fabricId);
    setSelectedType(null);
    setSelectedSubType(null);
    if (fabricId) {
      const selectedFabric = fabrics.find((fabric) => fabric.id === fabricId);
      if (selectedFabric) {
        setTypes(selectedFabric.Type || []);
      }
    } else {
      setTypes([]);
    }
  };

  const handlePatternChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPattern(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = e.target.value;
    setSelectedType(typeId);
    setSelectedSubType(null);
    if (typeId) {
      const selectedType = types.find((type) => type.id === typeId);
      if (selectedType) {
        setSubTypes(selectedType.SubType || []);
      }
    } else {
      setSubTypes([]);
    }
  };

  const handleSubTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubType(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
  };

  const handleBlouseColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBlouseColor(e.target.value);
  };

  const handlePalluColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPalluColor(e.target.value);
  };

  const handleZariColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedZariColor(e.target.value);
  };

  const handleBorderColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBorderColor(e.target.value);
  };

  const handleWeaveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const weaveId = e.target.value;
    setSelectedWeave(weaveId);
    setSelectedWeaveType(null);
    if (weaveId) {
      const selectedWeave = weaves.find((weave) => weave.id === weaveId);
      console.log(selectedWeave);
      if (selectedWeave) {
        setWeaveTypes(selectedWeave.WeaveType || []);
      }
    } else {
      setWeaveTypes([]);
    }
  };

  const handleWeaveTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeaveType(e.target.value);
  };

  const handleBorderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBorder(e.target.value);
  };

  const handlePalluMotifTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPalluMotif(e.target.value);
  };

  const handleZariChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedZari(e.target.value);
  };

  const handleSareeMotifChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSareeMotif(e.target.value);
  };

  const handleButtiTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedButtiType(e.target.value);
  };

  const handleBlousePatternChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedBlousePattern(e.target.value);
  };

  useEffect(() => {
    if (selectedWeave) {
      const weave = weaves.find((weave) => weave.id === selectedWeave);
      if (weave) {
        setWeaveTypes(weave.WeaveType || []);
      }
    } else {
      setWeaveTypes([]);
    }
  }, [selectedWeave, weaves]);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(
        (category) => category.id === selectedCategory
      );
      if (category) {
        setFabrics(category.Fabric || []);
        setPatterns(category.Pattern || []);
        setBorders(category.Border || []);
        setPalluMotifs(category.PalluMotif || []);
        setZaris(category.Zari || []);
        setSareeMotifs(category.SareeMotif || []);
        setButtiTypes(category.ButtiType || []);
        setBlousePatterns(category.BlousePattern || []);
      }
    } else {
      setFabrics([]);
      setPatterns([]);
      setBorders([]);
      setPalluMotifs([]);
      setZaris([]);
      setSareeMotifs([]);
      setButtiTypes([]);
      setBlousePatterns([]);
    }
  }, [selectedCategory, categories]);

  useEffect(() => {
    if (selectedFabric) {
      const fabric = fabrics.find((fabric) => fabric.id === selectedFabric);
      if (fabric) {
        setTypes(fabric.Type || []);
      }
    } else {
      setTypes([]);
    }
  }, [selectedFabric, fabrics]);

  useEffect(() => {
    if (selectedType) {
      const type = types.find((type) => type.id === selectedType);
      if (type) {
        setSubTypes(type.SubType || []);
      }
    } else {
      setSubTypes([]);
    }
  }, [selectedType, types]);
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
                {/* Weave */}
                <div className="flex flex-col gap-2">
                  <FormLabel>Weave</FormLabel>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handleWeaveChange}
                  >
                    {weaves.length === 0 ? (
                      <option>No Weave Available</option>
                    ) : (
                      <option>Please Select Weave</option>
                    )}
                    {weaves.map((weave) => (
                      <option
                        value={weave.id}
                        key={weave.id}
                        className="px-4 py-1"
                      >
                        {weave.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Weave Type*/}
                {selectedWeave === weaveTypes[0]?.weaveId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Weave Type</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleWeaveTypeChange}
                    >
                      {weaveTypes.length === 0 ? (
                        <option>No Weave Type Available</option>
                      ) : (
                        <option>Please Select Weave Type</option>
                      )}
                      {weaveTypes.map((weavetype) => (
                        <option
                          value={weavetype.id}
                          key={weavetype.id}
                          className="px-4 py-1"
                        >
                          {weavetype.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Category */}
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
                {/* Occassion */}
                <div className="flex flex-col gap-2">
                  <FormLabel>Occassion</FormLabel>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handleOccassionChange}
                  >
                    {occassions.length === 0 ? (
                      <option>No Occassion Available</option>
                    ) : (
                      <option>Please Select Occassion</option>
                    )}
                    {occassions.map((occasion) => (
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
                {/* Fabric */}
                {selectedCategory === fabrics[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Fabric</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleFabricChange}
                    >
                      {fabrics.length === 0 ? (
                        <option>No Fabric Available</option>
                      ) : (
                        <option>Please Select Fabric</option>
                      )}
                      {fabrics.map((fabric) => (
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
                {/* Types */}
                {selectedCategory === types[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Type</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleTypeChange}
                    >
                      {types.length === 0 ? (
                        <option>No Type Available</option>
                      ) : (
                        <option>Please Select Type</option>
                      )}
                      {types.map((type) => (
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
                {/* Sub Types */}
                {selectedType === subTypes[0]?.typeId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Sub Type</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleSubTypeChange}
                    >
                      {subTypes.length === 0 ? (
                        <option>No Sub Type Available</option>
                      ) : (
                        <option>Please Select Type</option>
                      )}
                      {subTypes.map((type) => (
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
                {/* Pattern */}
                {selectedCategory === patterns[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Pattern</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handlePatternChange}
                    >
                      {patterns.length === 0 ? (
                        <option>No Pattern Available</option>
                      ) : (
                        <option>Please Select Pattern</option>
                      )}
                      {patterns.map((pattern) => (
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
              </div>

              {/* Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Border */}
                {selectedCategory === borders[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Border</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleBorderChange}
                    >
                      {borders.length === 0 ? (
                        <option>No Border Available</option>
                      ) : (
                        <option>Please Select Border</option>
                      )}
                      {borders.map((border) => (
                        <option
                          value={border.id}
                          key={border.id}
                          className="px-4 py-1"
                        >
                          {border.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Pallu Motif */}
                {selectedCategory === palluMotifs[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Pallu Motif</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handlePalluMotifTypeChange}
                    >
                      {palluMotifs.length === 0 ? (
                        <option>No Pallu Motif Available</option>
                      ) : (
                        <option>Please Select Pallu Motif</option>
                      )}
                      {palluMotifs.map((pallu) => (
                        <option
                          value={pallu.id}
                          key={pallu.id}
                          className="px-4 py-1"
                        >
                          {pallu.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Zari */}
                {selectedCategory === zaris[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Zari</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleZariChange}
                    >
                      {zaris.length === 0 ? (
                        <option>No Zari Available</option>
                      ) : (
                        <option>Please Select Zari</option>
                      )}
                      {zaris.map((zaris) => (
                        <option
                          value={zaris.id}
                          key={zaris.id}
                          className="px-4 py-1"
                        >
                          {zaris.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Saree Motif */}
                {selectedCategory === sareeMotifs[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Saree Motif</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleSareeMotifChange}
                    >
                      {sareeMotifs.length === 0 ? (
                        <option>No Saree Motif Available</option>
                      ) : (
                        <option>Please Select Saree Motif</option>
                      )}
                      {sareeMotifs.map((sareemotif) => (
                        <option
                          value={sareemotif.id}
                          key={sareemotif.id}
                          className="px-4 py-1"
                        >
                          {sareemotif.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Butti Type */}
                {selectedCategory === buttiTypes[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Butti type</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleButtiTypeChange}
                    >
                      {buttiTypes.length === 0 ? (
                        <option>No Butti Type Available</option>
                      ) : (
                        <option>Please Select Butti Type</option>
                      )}
                      {buttiTypes.map((buttitype) => (
                        <option
                          value={buttitype.id}
                          key={buttitype.id}
                          className="px-4 py-1"
                        >
                          {buttitype.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Blouse Pattern */}
                {selectedCategory === blousePatterns[0]?.categoryId && (
                  <div className="flex flex-col gap-2">
                    <FormLabel>Blouse Pattern</FormLabel>
                    <select
                      name="category"
                      id="category"
                      // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                      className="p-2 border-black border-[1px] rounded-lg"
                      onChange={handleBlousePatternChange}
                    >
                      {blousePatterns.length === 0 ? (
                        <option>No Blouse Pattern Available</option>
                      ) : (
                        <option>Please Select Blouse Pattern</option>
                      )}
                      {blousePatterns.map((blousePattern) => (
                        <option
                          value={blousePattern.id}
                          key={blousePattern.id}
                          className="px-4 py-1"
                        >
                          {blousePattern.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Color Dropdowns */}
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
                    {colors.length === 0 ? (
                      <option>No Colors Available</option>
                    ) : (
                      <option>Please Select Color</option>
                    )}
                    {colors.map((color) => (
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
                    {colors.length === 0 ? (
                      <option>No Colors Available</option>
                    ) : (
                      <option>Please Select Color</option>
                    )}
                    {colors.map((color) => (
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
                    {colors.length === 0 ? (
                      <option>No Colors Available</option>
                    ) : (
                      <option>Please Select Color</option>
                    )}
                    {colors.map((color) => (
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
                {/* Zari Color */}
                <div className="flex flex-col gap-2">
                  <FormLabel>Zari Color</FormLabel>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handleZariColorChange}
                  >
                    {colors.length === 0 ? (
                      <option>No Colors Available</option>
                    ) : (
                      <option>Please Select Color</option>
                    )}
                    {colors.map((color) => (
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

                {/* Border Color */}
                <div className="flex flex-col gap-2">
                  <FormLabel>Border Color</FormLabel>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handleBorderColorChange}
                  >
                    {colors.length === 0 ? (
                      <option>No Colors Available</option>
                    ) : (
                      <option>Please Select Color</option>
                    )}
                    {colors.map((color) => (
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
};

export default ProductFormPage;
