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
import { Category, Pattern } from "@prisma/client";
import { UpdatePatternForm } from "./UpdatePatternForm";
import Header from "@/components/ui/header";

export default function PatternList() {
  const [Patterns, setPatterns] = useState<Pattern[]>([]);
  
  const [categories, setcategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [EditId, setEditId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/pattern/${id}`);
      location.reload();
      toast.success("Pattern Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // useEffect(() => {
  //   const fetchPattern = async () => {
  //     const patternRes = await fetch(`/api/pattern/`, {
  //       next: { revalidate: 60 },
  //     });

  //     const Pattern = await patternRes.json();
  //     setPatterns(Pattern);
  //   };

  //   fetchPattern();
  // }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const dataRes = await fetch(`/api/category`);
      const category = await dataRes.json();
      setcategories(category);
      setSelectedCategory(category[0]?.id);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        const PatternRes = await fetch(
          `/api/category/${selectedCategory}/pattern`
        );
        const Pattern = await PatternRes.json();
        setPatterns(Pattern);
      } else {
        const PatternRes = await fetch(`/api/pattern`);
        const Pattern = await PatternRes.json();
        setPatterns(Pattern);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

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
          <Header>Pattern List</Header>
        </div>
        <select
          name="category"
          id="category"
          // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
          className="p-2 border-black border-[1px] rounded-lg"
          onChange={handleCategoryChange}
        >
          {categories.length === 0 && <option>No Category Available</option>}
          {categories.map((category) => (
            <option value={category.id} key={category.id} className="px-4 py-1">
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        {isUpdating && (
          <>
            <UpdatePatternForm
              name={name}
              imageUrl={imageUrl}
              EditId={EditId}
              onCancel={() => {
                setIsUpdating(false);
                setEditId("");
              }}
            />
          </>
        )}
        {Patterns.length === 0 && <p>No Patterns Available</p>}
        {Patterns.map((pattern) => (
          <>
            <ListCard key={pattern.id} className={"group flex items-center"}>
              <div className="flex gap-4 items-center">
                <Image
                  src={pattern.imageUrl}
                  width={40}
                  height={30}
                  alt={pattern.name}
                  loading="lazy"
                />
                <div>{pattern.name}</div>
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
                        setEditId(pattern.id);
                        setName(pattern.name);
                        setImageUrl(pattern.imageUrl);
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
                        setDeleteId(pattern.id);
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
