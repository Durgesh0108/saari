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
import { Pattern } from "@prisma/client";
import { UpdatePatternForm } from "./UpdatePatternForm";
import { UpdateCategoryForm } from "./UpdateCategoryForm";

export default function CategoryList() {
  const [Categories, setCategories] = useState<Category[]>([]);

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
      await axios.delete(`/api/category/${id}`);
      location.reload();
      toast.success("Category Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchPattern = async () => {
      const categoryRes = await fetch(`/api/category`, {
        next: { revalidate: 60 },
      });

      const categories = await categoryRes.json();
      console.log({ categories });
      setCategories(categories);
    };

    fetchPattern();
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
            <UpdateCategoryForm
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
        {Categories.length === 0 && <p>No Categories Available</p>}
        {Categories.map((category) => (
          <>
            <ListCard key={category.id} className={"group flex items-center"}>
              <div className="flex gap-4 items-center">
                <Image
                  src={category.imageUrl}
                  width={40}
                  height={30}
                  alt={category.name}
                  loading="lazy"
                />
                <div>{category.name}</div>
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
                        setEditId(category.id);
                        setName(category.name);
                        setImageUrl(category.imageUrl);
                        setBannerUrl(category.bannerUrl);
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
                        setDeleteId(category.id);
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
