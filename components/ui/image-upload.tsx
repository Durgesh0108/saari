// "use client";

// import { CldUploadWidget } from "next-cloudinary";
// import { useEffect, useState } from "react";

// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { ImagePlus, Trash } from "lucide-react";

// interface ImageUploadProps {
//   disabled?: boolean;
//   onChange: (value: string) => void;
//   onRemove: (value: string) => void;
//   value: string[];
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   disabled,
//   onChange,
//   onRemove,
//   value,
// }) => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const onUpload = (result: any) => {
//     console.log(result.info.secure_url);
//     onChange(result.info.secure_url);
//     value.push(result.info.secure_url);
//     console.log(value);
//   };

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <div>
//       <div className="mb-4 flex items-center gap-4">
//         {value.map((url) => (
//           <div
//             key={url}
//             className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
//           >
//             <div className="z-10 absolute top-2 right-2">
//               <Button
//                 type="button"
//                 onClick={() => onRemove(url)}
//                 variant="destructive"
//                 size="sm"
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <Image fill className="object-cover" alt="Image" src={url} />
//           </div>
//         ))}
//       </div>
//       <CldUploadWidget
//         uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
//         onSuccess={onUpload}
//       >
//         {({ open }) => {
//           const onClick = () => {
//             open();
//           };

//           return (
//             <Button
//               type="button"
//               disabled={disabled}
//               variant="secondary"
//               className="border-[1px] border-black"
//               onClick={onClick}
//             >
//               <ImagePlus className="h-4 w-4 mr-2" />
//               Upload an Image
//             </Button>
//           );
//         }}
//       </CldUploadWidget>
//     </div>
//   );
// };

// export default ImageUpload;
// ***************************************************************
/* <ImageUpload
                            value={field.value.map((image) => image.url)}
                            disabled={loading}
                            onChange={(url) =>
                              field.onChange([...field.value, { url }])
                            }
                            onRemove={(url) =>
                              field.onChange([
                                ...field.value.filter(
                                  (current) => current.url !== url
                                ),
                              ])
                            }
                          />
                          <ImageUpload
                            value={field.value ? [field.value] : []}
                            disabled={loading}
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange("")}
                          /> */

// use this code
// *******************************************************
// "use client";

// import { CldUploadWidget } from "next-cloudinary";
// import { useEffect, useState } from "react";

// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { ImagePlus, Trash } from "lucide-react";

// interface ImageUploadProps {
//   disabled?: boolean;
//   onChange: (images: string[]) => void; // Callback to update image URLs
//   onRemove: (url: string) => void; // Callback to remove an image
//   value?: string[]; // Initial image URLs
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   disabled,
//   onChange,
//   onRemove,
//   value = [],
// }) => {
//   // const [isMounted, setIsMounted] = useState(false);

//   const [images, setImages] = useState<string[]>(value);
//   const [isMounted, setIsMounted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // const onUpload = (result: any) => {
//   //   console.log(result.info.secure_url);
//   //   onChange(result.info.secure_url);
//   //   value.push(result.info.secure_url);
//   // };

