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
      <div className="container flex flex-col gap-8">
        <div className="grid grid-cols-4 gap-8">
          {Array(4)
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
        <div className="flex">
          <div className="w-1/3">
            <Skeleton
              variant="rectangular"
              height={200}
              className="w-full rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 w-2/3">
            {Array(4)
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
        <div className="grid grid-cols-4 gap-8">
          {Array(4)
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
        <div className="grid grid-cols-4 gap-8">
          {Array(4)
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
        <div className="grid grid-cols-4 gap-8">
          {Array(4)
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
  );
}
