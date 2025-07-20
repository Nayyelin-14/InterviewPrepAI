import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="w-md p-4  ">
      <p className="text-[14px] mb-5">{content}</p>
      <div className="flex items-end justify-end">
        <button
          className="bg-black px-5 py-2 rounded-lg text-white cursor-pointer hover:bg-black/60"
          onClick={onDelete}
          type="button"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
