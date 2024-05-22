// @ts-nocheck

"use client";

import { GetSquareAds } from "@/actions/advertisements/square/getSquareAds";
import { AdvertisementSubscription } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

export default function SquareAds() {
  const [squareAds, setSquareAds] = useState<AdvertisementSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      const square = await GetSquareAds();
      await setSquareAds(square);
      setLoading(false);
    };
    fetchAdvertisements();
  }, []);

  if (loading) {
    return (
      <div className="col-span-3 grid grid-cols-3 gap-8 h-fit ">
        {[{}, {}, {}].map((ads, index) => (
          <div className="w-full h-24 md:h-44" key={index}>
            <div className="h-full w-full ">
              <Skeleton variant="rectangular" className="w-full h-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="col-span-3 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8 h-fit ">
      {squareAds.slice(0, 9).map((ads) => (
        <div className="w-full h-44 lg:h-36 xl:h-44" key={ads.id}>
          <div className="h-full w-full ">
            <Image
              src={ads?.advertisement?.imageUrl}
              height={50}
              width={1000}
              alt="ads"
              className="object-fill h-full"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
