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
import { AttireImageUpdateForm } from "./UpdateAttireForm";

export default function AttireList({ attires, DressStyles, TopViews }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [initialdata, setInitialData] = useState([]);
  const [dressStyles, setDressStyles] = useState(DressStyles);
  const [topViews, setTopViews] = useState(TopViews);
  const [attire, setAttire] = useState([]);

  const [SelectedDressStyle, setSelectedDressStyle] = useState<
    string | undefined
  >("");
  const [SelectedTopView, setSelectedTopView] = useState<string | undefined>(
    ""
  );

  const handleDressStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDressStyle(e.target.value);
  };
  const handleTopViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopView(e.target.value);
  };

  useEffect(() => {
    const attire = attires.filter(
      (attire) =>
        attire.dressStyleId === SelectedDressStyle &&
        attire.topViewId === SelectedTopView
    );

    setAttire(attire);
  }, [SelectedDressStyle, SelectedTopView, attires]);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/website/attire/${id}`);
      location.reload();
      toast.success("Attire Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

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
            <AttireImageUpdateForm
              initialData={initialData}
              onCancel={() => {
                setIsUpdating(false);
                setEditId("");
              }}
            />
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="category"
            id="category"
            // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
            className="p-2 border-black border-[1px] rounded-lg"
            onChange={handleDressStyleChange}
          >
            {DressStyles.length === 0 ? (
              <option>No Dress Style Available</option>
            ) : (
              <option>Please Select A Dress Style</option>
            )}
            {DressStyles.map((dress) => (
              <option value={dress.id} key={dress.id} className="px-4 py-1">
                {dress.name}
              </option>
            ))}
          </select>
          <select
            name="category"
            id="category"
            // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
            className="p-2 border-black border-[1px] rounded-lg"
            onChange={handleTopViewChange}
          >
            {topViews.length === 0 ? (
              <option>No Top View Available</option>
            ) : (
              <option>Please Select A Top View</option>
            )}
            {topViews.map((topview) => (
              <option value={topview.id} key={topview.id} className="px-4 py-1">
                {topview.name}
              </option>
            ))}
          </select>
        </div>
        {attire.length === 0 && <p>No Attire Available</p>}
        {attire.map((attire) => (
          <>
            <ListCard key={attire.id} className={"group flex items-center"}>
              <div className="flex gap-4 items-center h-32">
                <Image
                  src={attire.images[0].url}
                  width={280}
                  height={150}
                  alt={attire.name}
                  loading="lazy"
                  className="object-contain h-full w-full"
                />
                {/* <div>{attire.name}</div> */}
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
                        setInitialData(attire);
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
                        setDeleteId(attire.id);
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
