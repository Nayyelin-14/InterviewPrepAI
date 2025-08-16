import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChangeInput, label, placeholder, type, name }) => {
  const [showpassword, setShowpassword] = useState(false);
  const toogleShowpassword = () => {
    setShowpassword((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-4 mb-4">
      <label htmlFor={label} className="text-[13px] text-slate-800">
        {label}
      </label>

      <div className="relative">
        <input
          name={name}
          className="w-full bg-gray-100 p-2 outline-none focus:border focus:border-yellow-400 "
          type={
            type === "password" ? (showpassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeInput(e)}
        />
        {type === "password" && (
          <>
            {showpassword ? (
              <FaRegEye
                size={22}
                className="text-yellow-400 cursor-pointer absolute bottom-3 right-3"
                onClick={() => toogleShowpassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer absolute bottom-3  right-3"
                onClick={() => toogleShowpassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