//   const handleUpload = async (result: any) => {
//     setIsLoading(true);
//     try {
//       const secureUrl = result.info.secure_url;
//       setImages((prevImages) => [...prevImages, secureUrl]);
//       onChange([...images, secureUrl]); // Update parent component with new URLs
//     } catch (error) {
//       console.error("Image upload error:", error);
//       // Handle upload errors gracefully (e.g., display error message)
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRemove = (url: string) => {
//     setImages((prevImages) => prevImages.filter((image) => image !== url));
//     onRemove(url); // Trigger parent component's removal callback
//   };

//   if (!isMounted) {
//     return null;
//   }

//   console.log("images", { images });

//   return (
//     <div>
//       <div className="mb-4 flex items-center gap-4">
//         {images.map((url) => (
//           <div
//             key={url}
//             className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
//           >
//             <div className="z-10 absolute top-2 right-2">
//               <Button
//                 type="button"
//                 onClick={() => handleRemove(url)}
//                 variant="destructive"
//                 size="sm"
//                 disabled={isLoading} // Disable removal during upload
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <Image fill className="object-cover" alt="Image" src={url} />
//           </div>
//         ))}
//       </div>
//       <CldUploadWidget uploadPreset="nk0czl1n" onSuccess={handleUpload}>
//         {({ open }) => {
//           const onClick = () => {
//             open();
//           };

//           return (
//             <Button
//               type="button"
//               disabled={disabled}
//               variant="secondary"
//               onClick={onClick}
//             >
//               <ImagePlus className="h-4 w-4 mr-2" />
//               Upload an Image
//             </Button>
//           );
//         }}
//       </CldUploadWidget>
//     </div>
//   );
// };

// export default ImageUpload;

// ******************************************************
// // ImageUpload.js
// // @ts-nocheck
// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { Plus, Trash } from "lucide-react";
// import { CldUploadWidget } from "next-cloudinary";
// import axios from "axios"; // Assuming axios is installed for API calls

// interface ImageUploadProps {
//   disabled?: boolean;
//   onChange: (images: string[]) => void; // Callback to update image URLs
//   onRemove: (url: string) => void; // Callback to remove an image
//   value?: string[]; // Initial image URLs
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   disabled,
//   onChange,
//   onRemove,
//   value = [],
// }) => {
//   const [images, setImages] = useState<string[]>(value);
//   const [isMounted, setIsMounted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // Track upload loading state

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const handleUpload = async (result: any) => {
//     setIsLoading(true);
//     try {
//       const secureUrl = result.info.secure_url;
//       setImages((prevImages) => [...prevImages, secureUrl]);
//       onChange([...images, secureUrl]); // Update parent component with new URLs
//     } catch (error) {
//       console.error("Image upload error:", error);
//       // Handle upload errors gracefully (e.g., display error message)
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRemove = (url: string) => {
//     setImages((prevImages) => prevImages.filter((image) => image !== url));
//     onRemove(url); // Trigger parent component's removal callback
//   };

//   const handleSave = async () => {
//     if (isLoading) {
//       return; // Prevent saving while uploads are in progress
//     }
//     try {
//       const data = { images }; // Replace with your API endpoint structure
//       const response = await axios.patch(
//         "/api/website/product/${productId}/image",
//         data
//       );
//       console.log("Image save response:", response); // Handle success response
//     } catch (error) {
//       console.error("Image save error:", error);
//       // Handle save errors gracefully (e.g., display error message)
//     }
//   };

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       {images.map((url) => (
//         <div
//           key={url}
//           className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
//         >
//           <div className="z-10 absolute top-2 right-2">
//             <Button
//               type="button"
//               onClick={() => handleRemove(url)}
//               variant="destructive"
//               size="sm"
//               disabled={isLoading} // Disable removal during upload
//             >
//               <Trash className="h-4 w-4" />
//             </Button>
//           </div>
//           <Image fill className="object-cover" alt="Image" src={url} />
//         </div>
//       ))}
//       <CldUploadWidget uploadPreset="nk0czl1n" onSuccess={handleUpload}>
//         {({ open }) => (
//           <Button
//             type="button"
//             disabled={disabled || isLoading}
//             variant="secondary"
//             onClick={open}
//           >
//             <span className="mr-2">
//               <Plus className="h-4 w-4" />
//             </span>
//             Upload an Image
//           </Button>
//         )}
//       </CldUploadWidget>
//       <Button
//         type="button"
//         disabled={isLoading || images.length === 0}
//         variant="success"
//         onClick={handleSave}
//       >
//         Save
//       </Button>
//     </div>
//   );
// };

// export default ImageUpload;
// ********************************************************************

// // @ts-nocheck

// "use client";

// import { CldUploadWidget } from "next-cloudinary";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { ImagePlus, Trash } from "lucide-react";

// interface ImageUploadProps {
//   disabled?: boolean;
//   onChange: (urls: string[]) => void; // Callback to update image URLs
//   onRemove: (url: string) => void; // Callback to remove an image
//   value?: string[]; // Initial image URLs
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   disabled,
//   onChange,
//   onRemove,
//   value = [],
// }) => {
//   const [images, setImages] = useState<string[]>(value);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const handleUpload = async (result: any) => {
//     const secureUrl = result.info.secure_url;
//     setImages((prevImages) => {
//       const updatedImages = [...prevImages, secureUrl];
//       onChange(updatedImages); // Update parent component with new URLs
//       return updatedImages;
//     });
//   };

//   const handleRemove = (url: string) => {
//     setImages((prevImages) => {
//       const updatedImages = prevImages.filter((image) => image !== url);
//       onRemove(url); // Trigger parent component's removal callback
//       onChange(updatedImages); // Update parent component with new URLs
//       return updatedImages;
//     });
//   };

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <div>
//       <div className="mb-4 flex items-center gap-4">
//         {images.map((url) => (
//           <div
//             key={url}
//             className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
//           >
//             <div className="z-10 absolute top-2 right-2">
//               <Button
//                 type="button"
//                 onClick={() => handleRemove(url)}
//                 variant="destructive"
//                 size="sm"
//                 disabled={disabled} // Disable removal when disabled
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <Image fill className="object-cover" alt="Image" src={url} />
//           </div>
//         ))}
//       </div>
//       <CldUploadWidget
//         uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
//         onSuccess={handleUpload}
//       >
//         {({ open }) => (
//           <Button
//             type="button"
//             disabled={disabled}
//             variant="secondary"
//             onClick={open}
//           >
//             <ImagePlus className="h-4 w-4 mr-2" />
//             Upload an Image
//           </Button>
//         )}
//       </CldUploadWidget>
//     </div>
//   );
// };

// export default ImageUpload;

// @ts-nocheck
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (urls: string[]) => void; // Callback to update image URLs
  onRemove: (url: string) => void; // Callback to remove an image
  value?: string[]; // Initial image URLs
}

function addFolderToUrl(oldUrl, folderName) {
  const urlParts = oldUrl.split("/");
  urlParts.splice(7, 0, folderName); // Inserting the folder name at the right position
  const newUrl = urlParts.join("/");
  return newUrl;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value = [],
}) => {
  const [images, setImages] = useState<string[]>(value);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUpload = (result: any) => {
    const secureUrl = result.info.secure_url;
    // const folderName = "Saree";
    // const newUrl = addFolderToUrl(secureUrl, folderName);
    setImages((prevImages) => {
      const updatedImages = [...prevImages, secureUrl];
      onChange(updatedImages); // Update parent component with new URLs
      return updatedImages;
    });
  };

  const handleRemove = (url: string) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image !== url);
      onRemove(url); // Trigger parent component's removal callback
      onChange(updatedImages); // Update parent component with new URLs
      return updatedImages;
    });
  };

  if (!isMounted) {
    return null;
  }

  console.log("image Upload", { images });

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {images.map((image) => (
          <div
            key={image}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => handleRemove(image)}
                variant="destructive"
                size="sm"
                disabled={disabled} // Disable removal when disabled
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={image.url ? image.url : image}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUpload}
      >
        {({ open }) => (
          <Button
            type="button"
            disabled={disabled}
            variant="secondary"
            onClick={open}
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            Upload an Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;

// // @ts-nocheck
// "use client";

// import { CldUploadWidget } from "next-cloudinary";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { ImagePlus, Trash } from "lucide-react";

// interface ImageUploadProps {
//   disabled?: boolean;
//   onChange: (urls: string[]) => void; // Callback to update image URLs
//   onRemove: (url: string) => void; // Callback to remove an image
//   value?: string[]; // Initial image URLs
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   disabled,
//   onChange,
//   onRemove,
//   value = [],
// }) => {
//   const [images, setImages] = useState<string[]>(value);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const handleUpload = (result: any) => {
//     const secureUrl = result.info.secure_url;
//     setImages((prevImages) => {
//       const updatedImages = [...prevImages, secureUrl];
//       onChange(updatedImages); // Update parent component with new URLs
//       return updatedImages;
//     });
//   };

//   const handleRemove = (url: string) => {
//     setImages((prevImages) => {
//       const updatedImages = prevImages.filter((image) => image !== url);
//       onRemove(url); // Trigger parent component's removal callback
//       onChange(updatedImages); // Update parent component with new URLs
//       return updatedImages;
//     });
//   };

//   if (!isMounted) {
//     return null;
//   }

//   console.log("image Upload", { images });

//   return (
//     <div>
//       <div className="mb-4 flex items-center gap-4">
//         {images.map((image) => (
//           <div
//             key={image}
//             className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
//           >
//             <div className="z-10 absolute top-2 right-2">
//               <Button
//                 type="button"
//                 onClick={() => handleRemove(image)}
//                 variant="destructive"
//                 size="sm"
//                 disabled={disabled} // Disable removal when disabled
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <Image
//               fill
//               className="object-cover"
//               alt="Image"
//               src={typeof image === "string" ? image : image.url || ""}
//             />
//           </div>
//         ))}
//       </div>
//       <CldUploadWidget
//         uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
//         onSuccess={handleUpload}
//       >
//         {({ open }) => (
//           <Button
//             type="button"
//             disabled={disabled}
//             variant="secondary"
//             onClick={open}
//           >
//             <ImagePlus className="h-4 w-4 mr-2" />
//             Upload an Image
//           </Button>
//         )}
//       </CldUploadWidget>
//     </div>
//   );
// };

// export default ImageUpload;
