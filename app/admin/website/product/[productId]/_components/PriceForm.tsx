// "use client";

// import { Button } from "@/components/ui/button";
// import { Pencil, Plus } from "lucide-react";
// import React, { useEffect, useState } from "react";

// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import axios from "axios";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";

// const formSchema = z.object({
//   price: z.coerce.number().min(1),
// });

// type PriceProductForm = z.infer<typeof formSchema>;

// interface PriceProductFormProps {
//   productId: string;
//   price: number;
// }

// export const PriceProductForm = ({
//   productId,
//   price,
// }: //   discount,
// PriceProductFormProps) => {
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const form = useForm<PriceProductForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       price: price,
//     },
//   });

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const onSubmit = async (values: PriceProductForm) => {
//     const data = {
//       price: values.price,
//     };

//     try {
//       setLoading(true);
//       const response = await axios.patch(
//         `/api/website/product/${productId}`,
//         data
//       );
//       toggleEdit();
//       location.reload();
//       toast.success("Product Updated");
//     } catch (error: any) {
//       console.log(error);
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // <Card className={"flex flex-col gap-6 p-4 border-2"}>
//     <div className="border bg-slate-100 rounded-md p-4 ">
//       <div className="text-sm lg:text-base font-medium flex items-center justify-between">
//         Product Price
//         <Button onClick={toggleEdit} variant="ghost">
//           {isEditing && <>Cancel</>}

//           {!isEditing && price && (
//             <>
//               <Pencil className="h-4 w-4 mr-2" />
//               Edit Price
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         <div className="relative mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="flex flex-col gap-4 mt-1">
//             <label>Price</label>
//             <Input disabled={true} placeholder="Product Price" value={price} />
//           </div>
//         </div>
//       )}
//       {isEditing && (
//         <div className="mb-4">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-4 w-full"
//             >
//               <FormField
//                 control={form.control}
//                 name="price"
//                 render={({ field }) => (
//                   <FormItem>
//                     {/* <FormLabel>Name</FormLabel> */}
//                     <FormControl>
//                       <Input
//                         disabled={loading}
//                         placeholder="Product Price"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="flex justify-end">
//                 <div className="flex gap-2">
//                   <Button
//                     disabled={loading}
//                     className="ml-auto"
//                     type="submit"
//                     variant={"success"}
//                   >
//                     Save
//                   </Button>
//                   <Button
//                     disabled={loading}
//                     className="ml-auto"
//                     variant="destructive"
//                     type="button"
//                     onClick={() => setIsEditing(false)}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </Form>
//         </div>
//       )}
//     </div>
//     // </Card>
//   );
// };

"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  price: z.coerce.number().min(1),
});

type PriceProductForm = z.infer<typeof formSchema>;

interface PriceProductFormProps {
  productId: string;
  price: number;
}

export const PriceProductForm = ({
  productId,
  price,
}: PriceProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(price);

  const form = useForm<PriceProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: currentPrice,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: PriceProductForm) => {
    const data = {
      price: values.price,
    };

    try {
      setLoading(true);
      await axios.patch(`/api/website/product/${productId}`, data);
      setCurrentPrice(values.price); // Update the price locally
      toggleEdit();
      toast.success("Product Updated");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border bg-slate-100 rounded-md p-4">
      <div className="text-sm lg:text-base font-medium flex items-center justify-between">
        Product Price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && currentPrice && (
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
            {/* <label>Price</label> */}
            <Input
              disabled={true}
              placeholder="Product Price"
              value={currentPrice}
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
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Product Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
  );
};
