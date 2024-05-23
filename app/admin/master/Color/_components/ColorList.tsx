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
import { Color } from "@prisma/client";
import Image from "next/image";
import { UpdateColorForm } from "./UpdateColorForm";

export default function ColorList() {
  const [Color, setColor] = useState<Color[]>([]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [EditId, setEditId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [hexCode, sethexCode] = useState<string>("");

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/color/${id}`);
      location.reload();
      toast.success("Color Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchcolor = async () => {
      const colorRes = await fetch(`/api/color`, {
        next: { revalidate: 60 },
      });

      const Colors = await colorRes.json();
      setColor(Colors);
    };

    fetchcolor();
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
            <UpdateColorForm
              name={name}
              hexCode={hexCode}
              EditId={EditId}
              onCancel={() => {
                setIsUpdating(false);
                setEditId("");
              }}
            />
          </>
        )}
        {Color.length === 0 && <p>No Color Available</p>}
        {Color.map((col) => (
          <>
            <ListCard key={col.id} className={"group flex items-center"}>
              <div className="flex gap-4 items-center">
                <div
                  className="rounded-full w-6 h-6 border-black border-2"
                  style={{ backgroundColor: `${col.hexCode}` }}
                ></div>
                <div>{col.name}</div>
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
                        setEditId(col.id);
                        setName(col.name);
                        sethexCode(col.hexCode);
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
                        setDeleteId(col.id);
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
