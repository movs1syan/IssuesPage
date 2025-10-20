import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Modal from "./ui/Modal.jsx"
import Label from "./ui/Label.jsx";
import Button from "./ui/Button.jsx";

const IssueModalForm = ({ issues, setIssues, labels, setIsModalOpened }) => {
  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    labels: [],
  });

  const chooseLabel = (label) => {
    if (!newIssue.labels.includes(label)) {
      setNewIssue((prevState) => {
        return {
        ...prevState,
          labels: [...prevState.labels, label]
        }
    });
    } else {
      setNewIssue((prevState) => {
        return {
          ...prevState,
          labels: prevState.labels.filter((l) => l.id !== label.id)
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedIssues = [...issues, { id: uuid(), ...newIssue }];
    setIssues(updatedIssues);
    localStorage.setItem("issues", JSON.stringify(updatedIssues));

    setIsModalOpened(false);
  };

  const handleChange = (e) => {
    setNewIssue({...newIssue, [e.target.name]: e.target.value});
  };

  return (
    <Modal setIsModalOpened={setIsModalOpened}>
      <form id="create-issue" onSubmit={handleSubmit}>
        <label>
          Issue title:
          <input
            name="title"
            placeholder="Title"
            className="border border-[#e0e0e0] rounded-md my-4 px-5 py-1 w-full focus:outline-none focus:border-blue-800"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="desc">Issue description:</label>
        <textarea
          id="desc"
          name="description"
          placeholder="Description"
          className="border border-[#e0e0e0] rounded-md my-4 px-5 py-2 w-full focus:outline-none focus:border-blue-800"
          onChange={handleChange}
          required
        ></textarea>
        <div>
          <div className="mb-2">Labels:</div>
          <div className="flex flex-wrap gap-3 mb-4">
            {labels.map((label) => (
              <Label key={label.id} label={label} newIssue={newIssue} onClick={() => chooseLabel(label)} />
            ))}
          </div>
        </div>
        <Button title="Create Issue" type="submit" buttonType="primary" />
      </form>
    </Modal>
  );
};

export default IssueModalForm;