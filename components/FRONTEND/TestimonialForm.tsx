"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Textarea } from "../ui/textarea";
import { cookieHandler } from "@/lib/cookieHandler";

const formSchema = z.object({
  review: z.string().min(2),
  // userName: z.string().min(2),
  companyName: z.string().min(2),
});

type TestimonialFormValues = z.infer<typeof formSchema>;

export default function TestimonialForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: "",
      // userName: "",
      companyName: "",
    },
  });

  const userId = cookieHandler.get("userId");

  const URL = `${process.env.API_URL}`;

  const onSubmit = async (data: TestimonialFormValues) => {
    const testimonial = {
      review: data.review,
      companyName: data.companyName,
      userId: userId,
    };

    try {
      setLoading(true);
      console.log(testimonial);
      await axios.post(`/api/testimonial`, testimonial);
      toast.success("Thanks For your Tetsimonial");
      location.reload();
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="my-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <div className="md:grid gap-8">
              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder="Add your review..."
                        {...field}
                        // className="w-full border-2 rounded-lg p-2"
                      />
                      {/* <textarea
                        disabled={loading}
                        placeholder="Add your review..."
                        {...field}
                        className="w-full border-2 rounded-lg p-2"
                      /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="md:grid gap-8">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="User Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
            <div className="md:grid gap-8">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Company Name"
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
}
