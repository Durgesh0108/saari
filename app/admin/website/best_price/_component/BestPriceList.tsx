// @ts-nocheck

"use client";

import { AlertModal } from "@/components/modal/alert-modal";
import { Card } from "@/components/ui/Card";
import ListCard from "@/components/ui/ListCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { UpdateBestPriceForm } from "./UpdateBestPriceForm";
import { BestPrice } from "@prisma/client";

export default function BestPriceList() {
  const [BestPrices, setBestPrices] = useState<BestPrice[]>([]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [initialdata, setInitialData] = useState([]);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/website/best_price/${id}`);
      location.reload();
      toast.success("Best Price Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchBestPrice = async () => {
      const bestPriceRes = await fetch(`/api/website/best_price`, {
        next: { revalidate: 60 },
      });

      const bestPrice = await bestPriceRes.json();
      setBestPrices(bestPrice);
    };

    fetchBestPrice();
  }, []);

  return (
    <Card className="p-4">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => handleDelete(deleteId)}
        loading={loading}
      />
      <div className="flex flex-col gap-2">
        {isUpdating && (
          <>
            <UpdateBestPriceForm
              initialData={initialData}
              onCancel={() => {
                setIsUpdating(false);
                setEditId("");
              }}
            />
          </>
        )}
        {BestPrices.length === 0 && <p>No BestPrice Available</p>}
        {BestPrices.map((bestPrice) => (
          <>
            <ListCard key={bestPrice.id} className={"group flex items-center"}>
              <div className="flex gap-4 items-center h-32">
                <Image
                  src={bestPrice.imageUrl}
                  width={280}
                  height={150}
                  alt={bestPrice.name}
                  loading="lazy"
                  className="object-contain h-full w-full"
                />
                {/* <div>{bestPrice.name}</div> */}
              </div>
              {!isUpdating && (
                <>
                  <div className="hidden group-hover:flex gap-2">
                    <Button
                      variant={"success"}
                      disabled={loading}
                      size="sm"
                      onClick={() => {
                        setIsUpdating(true);
                        setInitialData(bestPrice);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={loading}
                      size="sm"
                      onClick={() => {
                        setOpen(true);
                        setDeleteId(bestPrice.id);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </ListCard>
          </>
        ))}
      </div>
    </Card>
  );
}
