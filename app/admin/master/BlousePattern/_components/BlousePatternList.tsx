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
import Header from "@/components/ui/header";
import { UpdateBlousePatternForm } from "./UpdateBlousePatternForm";

export default function BlousePatternList({ categories }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [initialdata, setInitialData] = useState([]);
  const [category, setCategory] = useState(categories);
  const [BlousePattern, setBlousePattern] = useState([]);

  const [SelectedCategory, setSelectedCategory] = useState<string | undefined>(
    category[0].id
  );

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/blousePattern/${id}`);
      location.reload();
      toast.success("Blouse Pattern Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    if (SelectedCategory) {
      const SelectCategory = category.find(
        (category) => category.id === SelectedCategory
      );
      setBlousePattern(
        SelectCategory.BlousePattern ? SelectCategory.BlousePattern : []
      );
    }
  }, [SelectedCategory, category]);

  return (
    <Card className="p-8">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => handleDelete(deleteId)}
        loading={loading}
      />
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <Header>Blouse Pattern List</Header>
        </div>
        <select
          name="category"
          id="category"
          // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
          className="p-2 border-black border-[1px] rounded-lg"
          onChange={handleCategoryChange}
        >
          {category.length === 0 && <option>No category Available</option>}
          {category.map((cate) => (
            <option value={cate.id} key={cate.id} className="px-4 py-1">
              {cate.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        {isUpdating && (
          <>
            <UpdateBlousePatternForm
              initialdata={initialdata}
              onCancel={() => {
                setIsUpdating(false);
                setEditId("");
              }}
            />
          </>
        )}
        {BlousePattern.length === 0 && <p>No Blouse Pattern Available</p>}
        {BlousePattern.map((blouse) => (
          <>
            <ListCard key={blouse.id} className={"group flex items-center"}>
              <div className="flex gap-4 items-center">
                <div>{blouse.name}</div>
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
                        setInitialData(blouse);
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
                        setDeleteId(blouse.id);
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
