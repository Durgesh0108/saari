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
import { Category, Type } from "@prisma/client";
import Image from "next/image";
import Header from "@/components/ui/header";
import { UpdateSubTypeForm } from "./UpdateSubTypeForm";

export default function SubTypeList() {
  const [Types, setTypes] = useState<Type[]>([]);
  const [categories, setcategories] = useState<Category[]>([]);
  const [SubTypes, setSubTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );
  const [selectedType, setSelectedType] = useState<string | undefined>("");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [EditId, setEditId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [bannerUrl, setbannerUrl] = useState<string>("");

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/subType/${id}`);
      location.reload();
      toast.success("Sub Type Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // useEffect(() => {
  //   const fetchType = async () => {
  //     const typeRes = await fetch(`/api/type/`, {
  //       next: { revalidate: 60 },
  //     });

  //     const Type = await typeRes.json();
  //     setTypes(Type);
  //   };

  //   fetchType();
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
    const fetchTypes = async () => {
      if (selectedCategory) {
        const TypeRes = await fetch(`/api/category/${selectedCategory}/type`);
        const Type = await TypeRes.json();
        setTypes(Type);
        setSelectedType(Type[0]?.id);
      }
    };

    fetchTypes();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchSubTypes = async () => {
      if (selectedType) {
        const subTypeRes = await fetch(`/api/type/${selectedType}/subType`);
        const SubType = await subTypeRes.json();
        setSubTypes(SubType);
      }
    };

    fetchSubTypes();
  }, [selectedCategory, selectedType]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
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
          <Header>Sub Type List</Header>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="category"
            id="category"
            // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
            className="p-2 border-black border-[1px] rounded-lg"
            onChange={handleCategoryChange}
          >
            {categories.length === 0 && <option>No Category Available</option>}
            {categories.map((category) => (
              <option
                value={category.id}
                key={category.id}
                className="px-4 py-1"
              >
                {category.name}
              </option>
            ))}
          </select>
          <select
            name="category"
            id="category"
            // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
            className="p-2 border-black border-[1px] rounded-lg"
            onChange={handleTypeChange}
          >
            {Types.length === 0 && <option>No Types Available</option>}
            {Types.map((type) => (
              <option value={type.id} key={type.id} className="px-4 py-1">
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {isUpdating && (
          <>
            <UpdateSubTypeForm
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
        {SubTypes.length === 0 && <p>No SubTypes Available</p>}
        {SubTypes.map((subtype) => (
          <>
            <ListCard key={subtype.id} className={"group flex items-center"}>
              <div className="flex gap-4 items-center">
                <Image
                  src={subtype.imageUrl}
                  width={40}
                  height={30}
                  alt={subtype.name}
                  loading="lazy"
                />
                <div>{subtype.name}</div>
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
                        setEditId(subtype.id);
                        setName(subtype.name);
                        setImageUrl(subtype.imageUrl);
                        setbannerUrl(subtype.bannerUrl);
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
                        setDeleteId(subtype.id);
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
