import { Expand } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AiResponsePreview from "../AiResponse/AiResponsePreview";

const QuestionCards = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div className="bg-white rounded-lg mb-4 overflow-hidden p-4 shadow-xl shadow-gray-100/70 border   border-gray-100 group ">
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-3.5">
            <span className="text-md md:text-[15px] font-semibold text-gray-400 leading-[13px] ">
              Q
            </span>
            <h3
              onClick={toggleExpand}
              className="text-md md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20"
            >
              {question}
            </h3>
          </div>
          <div className="flex items-center  justify-end p-1  relative">
            <div
              className={`flex ${
                isExpanded ? "md:flex " : "md:hidden group-hover:flex"
              }`}
            >
              <button
                className="flex items-center gap-3 text-sm text-indigo-90 font-medium bg-indigo-100 px-3 py-1 rounded text-nowrap border border-indigo-50 hover:border-indigo-400 cursor-pointer mr-2"
                onClick={onTogglePin}
              >
                {isPinned ? (
                  <LuPinOff className="text-sm" />
                ) : (
                  <LuPin className="text-sm" />
                )}
              </button>
              <button
                className="flex items-center gap-2 text-sm text-cyan-800 font-medium bg-cyan-100 px-3 py-1 mr-2 text-nowrap border border-cyan-100 hover:border-cyan-400 cursor-pointer"
                onClick={() => {
                  setIsExpanded(true);
                  onLearnMore();
                }}
              >
                <LuSparkles />
                <span className="hidden md:block"> Learn More</span>
              </button>
            </div>
            <button
              className="text-gray-400 hover:text-gary-500 cursor-pointer"
              onClick={toggleExpand}
            >
              <LuChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${height}px` }}
        >
          <div
            className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
            ref={contentRef}
          >
            <AiResponsePreview content={answer} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCards;
