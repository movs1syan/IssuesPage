import { getTextColor } from "../../utils/colors.js";

const Label = ({ label, newIssue= null, ...otherProps }) => {
  const color = getTextColor(label.color);
  return (
    <div
      className={`
        rounded-full w-fit inline-block px-2 py-1 text-sm font-medium cursor-pointer
        ${color === "black" ? "text-black" : "text-white"}
        ${newIssue?.labels?.some(l => l.id === label.id) ? "ring-2 ring-offset-2 ring-black" : ""}
      `}
      style={{ backgroundColor: label.color }}
      {...otherProps}
    >
      {label.name}
    </div>
  );
};

export default Label;