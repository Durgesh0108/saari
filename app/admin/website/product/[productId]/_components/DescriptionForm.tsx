"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

const formSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});

type ProductDescriptionForm = z.infer<typeof formSchema>;

interface ProductDescriptionFormProps {
  productId: string;
}

export const ProductDescriptionForm = ({
  productId,
}: ProductDescriptionFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProductDescriptionForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: "",
      value: "",
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: ProductDescriptionForm) => {
    const data = {
      ...values,
      //   serviceId: serviceId,
    };

    try {
      setLoading(true);
      console.log(data)
      const response = await axios.post(
        `/api/website/product/${productId}/description`,
        data
      );
      toggleEdit();
      location.reload();
      toast.success("Description Added");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={"flex flex-col gap-8 p-4 bg-slate-100 border-2"}>
      <div className="flex justify-between items-center">
        <h1 className="">Description Form</h1>
        {/* <Header>Category</Header> */}
        {!isEditing && (
          <Button
            className="flex text-sm justify-between"
            onClick={() => setIsEditing(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        )}
      </div>
      {isEditing && (
        <div className="mb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            placeholder="key"
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
    </Card>
  );
};
