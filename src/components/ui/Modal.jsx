import React from 'react';
import { CircleX } from "lucide-react";

const Modal = ({ children, setIsModalOpened }) => {
  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-400 opacity-50 z-10" onClick={handleCloseModal}></div>
      <div className="w-128 bg-white rounded-xl shadow-xl p-6 z-20 absolute top-1/2 left-1/2 transform -translate-1/2">
        <CircleX size={25} onClick={handleCloseModal} className="cursor-pointer float-end active:opacity-70" />
        {children}
      </div>
    </>
  );
};

export default Modal;