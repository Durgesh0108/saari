"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

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
import { Discount, Product } from "@prisma/client";
import getDiscountById, { getDiscount } from "@/actions/discount/getDiscount";

const formSchema = z.object({
  price: z.coerce.number().min(1),
});

type PriceProductForm = z.infer<typeof formSchema>;

interface PriceProductFormProps {
  productId: string;
  price: number;
  offer_price: number;
  //   discount?: Discount | null;
}

export const PriceProductForm = ({
  productId,
  price,
  offer_price,
}: //   discount,
PriceProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [prices, setPrices] = useState<number | 0>(price);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [Discounts, setDiscounts] = useState<Discount[]>([]);
  const [OneDiscount, setOneDiscount] = useState<Discount[]>([]);

  const form = useForm<PriceProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: price,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Discount
  useEffect(() => {
    const fetchDiscounts = async () => {
      const discount = await getDiscount();
      setDiscounts(discount);
      // setSelectedCategory(category[0]?.id);
    };

    fetchDiscounts();
  }, []);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiscount(e.target.value);
  };

  useEffect(() => {
    const fetchDiscount = async () => {
      const discount = await getDiscountById(selectedDiscount || "");
      setOneDiscount(discount);
    };

    fetchDiscount();
  }, [selectedDiscount]);

  //

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Check if the input is a valid number or empty string
    if (/^\d*$/.test(value) || value === "") {
      setPrices(value === "" ? 0 : parseInt(value, 10));
    }
    // setPrice(value);
  };

  let new_offer_price: number = prices;
  // @ts-ignore
  if (OneDiscount?.discount) {
    const discount_price =
      // @ts-ignore
      (parseInt(prices) * parseInt(OneDiscount.discount)) / 100;
    // @ts-ignore
    new_offer_price = prices - discount_price;
  }

  const onSubmit = async (values: PriceProductForm) => {
    const data = {
      price: prices,
      discountId: selectedDiscount === null ? null : selectedDiscount,
      offer_price: selectedDiscount ? new_offer_price : price,
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
        Product Price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}

          {!isEditing && price && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="relative mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 mt-1">
            <label>Price</label>
            <Input disabled={true} placeholder="Product Price" value={price} />
          </div>
          <div className="flex flex-col gap-4 mt-1">
            <label>Offer Price</label>
            <Input
              disabled={true}
              placeholder="Product Price"
              value={offer_price}
            />
          </div>
        </div>
      )}
      {isEditing && (
        <div className="mb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col gap-4 mt-1">
                  <FormLabel>Price</FormLabel>
                  <input
                    className="p-2 border-[2px] text-sm rounded-lg active:ring-2 ring-black placeholder:text-muted-foreground"
                    type="text"
                    value={prices}
                    onChange={handlePriceChange}
                    disabled={loading}
                    placeholder="Product Price"
                  />
                </div>
                <div className="flex flex-col gap-4 mt-1">
                  <FormLabel>Discount</FormLabel>
                  <select
                    name="category"
                    id="category"
                    // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
                    className="p-2 border-black border-[1px] rounded-lg"
                    onChange={handleDiscountChange}
                  >
                    {Discounts.length === 0 ? (
                      <option>No Discount Available</option>
                    ) : (
                      <option>Please Select Discount</option>
                    )}
                    {Discounts.map((discount) => (
                      <option
                        value={discount.id}
                        key={discount.id}
                        className="px-4 py-1"
                      >
                        {discount.discount} %
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-4 mt-1">
                  <FormLabel>Offer Price</FormLabel>
                  <input
                    className="p-2 border-[2px] text-sm  rounded-lg active:ring-2 ring-black placeholder:text-muted-foreground"
                    type="number"
                    value={new_offer_price}
                    disabled={loading}
                    placeholder="Offer Price"
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
