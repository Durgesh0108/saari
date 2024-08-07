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
import { UpdateWeaveTypeForm } from "./UpdateWeaveTypeForm";

export default function WeaveTypeList({ weaves }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [initialdata, setInitialData] = useState([]);
  const [Weaves, setWeaves] = useState(weaves);
  const [WeaveTypes, setWeaveTypes] = useState([]);

  const [selectedWeave, setSelectedWeave] = useState<string | undefined>(
    Weaves[0].id
  );

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/weaveType/${id}`);
      location.reload();
      toast.success("Weave Type Deleted Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleWeaveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeave(e.target.value);
  };

  useEffect(() => {
    if (selectedWeave) {
      const SelectWeave = Weaves.find((weave) => weave.id === selectedWeave);
      setWeaveTypes(SelectWeave.WeaveType ? SelectWeave.WeaveType : []);
    }
  }, [selectedWeave, Weaves]);

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
          <Header>Weave Type List</Header>
        </div>
        <select
          name="category"
          id="category"
          // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
          className="p-2 border-black border-[1px] rounded-lg"
          onChange={handleWeaveChange}
        >
          {Weaves.length === 0 && <option>No Weave Available</option>}
          {Weaves.map((weave) => (
            <option value={weave.id} key={weave.id} className="px-4 py-1">
              {weave.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        {isUpdating && (
          <>
            <UpdateWeaveTypeForm
              initialdata={initialdata}
              onCancel={() => {
                setIsUpdating(false);
                setEditId("");
              }}
            />
          </>
        )}
        {WeaveTypes.length === 0 && <p>No Weave Type Available</p>}
        {WeaveTypes.map((weaveType) => (
          <>
            <ListCard key={weaveType.id} className={"group flex items-center"}>
              <div className="flex gap-4 items-center">
                <div>{weaveType.name}</div>
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
                        setInitialData(weaveType);
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
                        setDeleteId(weaveType.id);
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
