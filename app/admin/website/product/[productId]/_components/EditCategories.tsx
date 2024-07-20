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

export const CategoriesProductForm = ({
  productId,
  initialdata,
  Occassion,
  Category,
  Weave,
}) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [weaves, setWeaves] = useState(Weave);
  const [weaveTypes, setWeaveTypes] = useState([]);
  const [categories, setCategories] = useState<Category[]>(Category);
  const [occassions, setOccassions] = useState<Occassion[]>(Occassion);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [subTypes, setSubTypes] = useState<SubType[]>([]);

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
      occassionId: selectedOccassion === null ? null : selectedOccassion,
      patternId: selectedPattern === null ? null : selectedPattern,
      fabricId: selectedFabric === null ? null : selectedFabric,
      typeId: selectedType === null ? null : selectedType,
      subTypeId: selectedSubType === null ? null : selectedSubType,

      weaveId: selectedWeave === null ? null : selectedWeave,
      weaveTypeId: selectedWeaveType === null ? null : selectedWeaveType,
      borderId: selectedBorder === null ? null : selectedBorder,
      palluMotifId: selectedPalluMotif === null ? null : selectedPalluMotif,
      zariId: selectedZari === null ? null : selectedZari,
      sareeMotifId: selectedSareeMotif === null ? null : selectedSareeMotif,
      buttiTypeId: selectedButtiType === null ? null : selectedButtiType,
      blousePatternId:
        selectedBlousePattern === null ? null : selectedBlousePattern,
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

  return (
    // <Card className={"flex flex-col gap-6 p-4 border-2"}>
    <div className="border bg-slate-100 rounded-md p-4 ">
      <div className="text-sm lg:text-base font-medium flex items-center justify-between">
        Product Category
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
            <label>Weave</label>
            <Input
              disabled={true}
              placeholder="Weave name"
              value={initialdata.weave ? initialdata.weave.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Weave Type</label>
            <Input
              disabled={true}
              placeholder="Weave Type name"
              value={initialdata.weaveType ? initialdata.weaveType.name : ""}
            />
          </div>
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
            <label>Border</label>
            <Input
              disabled={true}
              placeholder="Border name"
              value={initialdata.border ? initialdata.border.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Pallu Motif</label>
            <Input
              disabled={true}
              placeholder="Pallu Motif name"
              value={initialdata.palluMotif ? initialdata.palluMotif.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Zari</label>
            <Input
              disabled={true}
              placeholder="Zari name"
              value={initialdata.zari ? initialdata.zari.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Saree Motif</label>
            <Input
              disabled={true}
              placeholder="Saree Motif name"
              value={initialdata.sareeMotif ? initialdata.sareeMotif.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Butti Type</label>
            <Input
              disabled={true}
              placeholder="Butti Type name"
              value={initialdata.buttiType ? initialdata.buttiType.name : ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Blouse Pattern</label>
            <Input
              disabled={true}
              placeholder="Blouse Pattern name"
              value={
                initialdata.blousePattern ? initialdata.blousePattern.name : ""
              }
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
            <label>Pattern</label>
            <Input
              disabled={true}
              placeholder="Pattern name"
              value={initialdata.pattern ? initialdata.pattern.name : ""}
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
                {/* Type */}
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
