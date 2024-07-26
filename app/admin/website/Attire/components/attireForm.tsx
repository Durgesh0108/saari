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
  images: z.array(z.string().url()),
});

type AttireFormValues = z.infer<typeof formSchema>;

export default function AttireForm({ DressStyles, topViews }) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [SelectedDressStyle, setSelectedDressStyle] = useState<
    string | undefined
  >("");
  const [SelectedTopView, setSelectedTopView] = useState<string | undefined>(
    ""
  );

  const form = useForm<AttireFormValues>({
    resolver: zodResolver(formSchema),
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: AttireFormValues) => {
    const data = {
      images: values.images,
      dressStyleId: SelectedDressStyle,
      topViewId: SelectedTopView,
    };
    try {
      setLoading(true);
      const response = await axios.post(`/api/website/attire`, data);
      toggleEdit();
      location.reload();
      toast.success("Attire Created Successfully");
    } catch (error: any) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDressStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDressStyle(e.target.value);
  };
  const handleTopViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopView(e.target.value);
  };

  return (
    <Card className="p-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <Header>Attire</Header>
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
                    onChange={handleDressStyleChange}
                  >
                    {DressStyles.length === 0 ? (
                      <option>No Dress Style Available</option>
                    ) : (
                      <option>Please Select A Dress Style</option>
                    )}
                    {DressStyles.map((dress) => (
                      <option
                        value={dress.id}
                        key={dress.id}
                        className="px-4 py-1"
                      >
                        {dress.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handleTopViewChange}
                  >
                    {topViews.length === 0 ? (
                      <option>No Top View Available</option>
                    ) : (
                      <option>Please Select A Top View</option>
                    )}
                    {topViews.map((topview) => (
                      <option
                        value={topview.id}
                        key={topview.id}
                        className="px-4 py-1"
                      >
                        {topview.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:grid gap-8">
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attire Images</FormLabel>
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
