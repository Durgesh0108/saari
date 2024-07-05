// // @ts-nocheck

// "use client";

// import { Button } from "@/components/ui/button";
// import { Pencil } from "lucide-react";
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
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";
// import ImageUpload from "@/components/ui/image-upload";
// import Image from "next/image";

// const formSchema = z.object({
//   images: z.object({ url: z.string() }).array(),
// });

// type ImageProductForm = z.infer<typeof formSchema>;

// export const ImageProductForm = ({ initialData }) => {
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const form = useForm<ImageProductForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       images: initialData.images,
//     },
//   });

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const onSubmit = async (values: ImageProductForm) => {
//     try {
//       setLoading(true);

//       // Create the correct format for the backend
//       const data = {
//         images: values.images.map((url) => ({ url })),
//       };

//       console.log({ data, values });

//       const response = await axios.patch(
//         `/api/website/product/${initialData.id}/image`,
//         data
//       );
//       toggleEdit();
//       toast.success("Product Updated");
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="border bg-slate-100 rounded-md p-4">
//       <div className="text-sm lg:text-base font-medium flex items-center justify-between">
//         Product Image
//         <Button onClick={toggleEdit} variant="ghost">
//           {isEditing ? (
//             "Cancel"
//           ) : (
//             <>
//               <Pencil className="h-4 w-4 mr-2" />
//               Edit Image
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         <div className="relative aspect-video mt-2">
//           {initialData.images > 0 && (
//             <Image
//               alt="Upload"
//               fill
//               className="object-cover rounded-md"
//               src={initialData.images[0].url || ""}
//               loading="lazy"
//             />
//           )}
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
//                 name="images"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Images</FormLabel>
//                     <FormControl>
//                       <ImageUpload
//                         value={field.value}
//                         disabled={loading}
//                         onChange={(urls) => field.onChange(urls)}
//                         onRemove={(url) =>
//                           field.onChange(
//                             field.value.filter((image) => image !== url)
//                           )
//                         }
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex justify-end">
//                 <Button
//                   disabled={loading}
//                   className="ml-auto"
//                   type="submit"
//                   variant={"success"}
//                 >
//                   Save
//                 </Button>
//                 <Button
//                   disabled={loading}
//                   className="ml-auto"
//                   variant="destructive"
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       )}
//     </div>
//   );
// };







// @ts-nocheck

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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/ui/image-upload";
import Image from "next/image";

const formSchema = z.object({
  images: z.object({ url: z.string().url() }).array(),
});

type ImageProductForm = z.infer<typeof formSchema>;

export const ImageProductForm = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ImageProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: initialData.images,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: ImageProductForm) => {
    try {
      setLoading(true);

      // Create the correct format for the backend
      const data = {
        images: values.images.map((image) => ({ url: image.url })),
      };

      console.log({ data, values });

      const response = await axios.patch(
        `/api/website/product/${initialData.id}/image`,
        data
      );
      toggleEdit();
      toast.success("Product Updated");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border bg-slate-100 rounded-md p-4">
      <div className="text-sm lg:text-base font-medium flex items-center justify-between">
        Product Image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="relative aspect-video mt-2">
          {initialData.images.length > 0 && (
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.images[0].url || ""}
              loading="lazy"
            />
          )}
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
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        disabled={loading}
                        onChange={(urls) => {
                          console.log("onChange URLs:", urls); // Debugging
                          field.onChange(urls);
                        }}
                        onRemove={(url) => {
                          const updatedImages = field.value.filter((image) => image.url !== url);
                          console.log("onRemove URLs:", updatedImages); // Debugging
                          field.onChange(updatedImages);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
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
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};
