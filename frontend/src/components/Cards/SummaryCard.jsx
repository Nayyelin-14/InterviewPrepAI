import React from "react";
import { LuTrash } from "react-icons/lu";
import { getInitials } from "../../utils/helpers";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  description,
  experience,
  questions,
  lastUpdated,
  onSelect,
  onDelete,
  level,
}) => {
  return (
    <div
      className="bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden  cursor-pointer hover:shadow-xl shadow-gray-100 relative group"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 curosr-pointer relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex  items-center justify-center mr-4">
            <span className="text-lg font-semibold text-black">
              {getInitials(role)}
            </span>
          </div>
          {/* content container */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              {/* title and skill */}
              <div>
                <h2 className="text-[17px] font-medium">{role}</h2>
                <p className="text-xs text-gray-600 font-medium">
                  {topicsToFocus}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded-full text-nowrap border border-rose-100 hover:border-rose-200 hover:text-red-400/60 cursor-pointer absolute top-2 right-2"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash className="w-4 h-4 " />
        </button>
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center gap-3 mt-4">
          <div className="text-[11px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
            Exprience : {experience}
            {/* {experience === 1 ? "Year" : "Years"} */}
          </div>
          <div className="text-[11px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full flex items-center justify-center">
            {questions} Q&A
          </div>
          <div className="text-[11px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full flex items-center justify-center">
            {level} level
          </div>
          <div className="text-[11px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
            Last Updated {lastUpdated}
          </div>
        </div>
        <p className="text-[13px] mt-2 text-gray-500 font-medium line-clamp-2 ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
