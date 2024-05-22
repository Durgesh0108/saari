import React from "react";
import { Card } from "../ui/Card";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function LoaderCard() {
  return (
    <Card className="h-full">
      <div className="p-2 w-full carousel-card">
        <Stack spacing={1} className="h-full">
          <Skeleton variant="rectangular" className="w-full" height={100} />
          <Skeleton variant="text" className="mt-2 w-full h-full" />
        </Stack>
      </div>
    </Card>
  );
}
