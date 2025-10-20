const Button = ({ title, buttonType = "default", type= "button", icon = null, ...otherProps }) => {
  const color =
    buttonType === "primary" ? "text-white bg-green-700 hover:bg-[#5e6804] active:bg-green-800" :
    buttonType === "danger" ? "text-white bg-red-700 hover:bg-[#c21807] active:bg-red-800" :
    buttonType === "default" && "border border-[#e0e0e0] bg-[#f3f3f3] hover:bg-[#ececec] active:bg-[#e0e0e0]";

  return (
    <button
      type={type}
      className={`flex items-center px-2 py-1 rounded-md cursor-pointer font-semibold ${color} ${type === "submit" && "float-end"}`}
      {...otherProps}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;