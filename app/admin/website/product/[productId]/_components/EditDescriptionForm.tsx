"use client";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, Plus, PlusCircle } from "lucide-react";
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

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/ui/header";
import { toast } from "react-hot-toast";
import {Card} from "@/components/ui/Card";
import ImageUpload from "@/components/ui/image-upload";
import {
  Description,
} from "@prisma/client";
import Image from "next/image";

const formSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});

type ProductDescriptionForm = z.infer<typeof formSchema>;

interface ProductDescriptionFormProps {
  productId: string;
  initialData: Description;
}

export const EditProductDescriptionForm = ({
  productId,
  initialData,
}: ProductDescriptionFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProductDescriptionForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: initialData.key,
      value: initialData.value,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: ProductDescriptionForm) => {
    const data = {
      ...values,
    };

    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/website/product/${productId}/description/${initialData.id}`,
        data
      );
      toggleEdit();
      location.reload();
      toast.success("Description Updated");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <Card className={"flex flex-col gap-6 p-4 border-2"}>
    <div className=" border bg-slate-100 rounded-md p-4 w-full">
      <div className="flex  justify-between w-full">
        {!isEditing && (
          <div className="relative flex gap-2">
            <Input disabled={true} placeholder="Key" value={initialData.key} />
            <Input
              disabled={true}
              placeholder="Value"
              value={initialData.value}
            />
          </div>
        )}
        {!isEditing && initialData && (
          <div className="text-sm lg:text-base font-medium flex items-center justify-between">
            <Button onClick={toggleEdit} variant="ghost">
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Description
              </>
            </Button>
          </div>
        )}
      </div>
      {isEditing && (
        <div className="mb-4 w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full flex items-center justify-between"
            >
              <div className="flex gap-4">
                <div className="md:grid gap-8">
                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Key"
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
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Value"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
