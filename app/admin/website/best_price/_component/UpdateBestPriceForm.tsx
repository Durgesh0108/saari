"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
  imageUrl: z.array(z.string().url()),
  min: z.string().min(0),
  max: z.string().min(2),
  name: z.string().min(2),
});

type BestPriceFormValues = z.infer<typeof formSchema>;

export const UpdateBestPriceForm = ({ initialData, onCancel }) => {
  const form = useForm<BestPriceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: [initialData.imageUrl],
      min: initialData.min,
      max: initialData.max,
      name: initialData.name,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (data: BestPriceFormValues) => {
    const values = {
      imageUrl: data.imageUrl[0],
      min: data.min,
      max: data.max,
      name: data.name,
    };
    try {
      setLoading(true);
      await axios.patch(`/api/website/best_price/${initialData.id} `, values);
      router.refresh();

      toast.success("BestPrice Updated Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      location.reload();
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4 w-full"
          >
            <div className="md:grid gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Text" {...field} />
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:grid gap-8">
              <FormField
                control={form.control}
                name="min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Min Price"
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
                name="max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Max Price"
                        {...field}
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
