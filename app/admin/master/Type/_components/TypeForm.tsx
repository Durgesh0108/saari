"use client";
import { Card } from "@/components/ui/Card";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
import Header from "@/components/ui/header";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  name: z.string().min(2),
  imageUrl: z.array(z.string().url()),
  bannerUrl: z.array(z.string().url()).optional(),
});

type TypeFormValues = z.infer<typeof formSchema>;

export default function TypeForm() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [SelectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );
  const [SelectedFabric, setSelectedFabric] = useState<string | undefined>("");
  const [categories, setCategories] = useState([]);
  const [Fabrics, setFabrics] = useState([]);

  const form = useForm<TypeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: TypeFormValues) => {
    const data = {
      name: values.name,
      imageUrl: values.imageUrl ? values.imageUrl[0] : "",
      bannerUrl: values.bannerUrl ? values.bannerUrl[0] : "",
      categoryId: SelectedCategory,
      fabricId: SelectedFabric,
    };
    try {
      setLoading(true);
      const response = await axios.post(`/api/type`, data);
      toggleEdit();
      location.reload();
      toast.success("Saari Type Created Successfully");
    } catch (error: any) {
      toast.error("Something Went Wrong");
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
    <Card className="p-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <Header>Type</Header>
          {!isEditing && (
            <Button className="flex" onClick={() => setIsEditing(true)}>
              <Plus />
              New
            </Button>
          )}
        </div>
        {isEditing && (
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
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
                        <FormLabel>Name</FormLabel>
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
                            value={field.value}
                            disabled={loading}
                            onChange={(urls) => field.onChange(urls)}
                            onRemove={(url) =>
                              field.onChange(
                                field.value.filter((image) => image !== url)
                              )
                            }
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
                            value={field.value}
                            disabled={loading}
                            onChange={(urls) => field.onChange(urls)}
                            onRemove={(url) =>
                              field.onChange(
                                field.value.filter((image) => image !== url)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
    </Card>
  );
}
