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
import { UpdateOccassionForm } from "./UpdateOccassionForm";
import { Occassion } from "@prisma/client";
import Image from "next/image";

export default function OccassionList() {
  const [occassion, setOccassion] = useState<Occassion[]>([]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [EditId, setEditId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [bannerUrl, setBannerUrl] = useState<string>("");

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/occassion/${id}`);
      location.reload();
      toast.success("Occassion Deleted Successfully");
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchOccassion = async () => {
      const brandRes = await fetch(`/api/occassion/`, {
        next: { revalidate: 60 },
      });

      const brand = await brandRes.json();
      setOccassion(brand);
    };

    fetchOccassion();
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
            <UpdateOccassionForm
              initialData={occassion}
              name={name}
              imageUrl={imageUrl}
              bannerUrl={bannerUrl}
              EditId={EditId}
              onCancel={() => {
                setIsUpdating(false);
                setEditId("");
              }}
            />
          </>
        )}
        {occassion.length === 0 && <p>No Occassion Available</p>}
        {occassion.map((occass) => (
          <>
            <ListCard key={occass.id} className={"group flex items-center"}>
              <div className="flex gap-4 items-center">
                <Image
                  src={occass.imageUrl}
                  width={40}
                  height={30}
                  alt={occass.name}
                  loading="lazy"
                />
                <div>{occass.name}</div>
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
                        setEditId(occass.id);
                        setName(occass.name);
                        setImageUrl(occass.imageUrl);
                        setBannerUrl(occass.bannerUrl);
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
                        setDeleteId(occass.id);
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
