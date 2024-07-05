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
//               src={image.url ? image.url : image}
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

// // @ts-nocheck

// "use client";

// import { CldUploadWidget } from "next-cloudinary";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { ImagePlus, Trash } from "lucide-react";

// interface ImageUploadProps {
//   disabled?: boolean;
//   onChange: (urls: { url: string }[]) => void; // Callback to update image URLs
//   onRemove: (url: string) => void; // Callback to remove an image
//   value?: { url: string }[]; // Initial image URLs
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   disabled,
//   onChange,
//   onRemove,
//   value = [],
// }) => {
//   const [images, setImages] = useState<{ url: string }[]>(value);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     setImages(value); // Sync local state with passed value
//   }, [value]);

//   // const handleUpload = (result: any) => {
//   //   const secureUrl = result.info.secure_url;
//   //   const newImage = { url: secureUrl };
//   //   const updatedImages = [...images, newImage];
//   //   setImages(updatedImages);
//   //   onChange(updatedImages); // Update parent component with new URLs
//   // };
//   const handleUpload = (result: any) => {
//     const secureUrl = result.info.secure_url;
//     const newImage = { url: secureUrl };
//     setImages((prevImages) => {
//       const updatedImages = [...prevImages, newImage];
//       onChange(updatedImages); // Update parent component with new URLs
//       return updatedImages;
//     });
//   };

//   // const handleRemove = (url: string) => {
//   //   const updatedImages = images.filter((image) => image.url !== url);
//   //   setImages(updatedImages);
//   //   onRemove(url); // Trigger parent component's removal callback
//   //   onChange(updatedImages); // Update parent component with new URLs
//   // };

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

//   console.log("Image Upload", { images });

//   return (
//     <div>
//       <div className="mb-4 flex items-center gap-4">
//         {images.map((image) => (
//           <div
//             key={image.url}
//             className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
//           >
//             <div className="z-10 absolute top-2 right-2">
//               <Button
//                 type="button"
//                 onClick={() => handleRemove(image.url)}
//                 variant="destructive"
//                 size="sm"
//                 disabled={disabled}
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <Image fill className="object-cover" alt="Image" src={image.url} />
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
  onChange: (urls: { url: string }[]) => void; // Callback to update image URLs
  onRemove: (url: string) => void; // Callback to remove an image
  value?: { url: string }[]; // Initial image URLs
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value = [],
}) => {
  const [images, setImages] = useState<{ url: string }[]>(value);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setImages(value); // Sync local state with passed value
  }, [value]);

  const handleUpload = (result: any) => {
    const secureUrl = result.info.secure_url;
    const newImage = { url: secureUrl };
    setImages((prevImages) => {
      const updatedImages = [...prevImages, newImage];
      onChange(updatedImages); // Update parent component with new URLs
      return updatedImages;
    });
  };

  const handleRemove = (url: string) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image.url !== url);
      onRemove(url); // Trigger parent component's removal callback
      onChange(updatedImages); // Update parent component with new URLs
      return updatedImages;
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {images.map((image) => (
          <div
            key={image.url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => handleRemove(image.url)}
                variant="destructive"
                size="sm"
                disabled={disabled}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={image.url}
              sizes="(max-width: 200px) 100vw, 200px"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUpload}
        multiple // Allow multiple image uploads
      >
        {({ open }) => (
          <Button
            type="button"
            disabled={disabled}
            variant="secondary"
            onClick={open}
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            Upload Images
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
