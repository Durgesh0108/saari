// _components/DeleteProductDescriptionForm.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Trash2 } from "lucide-react";

const DeleteProductDescriptionForm = ({ descriptionId, productId }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/website/product/${productId}/description/${descriptionId}`
      );
      toast.success("Description deleted successfully");
      location.reload();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      className="h-full"
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteProductDescriptionForm;
