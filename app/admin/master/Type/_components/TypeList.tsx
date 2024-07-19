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
import { UpdateTypeForm } from "./UpdateTypeForm";
import Header from "@/components/ui/header";

export default function TypeList() {
  const [Types, setTypes] = useState<Type[]>([]);
  const [categories, setcategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );
  const [SelectedFabric, setSelectedFabric] = useState<string | undefined>("");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [initialData, setInitialData] = useState<string>("");
  const [Fabrics, setFabrics] = useState([]);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/type/${id}`);
      location.reload();
      toast.success("Type Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

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
    const fetchFabrics = async () => {
      if (selectedCategory) {
        const fabricRes = await fetch(
          `/api/category/${selectedCategory}/fabric`
        );
        const Fabric = await fabricRes.json();
        setFabrics(Fabric);
        setSelectedFabric(Fabric[0]?.id);
      }
    };

    fetchFabrics();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchTypes = async () => {
      if (SelectedFabric) {
        const typeRes = await fetch(`/api/fabric/${SelectedFabric}/type`);
        const types = await typeRes.json();
        setTypes(types);
      }
    };

    fetchTypes();
  }, [SelectedFabric]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleFabricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFabric(e.target.value);
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
          <Header>Type List</Header>
        </div>
        {!isUpdating && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <select
              name="category"
              id="category"
              // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
              className="p-2 border-black border-[1px] rounded-lg"
              onChange={handleCategoryChange}
            >
              {categories.length === 0 && (
                <option>No Category Available</option>
              )}
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
              onChange={handleFabricChange}
            >
              {Fabrics.length === 0 && <option>No Fabric Available</option>}
              {Fabrics.map((fabric) => (
                <option value={fabric.id} key={fabric.id} className="px-4 py-1">
                  {fabric.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {isUpdating && (
          <>
            <UpdateTypeForm
              initialData={initialData}
              onCancel={() => {
                setIsUpdating(false);
                setEditId("");
              }}
            />
          </>
        )}
        {Types.length === 0 && <p>No Saari Types Available</p>}
        {Types.map((type) => (
          <>
            <ListCard key={type.id} className={"group flex items-center"}>
              <div className="flex gap-4 items-center">
                <Image
                  src={type.imageUrl}
                  width={40}
                  height={30}
                  alt={type.name}
                  loading="lazy"
                />
                <div>{type.name}</div>
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
                        setInitialData(type);
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
                        setDeleteId(type.id);
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
