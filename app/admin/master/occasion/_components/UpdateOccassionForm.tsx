"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Occassion } from "@prisma/client";
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
  name: z.string().min(2),
  imageUrl: z.string().min(2),
  bannerUrl: z.string().min(2),
});

type OccassionFormValues = z.infer<typeof formSchema>;

interface OccassionUpdateFormProps {
  initialData: Occassion;
  name: string;
  imageUrl: string;
  bannerUrl: string;
  onCancel: () => void;
  EditId: string;
}

export const UpdateOccassionForm: React.FC<OccassionUpdateFormProps> = ({
  initialData,
  name,
  imageUrl,
  bannerUrl,
  onCancel,
  EditId,
}) => {
  const form = useForm<OccassionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      imageUrl: imageUrl,
      bannerUrl: bannerUrl,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (data: OccassionFormValues) => {
    const values = {
      name: data.name,
      imageUrl: data.imageUrl,
      bannerUrl: data.bannerUrl,
    };
    try {
      setLoading(true);

      // console.log(data);
      await axios.patch(`/api/occassion/${EditId} `, values);
      router.refresh();

      toast.success("Occassion Updated Successfully");
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
                    {/* <FormLabel>Name</FormLabel> */}
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
            {/* <EditServiceLocationForm
              initialData={initialData.serviceAddress}
              sendDataToParent={handleDataFromChild}
            /> */}
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
