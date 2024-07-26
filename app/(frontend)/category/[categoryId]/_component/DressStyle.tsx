// @ts-nocheck

"use client";

import { Preview } from "@/components/preview";
import React, { useEffect, useState } from "react";

export default function DressStyleComponent({ DressStyles }) {
  const [selectedDressStyle, setSelectedDressStyle] = useState(
    DressStyles[0].id
  );

  const [dressStyle, setDressStyle] = useState([]);

  useEffect(() => {
    const dress = DressStyles.find((dress) => dress.id === selectedDressStyle);
    setDressStyle(dress);
  }, [DressStyles, selectedDressStyle]);

  return (
    <div className="mt-4 container">
      <div className="grid grid-cols-3 gap-4">
        <div className="border-2 border-black h-52 w-full col-span-1"></div>
        <div className="col-span-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ol>
                {DressStyles.map((dress, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedDressStyle(dress.id)}
                    className="cursor-pointer"
                  >
                    {dress.name}
                  </li>
                ))}
              </ol>
            </div>
            <div className="w-full">
              <Preview value={dressStyle?.description} />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 ">
            {dressStyle.videoUrl?.split(", ").map((video, index) => (
              <div key={index} className="w-full">
                <iframe
                  src={video}
                  height={120}
                  width={200}
                  key={index}
                ></iframe>
              </div>
            ))}

            {dressStyle.videoUrl?.split(", ").map((video, index) => (
              <div key={index} className="w-full">
                <iframe
                  src={video}
                  height={120}
                  width={200}
                  key={index}
                ></iframe>
              </div>
            ))}

            {dressStyle.videoUrl?.split(", ").map((video, index) => (
              <div key={index} className="w-full">
                <iframe
                  src={video}
                  height={120}
                  width={200}
                  key={index}
                ></iframe>
              </div>
            ))}

            {dressStyle.videoUrl?.split(", ").map((video, index) => (
              <div key={index} className="w-full">
                <iframe
                  src={video}
                  height={120}
                  width={200}
                  key={index}
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
