import { Skeleton } from "@mui/material";
import React from "react";

export default function loading() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Skeleton
          variant="rectangular"
          height={400}
          className="w-full rounded-lg"
        />
      </div>
      <div className="container">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1 w-full">
            <Skeleton
              variant="rectangular"
              height={400}
              className="w-full rounded-lg"
            />
          </div>
          <div className="col-span-3 flex flex-col gap-8">
            <div>
              <Skeleton
                variant="rectangular"
                height={30}
                width={100}
                className="rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-8">
              {Array(6)
                .fill({})
                .map((box, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height={200}
                    className="w-full rounded-lg"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
