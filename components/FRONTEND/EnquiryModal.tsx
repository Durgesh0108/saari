import React, { useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
// You need to import your modal and textarea components here

const EnquiryModal = ({ onClose, onSubmit, isOpen, isSending }) => {
  const [enquiry, setEnquiry] = useState("");

  const handleSubmit = () => {
    onSubmit(enquiry);
    setEnquiry("");
  };

  return (
    <Modal
      onClose={onClose}
      title="Enquiry Service"
      description="Enquity Description"
      isOpen={isOpen}
    >
      <div className="flex flex-col gap-4">
        {/* Render textarea only if isOpen is true */}
        {isOpen && (
          <Textarea
            value={enquiry}
            onChange={(e) => setEnquiry(e.target.value)}
          />
        )}
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isSending}>
            {isSending ? "Sending..." : "Submit"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EnquiryModal;
