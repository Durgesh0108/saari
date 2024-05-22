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

"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    console.log(result.info.secure_url);
    onChange(result.info.secure_url);
    value.push(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  console.log("value", { value });

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="nk0czl1n" onSuccess={onUpload}>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
