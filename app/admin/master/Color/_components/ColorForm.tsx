"use client";
import { Card } from "@/components/ui/Card";

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
import ImageUpload from "@/components/ui/image-upload";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2),
  hexCode: z.string().min(2),
  bannerUrl: z.array(z.string().url()).optional(),
});

type ColorFormValues = z.infer<typeof formSchema>;

export default function ColorForm() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hexCode: "",
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: ColorFormValues) => {
    const values = {
      name: data.name,
      hexCode: data.hexCode,
      bannerUrl: data.bannerUrl ? data.bannerUrl[0] : "",
    };
    try {
      setLoading(true);
      const response = await axios.post(`/api/color`, values);
      toggleEdit();
      // router.refresh();

      location.reload();
      toast.success("Color Created Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="p-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <Header>Color</Header>
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
                            placeholder="Color name"
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
                    name="hexCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hex Code</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Color Code (#000000)"
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
