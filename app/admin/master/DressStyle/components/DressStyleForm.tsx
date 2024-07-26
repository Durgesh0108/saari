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
import { Editor } from "@/components/editor";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  videoUrl: z.string().min(2),
});

type DressStyleFormValues = z.infer<typeof formSchema>;

export default function DressStyleForm() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<DressStyleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      videoUrl: "",
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: DressStyleFormValues) => {
    const values = {
      name: data.name,
      description: data.description,
      videoUrl: data.videoUrl,
    };

    console.log(values);
    try {
      setLoading(true);
      const response = await axios.post(`/api/dressStyle`, values);
      toggleEdit();
      location.reload();
      toast.success("Dress Style Created Successfully");
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
          <Header>Dress Style</Header>
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
                            placeholder="Dress Style name"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Editor {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:grid gap-8">
                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dress Style Video</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Video Url"
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
    </Card>
  );
}
