import React from 'react';
import SearchBar from "../components/SearchBar.jsx";
import { Trash2 } from 'lucide-react';

const Labels = () => {
  const [isNewLabelClicked, setIsNewLabelClicked] = React.useState(false);

  const [newLabel, setNewLabel] = React.useState({
    name: "",
    color: "#e66465",
  });

  const [searchLabel, setSearchLabel] = React.useState("");

  const [labels, setLabels] = React.useState([]);

  const filteredLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchLabel.toLowerCase())
  );

  React.useEffect(() => {
    const storedLabels = localStorage.getItem("labels");
    if (storedLabels) {
      setLabels(JSON.parse(storedLabels));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedLabels = [...labels, newLabel];
    setLabels(updatedLabels);
    localStorage.setItem("labels", JSON.stringify(updatedLabels));

    setIsNewLabelClicked(false);
  };

  const handleInputChange = (e) => {
    setNewLabel({...newLabel, name: e.target.value});
  };

  const handleColorChange = (e) => {
    setNewLabel({...newLabel, color: e.target.value});
  };

  const handleDelete = (name) => {
    const updatedLabels = labels.filter(label => label.name !== name);
    setLabels(updatedLabels);
    localStorage.setItem("labels", JSON.stringify(updatedLabels));
  };

  return (
    <>
      {isNewLabelClicked && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 z-10"></div>
      )}

      <div className="relative z-20 max-w-256 w-full mx-auto px-4 mt-10">
        <h1 className="font-semibold text-3xl mb-3">Labels</h1>

        <div className="flex justify-center w-full gap-3">
          <SearchBar placeholderText="Search all labels" setSearchLabel={setSearchLabel} />
          <button
            className="rounded-md px-3 py-1 text-white font-semibold bg-green-700 cursor-pointer hover:bg-[#5e6804] active:bg-green-800"
            onClick={() => setIsNewLabelClicked(true)}
          >
            New Label
          </button>
        </div>

        {labels.length > 0 && (
          <div className="flex flex-col border border-[#e0e0e0] rounded-md mt-6">
            <div className="bg-[#f1f1f1] p-4">{filteredLabels.length} label{filteredLabels.length !== 1 ? 's' : ''}</div>
            {filteredLabels
              .map((label) => (
                <div key={label.name} className="border border-[#e0e0e0] p-4 flex justify-between items-center">
                  <div
                    className="rounded-full w-fit py-2 px-4 text-white font-semibold"
                    style={{ backgroundColor: label.color }}
                  >
                    {label.name}
                  </div>
                  <Trash2
                    size={25}
                    className="text-red-700 cursor-pointer active:opacity-70"
                    onClick={() => handleDelete(label.name)}
                  />
                </div>
              ))}

          </div>
          )
        }

        {isNewLabelClicked && (
          <div className="fixed inset-0 flex justify-center items-center z-20">
            <div className="w-128 bg-white rounded-xl shadow-xl p-6">
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Label name:</label>
                <input
                  id="name"
                  placeholder="Name"
                  className="border border-[#e0e0e0] rounded-md my-4 px-5 py-1 w-full focus:outline-none focus:border-blue-800"
                  onChange={handleInputChange}
                />
                <label htmlFor="color">Label color:</label>
                <input id="color" type="color" value={newLabel.color} className="cursor-pointer block" onChange={handleColorChange} />
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 rounded cursor-pointer text-white bg-green-700 hover:bg-[#5e6804] active:bg-green-800 float-end"
                >
                  Create Label
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Labels;
