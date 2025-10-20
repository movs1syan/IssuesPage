import React, { useState } from 'react';
import { CircleDot, Trash2 } from "lucide-react";
import Label from "./ui/Label.jsx"
import Modal from "./ui/Modal.jsx";
import Button from "./ui/Button.jsx";

const IssueItem = ({ issue, handleDelete }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleButtonClick = () => handleDelete(issue.id);

  return (
    <>
      <div className="border border-[#e0e0e0] p-4 flex justify-between items-center hover:bg-[#f1f1f1]">
        <div className="flex items-center gap-4">
          <CircleDot size={20} className="text-green-700 min-w-5" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center flex-wrap gap-3">
              <h2 className="font-semibold text-2xl">{issue.title}</h2>
              <div className="flex flex-wrap gap-1">
                {issue.labels.map((label) => (
                  <Label key={label.id} label={label} />
                ))}
              </div>
            </div>
            <div className="text-[#5f5f5f] text-sm">{issue.description}</div>
          </div>
        </div>
        <Trash2
          size={20}
          className="text-[#c21807] cursor-pointer active:opacity-70 min-w-6 ml-2"
          onClick={() => setIsModalOpened(true)}
        />
      </div>

      {isModalOpened && (
        <Modal setIsModalOpened={setIsModalOpened}>
          <h1 className="mb-4">Are you sure you want to delete this issue ?</h1>
          <Button title="Delete Issue" buttonType="danger" onClick={handleButtonClick} />
        </Modal>
      )}
    </>
  );
};

export default IssueItem;