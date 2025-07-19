import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import React, { useRef, useState } from "react";

const ProfileImageSelector = ({ image, setImage, preview, setPreview }) => {
  const imageInpRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const files = e.target.files;
    console.log(file);
    console.log(files);

    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };
  const handleRemoveImg = () => {
    setPreviewUrl(null);
    setImage(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseInput = () => {
    imageInpRef.current.click();
  };
  return (
    <div className="flex items-center justify-center">
      <input
        name="profilePic"
        type="file"
        accept="image/*"
        ref={imageInpRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-20 h-20 flex items-center  justify-center bg-orange-100 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-orange-500" />
          <button
            onClick={onChooseInput}
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer hover:bg-orange-600/70"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="profile Photo"
            className="w-20 h-20 rounded-full onject-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImg}
            className="w-8 h-8 flex items-center justify-center bg-red-500  text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer hover:bg-red-600/70"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileImageSelector;
