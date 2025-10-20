import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Modal from "./ui/Modal.jsx"
import Button from "./ui/Button.jsx";

const LabelModalForm = ({ labels, setLabels, setIsModalOpened }) => {
  const [newLabel, setNewLabel] = useState({
    name: "",
    color: "#e66465",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedLabels = [...labels, { id: uuid(), ...newLabel }];
    setLabels(updatedLabels);
    localStorage.setItem("labels", JSON.stringify(updatedLabels));

    setIsModalOpened(false);
  };

  const handleChange = (e) => {
    setNewLabel({...newLabel, [e.target.name]: e.target.value});
  };

  return (
    <Modal setIsModalOpened={setIsModalOpened}>
      <form id="create-label" onSubmit={handleSubmit}>
        <label>Label name:
          <input
            name="name"
            placeholder="Name"
            className="border border-[#e0e0e0] rounded-md my-4 px-5 py-1 w-full focus:outline-none focus:border-blue-800"
            onChange={handleChange}
            required
          />
        </label>
        <label>Label color:
          <input
            name="color"
            type="color"
            value={newLabel.color}
            className="cursor-pointer block mb-4"
            onChange={handleChange}
          />
        </label>
        <Button title="Create Label" type="submit" buttonType="primary" />
      </form>
    </Modal>
  );
};

export default LabelModalForm;