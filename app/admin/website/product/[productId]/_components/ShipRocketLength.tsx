// "use client";

// import { Button } from "@/components/ui/button";
// import { Pencil, Plus } from "lucide-react";
// import React, { useState } from "react";

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
// import { Product } from "@prisma/client";

// const formSchema = z.object({
//   shiplength: z.coerce.number().min(1),
//   shipwidth: z.coerce.number().min(1),
//   shipheight: z.coerce.number().min(1),
//   shipweight: z.coerce.number().min(0),
// });

// type ShipRocketProductForm = z.infer<typeof formSchema>;

// interface ShipRocketProductFormProps {
//   product: Product;
// }

// export const ShipRocketProductForm = ({
//   product,
// }: ShipRocketProductFormProps) => {
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const form = useForm<ShipRocketProductForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       shiplength: product.shiplength,
//       shipwidth: product.shipwidth,
//       shipheight: product.shipheight,
//       shipweight: product.shipwidth,
//     },
//   });

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const onSubmit = async (values: ShipRocketProductForm) => {
//     const data = {
//       ...values,
//       //   serviceId: serviceId,
//     };

//     try {
//       setLoading(true);
//       const response = await axios.patch(
//         `/api/website/product/${product.id}`,
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
//         Product Ship Rocket
//         <Button onClick={toggleEdit} variant="ghost">
//           {isEditing && <>Cancel</>}

//           {!isEditing && product && (
//             <>
//               <Pencil className="h-4 w-4 mr-2" />
//               Edit Ship Rocket
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//           <Input
//             disabled={true}
//             placeholder="Length"
//             value={product.shiplength}
//           />
//           <Input
//             disabled={true}
//             placeholder="Width"
//             value={product.shipwidth}
//           />
//           <Input
//             disabled={true}
//             placeholder="Height"
//             value={product.shipheight}
//           />
//           <Input
//             disabled={true}
//             placeholder="Weight"
//             value={product.shipweight}
//           />
//         </div>
//       )}
//       {isEditing && (
//         <div className="mb-4">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-4 w-full"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="md:grid gap-8">
//                   <FormField
//                     control={form.control}
//                     name="shiplength"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Length</FormLabel>
//                         <FormControl>
//                           <Input
//                             disabled={loading}
//                             placeholder="Length(in cm)"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className="md:grid gap-8">
//                   <FormField
//                     control={form.control}
//                     name="shipwidth"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Width</FormLabel>
//                         <FormControl>
//                           <Input
//                             disabled={loading}
//                             placeholder="Width(in cm)"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className="md:grid gap-8">
//                   <FormField
//                     control={form.control}
//                     name="shipheight"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Height</FormLabel>
//                         <FormControl>
//                           <Input
//                             disabled={loading}
//                             placeholder="Height(in cm)"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className="md:grid gap-8">
//                   <FormField
//                     control={form.control}
//                     name="shipweight"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Weight</FormLabel>
//                         <FormControl>
//                           <Input
//                             disabled={loading}
//                             placeholder="Weight(in kg)"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

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
  shiplength: z.coerce.number().min(1),
  shipwidth: z.coerce.number().min(1),
  shipheight: z.coerce.number().min(1),
  shipweight: z.coerce.number().min(0),
});

type ShipRocketProductForm = z.infer<typeof formSchema>;

interface ShipRocketProductFormProps {
  product: Product;
}

export const ShipRocketProductForm = ({
  product,
}: ShipRocketProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState(product);

  const form = useForm<ShipRocketProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shiplength: product.shiplength,
      shipwidth: product.shipwidth,
      shipheight: product.shipheight,
      shipweight: product.shipweight,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: ShipRocketProductForm) => {
    const data = {
      ...values,
    };

    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/website/product/${product.id}`,
        data
      );
      setProductData(response.data);
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
    <div className="border bg-slate-100 rounded-md p-4 ">
      <div className="text-sm lg:text-base font-medium flex items-center justify-between">
        Product Ship Rocket
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Ship Rocket
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <Input
            disabled={true}
            placeholder="Length"
            value={productData.shiplength}
          />
          <Input
            disabled={true}
            placeholder="Width"
            value={productData.shipwidth}
          />
          <Input
            disabled={true}
            placeholder="Height"
            value={productData.shipheight}
          />
          <Input
            disabled={true}
            placeholder="Weight"
            value={productData.shipweight}
          />
        </div>
      )}
      {isEditing && (
        <div className="mb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="shiplength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Length(in cm)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipwidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Width(in cm)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipheight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Height(in cm)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipweight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Weight(in kg)"
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
  );
};
