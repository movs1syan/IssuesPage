import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { BadgeAlert } from 'lucide-react';
import Searchbar from "../components/Searchbar.jsx";
import LabelModalForm from "../components/LabelModalForm.jsx";
import LabelItem from "../components/LabelItem.jsx";
import Button from "../components/ui/Button.jsx";

const Labels = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [labels, setLabels] = useState([]);
  const [filteredLabels, setFilteredLabels] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState("");

  const searchRef = useRef("");

  const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await delay(2000);

      const storedLabels = localStorage.getItem("labels");
      if (storedLabels) {
        setLabels(JSON.parse(storedLabels));
        setFilteredLabels(JSON.parse(storedLabels));
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (debouncedValue === "") {
      setFilteredLabels(labels);
      return;
    }

    (async () => {
      setIsLoading(true);
      await delay(500);

      const storedLabels = localStorage.getItem("labels");
      if (storedLabels) {
        setFilteredLabels(JSON.parse(storedLabels));
      }

      setFilteredLabels(
        labels.filter((label) =>
          label.name.toLowerCase().includes(debouncedValue.toLowerCase())
        )
      );

      setIsLoading(false);
    })();
  }, [debouncedValue, labels]);

  const handleDelete = (id) => {
    const updatedLabels = labels.filter(label => label.id !== id);
    setLabels(updatedLabels);
    localStorage.setItem("labels", JSON.stringify(updatedLabels));
  };

  return (
    <>
      <div className="relative max-w-256 w-full mx-auto px-4 mt-10">
        <h1 className="font-semibold text-3xl mb-3">Labels</h1>

        <div className="flex justify-center w-full gap-3">
          <Searchbar placeholderText="Search all labels" setDebouncedValue={setDebouncedValue} ref={searchRef} />
          <Link to="/">
            <Button title="Issues" icon={<BadgeAlert size={20} className="text-[#5f5f5f] mr-2 my-auto" />} />
          </Link>
          <Button title="New Label" onClick={() => setIsModalOpened(true)} buttonType="primary" />
        </div>

        {isLoading ? (
          <div className="mt-6">Loading . . .</div>
        ) : (
          <div>
            {labels.length > 0 && (
              <div className="flex flex-col border border-[#e0e0e0] rounded-md mt-6">
                <div className="bg-[#f1f1f1] p-4">{filteredLabels.length} label{filteredLabels.length !== 1 ? 's' : ''}</div>
                {filteredLabels.map((label) => (
                  <LabelItem key={label.id} label={label} handleDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpened && (
        <LabelModalForm labels={labels} setLabels={setLabels} setIsModalOpened={setIsModalOpened} />
      )}
    </>
  );
};

export default Labels;
