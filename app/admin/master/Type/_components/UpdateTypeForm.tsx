"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Type } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import ImageUpload from "@/components/ui/image-upload";
import Header from "@/components/ui/header";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string().min(2),
  bannerUrl: z.string().min(2),
});

type TypeFormValues = z.infer<typeof formSchema>;

interface TypeUpdateFormProps {
  initialData: Type;
  onCancel: () => void;
}

export const UpdateTypeForm: React.FC<TypeUpdateFormProps> = ({
  onCancel,
  initialData,
}) => {
  const form = useForm<TypeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      imageUrl: initialData.imageUrl,
      bannerUrl: initialData.bannerUrl,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [SelectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );
  const [SelectedFabric, setSelectedFabric] = useState<string | undefined>("");
  const [categories, setCategories] = useState([]);
  const [Fabrics, setFabrics] = useState([]);

  const handleUpdate = async (data: TypeFormValues) => {
    const values = {
      name: data.name,
      imageUrl: data.imageUrl,
      bannerUrl: data.bannerUrl,
      categoryId: SelectedCategory,
      fabricId: SelectedFabric,
    };
    try {
      setLoading(true);
      await axios.patch(`/api/type/${initialData.id} `, values);
      router.refresh();

      toast.success("Type Updated Successfully");
      location.reload();
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const categoryRes = await fetch(`/api/category`);
      const Category = await categoryRes.json();
      setCategories(Category);
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchFabrics = async () => {
      if (SelectedCategory) {
        const fabricRes = await fetch(
          `/api/category/${SelectedCategory}/fabric`
        );
        const Fabric = await fabricRes.json();
        setFabrics(Fabric);
      }
    };

    fetchFabrics();
  }, [SelectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleFabricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFabric(e.target.value);
  };
  return (
    <div>
      <div className="mb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="category"
                id="category"
                // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
                className="p-2 border-black border-[1px] rounded-lg"
                onChange={handleCategoryChange}
              >
                {categories.length === 0 ? (
                  <option>No Category Available</option>
                ) : (
                  <option>Please Select A Category</option>
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
              <select
                name="category"
                id="category"
                // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
                className="p-2 border-black border-[1px] rounded-lg"
                onChange={handleFabricChange}
              >
                {Fabrics.length === 0 ? (
                  <option>No Fabric Available</option>
                ) : (
                  <option>Please Select A Fabric</option>
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

            <div className="md:grid gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Saari Type name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:grid gap-8">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        disabled={loading}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:grid gap-8">
              <FormField
                control={form.control}
                name="bannerUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        disabled={loading}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <EditServiceLocationForm
              initialData={initialData.serviceAddress}
              sendDataToParent={handleDataFromChild}
            /> */}
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
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
