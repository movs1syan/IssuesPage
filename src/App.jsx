import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./components/Searchbar.jsx";
import IssueModalForm from "./components/IssueModalForm.jsx";
import IssueItem from "./components/IssueItem.jsx";
import Button from "./components/ui/Button.jsx";
import { Tag } from "lucide-react";

const App = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState("");

  const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

  useEffect(() => {
    const storedLabels = localStorage.getItem("labels");
    if (storedLabels) {
      setLabels(JSON.parse(storedLabels));
    }

    (async () => {
      setIsLoading(true);
      await delay(2000);

      const storedIssues = localStorage.getItem("issues");
      if (storedIssues) {
        setIssues(JSON.parse(storedIssues));
        setFilteredIssues(JSON.parse(storedIssues));
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (debouncedValue === "") {
      setFilteredIssues(issues);
      return;
    }

    (async () => {
      setIsLoading(true);
      await delay(500);

      const storedIssues = localStorage.getItem("issues");
      if (storedIssues) {
        setFilteredIssues(JSON.parse(storedIssues));
      }

      setFilteredIssues(
        issues.filter((issue) =>
          issue.title.toLowerCase().includes(debouncedValue.toLowerCase())
        )
      );

      setIsLoading(false);
    })();
  }, [debouncedValue, issues]);

  const handleDelete = (id) => {
    const updatedIssues = issues.filter(issue => issue.id !== id);
    setIssues(updatedIssues);
    localStorage.setItem("issues", JSON.stringify(updatedIssues));
  };

  return (
    <>
      <div className="relative max-w-256 w-full mx-auto px-4">
        <h1 className="font-semibold text-3xl mb-3 mt-10">Issues</h1>

        <div className="flex justify-center w-full gap-3">
          <Searchbar placeholderText="Search issues" setDebouncedValue={setDebouncedValue} />
          <Link to="/labels">
            <Button title="Labels" icon={<Tag size={20} className="text-[#5f5f5f] mr-2 my-auto" />} />
          </Link>
          <Button title="New Issue" onClick={() => setIsModalOpened(true)} buttonType="primary" />
        </div>

        {isLoading ? (
          <div className="mt-6">Loading . . .</div>
        ) : (
          <div>
            {issues.length > 0 && (
              <div className="flex flex-col border border-[#e0e0e0] rounded-md mt-6">
                <div className="bg-[#f1f1f1] p-4">{filteredIssues.length} issue{filteredIssues.length > 1 ? "s" : ""}</div>
                {filteredIssues.map((issue) => (
                  <IssueItem key={issue.id} issue={issue} handleDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpened && (
        <IssueModalForm issues={issues} setIssues={setIssues} labels={labels} setIsModalOpened={setIsModalOpened} />
      )}
    </>
  );
};

export default App;
