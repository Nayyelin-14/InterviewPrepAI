import React from "react";

const RoleInfoReader = ({
  role,
  topicsToFocus,
  level,
  experience,
  description,
  questions,
  updatedAt,
}) => {
  return (
    <div className="bg-white relative">
      <div className="my-10 mx-auto px-10 md:px-20">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-medium">{role}</h2>
                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {topicsToFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="text-[11px] font-medium bg-black text-white px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
              Experience {experience} {experience === 1 ? "Year" : "Years"}
            </div>
            <div className="text-[11px] font-medium bg-black text-white px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
              {level} level
            </div>
            <div className="text-[11px] font-medium bg-black text-white px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
              {questions} Q&A
            </div>
            <div className="text-[11px] font-medium  bg-black text-white px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
              Last Updated : {updatedAt}
            </div>
          </div>
        </div>
        <div className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-white overflow-hidden absolute top-0 right-0">
          <div className="w-16 h-16  bg-lime-400 blur-[65px] animate-blob1" />
          <div className="w-16 h-16  bg-teal-400 blur-[65px] animate-blob2" />

          <div className="w-16 h-16  bg-cyan-400 blur-[65px] animate-blob3" />
          <div className="w-16 h-16  bg-fuchsia-400 blur-[65px] animate-blob1" />
        </div>
      </div>
    </div>
  );
};

export default RoleInfoReader;
