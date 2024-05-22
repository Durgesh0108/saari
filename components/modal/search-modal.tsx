"use client";

import { Modal } from "../ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchModal } from "@/hooks/use-search-modal";
import { LocationSearchInput } from "../FRONTEND/LocationSearchInput";

const formSchema = z.object({
  name: z.string().min(1),
});

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleFormSubmitSuccess = () => {
    onClose(); // Close the modal
  };
  return (
    <Modal
      title="Search By Location"
      description="Search For Better Results"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <LocationSearchInput onSubmitSuccess={handleFormSubmitSuccess}/>
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
