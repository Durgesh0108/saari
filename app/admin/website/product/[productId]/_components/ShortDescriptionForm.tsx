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
//   shortDescription: z.string().min(1),
// });

// type ShortDescriptionProductForm = z.infer<typeof formSchema>;

// interface ShortDescriptionProductFormProps {
//   productId: string;
//   shortDescription: string;
// }

// export const ShortDescriptionProductForm = ({
//   productId,
//   shortDescription,
// }: ShortDescriptionProductFormProps) => {
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const form = useForm<ShortDescriptionProductForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       shortDescription: shortDescription,
//     },
//   });

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const onSubmit = async (values: ShortDescriptionProductForm) => {
//     const data = {
//       ...values,
//       //   serviceId: serviceId,
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
//         Product Short Description
//         <Button onClick={toggleEdit} variant="ghost">
//           {isEditing && <>Cancel</>}

//           {!isEditing && shortDescription && (
//             <>
//               <Pencil className="h-4 w-4 mr-2" />
//               Edit Short Description
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         <div className="relative mt-2">
//           <Input
//             disabled={true}
//             placeholder="Product shortDescription"
//             value={shortDescription}
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
//               <div className="md:grid gap-8">
//                 <FormField
//                   control={form.control}
//                   name="shortDescription"
//                   render={({ field }) => (
//                     <FormItem>
//                       {/* <FormLabel>Name</FormLabel> */}
//                       <FormControl>
//                         <Input
//                           disabled={loading}
//                           placeholder="Product shortDescription"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
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
  shortDescription: z.string().min(1),
});

type ShortDescriptionProductForm = z.infer<typeof formSchema>;

interface ShortDescriptionProductFormProps {
  productId: string;
  shortDescription: string;
}

export const ShortDescriptionProductForm = ({
  productId,
  shortDescription,
}: ShortDescriptionProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentShortDescription, setCurrentShortDescription] =
    useState(shortDescription);

  const form = useForm<ShortDescriptionProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shortDescription: currentShortDescription,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: ShortDescriptionProductForm) => {
    const data = {
      ...values,
    };

    try {
      setLoading(true);
      await axios.patch(`/api/website/product/${productId}`, data);
      setCurrentShortDescription(values.shortDescription); // Update the shortDescription locally
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
        Product Short Description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && currentShortDescription && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Short Description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="relative mt-2">
          <Input
            disabled={true}
            placeholder="Product shortDescription"
            value={currentShortDescription}
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
              <div className="md:grid gap-8">
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Product shortDescription"
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
