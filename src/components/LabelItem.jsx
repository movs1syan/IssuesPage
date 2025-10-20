import React, {useState} from 'react';
import { Trash2 } from "lucide-react";
import Label from "./ui/Label.jsx";
import Modal from "./ui/Modal.jsx";
import Button from "./ui/Button.jsx";

const LabelItem = ({ label, handleDelete }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleButtonClick = () => handleDelete(label.id);

  return (
    <>
      <div className="border border-[#e0e0e0] p-4 flex justify-between items-center hover:bg-[#f1f1f1]">
        <Label label={label} />
        <Trash2
          size={20}
          className="text-[#c21807] cursor-pointer active:opacity-70 ml-2"
          onClick={() => setIsModalOpened(true)}
        />
      </div>

      {isModalOpened && (
        <Modal setIsModalOpened={setIsModalOpened}>
          <h1 className="mb-4">Are you sure you want to delete this label ?</h1>
          <Button title="Delete Label" buttonType="danger" onClick={handleButtonClick} />
        </Modal>
      )}
    </>
  );
};

export default LabelItem;