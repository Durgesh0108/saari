// "use client";

// import { useEffect, useState } from "react";
// import {
//   DragDropContext,
//   Draggable,
//   Droppable,
//   DropResult,
// } from "@hello-pangea/dnd";

// import { cn } from "@/lib/utils";
// import { Grip, Pencil } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Image } from "@prisma/client";
// // import Image from "next/image";

// interface ImagesListProps {
//   items: Image[];
//   onReorder: (updateData: { id: string; position: number }[]) => void;
// }

// export const ImagesList = ({ items, onReorder }: ImagesListProps) => {
//   const [isMounted, setIsMounted] = useState(false);
//   const [images, setImages] = useState(items);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     setImages(items);
//   }, [items]);

//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) return;

//     const items = Array.from(setImages);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     const startIndex = Math.min(result.source.index, result.destination.index);
//     const endIndex = Math.max(result.source.index, result.destination.index);

//     const updatedImages = items.slice(startIndex, endIndex + 1);

//     setImages(items);
//     const bulkUpdateData = updatedImages.map((image) => ({
//       id: image.id,
//       position: items.findIndex((item) => item.id === image.id),
//     }));

//     onReorder(bulkUpdateData);
//   };

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="images">
//         {(provided) => (
//           <div {...provided.droppableProps} ref={provided.innerRef}>
//             {images.map((image, index) => (
//               <Draggable key={image.id} draggableId={image.id} index={index}>
//                 {(provided) => (
//                   <div
//                     className={cn(
//                       "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",

//                       "bg-sky-100 border-sky-200 text-sky-700"
//                     )}
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                   >
//                     <div
//                       className={cn(
//                         "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",

//                         "border-r-sky-200 hover:bg-sky-200"
//                       )}
//                       {...provided.dragHandleProps}
//                     >
//                       <Grip className="h-5 w-5" />
//                     </div>
//                     <img
//                       alt="Upload"
//                       //   fill
//                       className="object-cover rounded-md h-24 w-24"
//                       src={image.url || ""}
//                       loading="lazy"
//                     />
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// @ts-nocheck

"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { Grip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import { Image } from "@prisma/client";
import Image from "next/image";

interface ImagesListProps {
  items: {}[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
}

export const ImagesList = ({ items, onReorder }: ImagesListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Assign positions to images without positions
    const positionedItems = items.map((item, index) => ({
      ...item,
      position: item.position ?? index,
    }));
    setImages(positionedItems);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedImages = Array.from(images);
    const [reorderedItem] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedItem);

    // Update positions based on the new order
    const reorderedImages = updatedImages.map((image, index) => ({
      ...image,
      position: index,
    }));

    setImages(reorderedImages);

    const bulkUpdateData = reorderedImages.map((image) => ({
      id: image.id,
      position: image.position,
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="images">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {images.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <Image
                      alt="Upload"
                      width={1000}
                      height={1000}
                      className="object-cover rounded-md h-24 w-24"
                      src={image.url || ""}
                      loading="lazy"
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

// Prisma API route handler
