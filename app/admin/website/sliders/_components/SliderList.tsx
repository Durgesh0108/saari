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
import { Sliders } from "@prisma/client";
import { UpdateSliderForm } from "./UpdateSliderForm";

export default function SliderList() {
  const [Sliders, setSliders] = useState<Sliders[]>([]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [initialdata, setInitialData] = useState([]);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/website/slider/${id}`);
      location.reload();
      toast.success("Slider Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const slider = async () => {
      const sliderRes = await fetch(`/api/website/slider`, {
        next: { revalidate: 60 },
      });

      const Slider = await sliderRes.json();
      setSliders(Slider);
    };

    slider();
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
            <UpdateSliderForm
              initialData={initialdata}
              onCancel={() => {
                setIsUpdating(false);
                setEditId("");
              }}
            />
          </>
        )}
        {Sliders.length === 0 && <p>No Sliders Available</p>}
        {Sliders.map((slider) => (
          <>
            <ListCard key={slider.id} className={"group flex items-center"}>
              <div className="flex gap-4 items-center">
                <Image
                  src={slider.imageUrl}
                  width={280}
                  height={150}
                  alt={slider.name}
                  loading="lazy"
                />
                {/* <div>{slider.name}</div> */}
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
                        setInitialData(slider);
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
                        setDeleteId(slider.id);
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
