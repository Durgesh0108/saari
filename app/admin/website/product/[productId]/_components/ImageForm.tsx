"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import React, { useState } from "react";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/ui/image-upload";
import Image from "next/image";

const formSchema = z.object({
  images: z.object({ url: z.string() }).array(),
});

type ImageProductForm = z.infer<typeof formSchema>;

interface ImageProductFormProps {
  productId: string;
  imageUrl: string;
}

export const ImageProductForm = ({
  productId,
  imageUrl,
}: ImageProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ImageProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // @ts-ignore
      images: imageUrl,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: ImageProductForm) => {
    const data = {
      ...values,
      //   productId: productId,
    };

    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/website/product/${productId}/image`,
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

  return (
    // <Card className={"flex flex-col gap-6 p-4 border-2"}>
    <div className="border bg-slate-100 rounded-md p-4 ">
      <div className="text-sm lg:text-base font-medium flex items-center justify-between">
        Company Image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}

          {!isEditing && imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="relative aspect-video mt-2">
          <Image
            alt="Upload"
            fill
            className="object-cover rounded-md"
            // @ts-ignore
            src={imageUrl[0]?.url}
            loading="lazy"
          />
        </div>
      )}
      {isEditing && (
        <div className="mb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="md:grid gap-8">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value.map((image) => image.url)}
                          disabled={loading}
                          onChange={(url) =>
                            field.onChange([...field.value, { url }])
                          }
                          onRemove={(url) =>
                            field.onChange([
                              ...field.value.filter(
                                (current) => current.url !== url
                              ),
                            ])
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
    // </Card>
  );
};
