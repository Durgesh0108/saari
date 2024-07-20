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

type ColorProductForm = z.infer<typeof formSchema>;

export const ColorProductForm = ({
  productId,
  initialdata,

  Color,
}) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [colors, setColors] = useState<Color[]>(Color);

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

  const form = useForm<ColorProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialdata.name,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: ColorProductForm) => {
    const data = {
      colorId: selectedColor === null ? null : selectedColor,
      blouseColorId: selectedBlouseColor === null ? null : selectedBlouseColor,
      palluColorId: selectedPalluColor === null ? null : selectedPalluColor,
      borderColorId: selectedBorderColor === null ? null : selectedBorderColor,
      zariColorId: selectedZariColor === null ? null : selectedZariColor,
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

  return (
    // <Card className={"flex flex-col gap-6 p-4 border-2"}>
    <div className="border bg-slate-100 rounded-md p-4 ">
      <div className="text-sm lg:text-base font-medium flex items-center justify-between">
        Product Color
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

          <div className="flex flex-col gap-2">
            <label>Border Color</label>
            <Input
              disabled={true}
              placeholder="color name"
              value={
                initialdata.borderColor ? initialdata.borderColor.name : ""
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Zari Color</label>
            <Input
              disabled={true}
              placeholder="color name"
              value={initialdata.zariColor ? initialdata.zariColor.name : ""}
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
