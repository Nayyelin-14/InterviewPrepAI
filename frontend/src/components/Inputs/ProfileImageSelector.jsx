import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import React, { useRef, useState } from "react";

const ProfileImageSelector = () => {
  const imageInpRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImg = () => {
    setPreviewUrl(null);
    if (imageInpRef.current) imageInpRef.current.value = "";
  };

  const onChooseInput = () => {
    imageInpRef.current.click();
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <input
        name="profilePic" // this ensures the file is included in fetcher.Form
        type="file"
        accept="image/*"
        ref={imageInpRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-orange-500" />
          <button
            onClick={onChooseInput}
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer hover:bg-orange-600"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImg}
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer hover:bg-red-600"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfileImageSelector;
