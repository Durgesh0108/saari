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

const formSchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string().min(2),
  bannerUrl: z.string().min(2),
});

type CategoryFormValues = z.infer<typeof formSchema>;

export default function OccassionForm() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/occassion`, data);
      toggleEdit();
      location.reload();
      toast.success("Occassion Created Successfully");
    } catch (error: any) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="p-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <Header>Occassion</Header>
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
                            placeholder="Occassion name"
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
                        <FormLabel>Occassion Image</FormLabel>
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
