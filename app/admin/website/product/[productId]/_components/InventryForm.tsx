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

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Product } from "@prisma/client";

const formSchema = z.object({
  qty: z.coerce.number().min(1),
});

type InventryProductForm = z.infer<typeof formSchema>;

interface InventryProductFormProps {
  productId: string;
  qty: number;
}

export const InventryProductForm = ({
  productId,
  qty,
}: InventryProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<InventryProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      qty: qty,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: InventryProductForm) => {
    const data = {
      ...values,
      //   serviceId: serviceId,
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

  return (
    // <Card className={"flex flex-col gap-6 p-4 border-2"}>
    <div className="border bg-slate-100 rounded-md p-4 ">
      <div className="text-sm lg:text-base font-medium flex items-center justify-between">
        Product Inventry
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}

          {!isEditing && qty && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Inventry
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="relative mt-2">
          <Input disabled={true} placeholder="Product Inventry" value={qty} />
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
                  name="qty"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Name</FormLabel> */}
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Product Inventry"
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
