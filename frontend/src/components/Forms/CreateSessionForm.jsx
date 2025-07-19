import React, { useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import Input from "../Inputs/Input";
import SpinLoader from "../Loaders/SpinLoader";
import toast from "react-hot-toast";

const CreateSessionForm = () => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    description: "",
    topicsToFocus: "",
    level: "",
  });
  const [error, setError] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,

      [key]: value,
    }));
  };
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        toast.success(fetcher?.data?.message);
        navigate(`/interview-prep/${fetcher.data?.session?._id}`);
      } else if (fetcher.data.error) {
        setError(fetcher.data.error);
      }
    }
  }, [fetcher.state, fetcher.data, navigate]);

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start a New Interview Journey
      </h3>
      <p className="text-xs text-slate-700 font-semibold mt-[5px] mb-3"></p>

      <fetcher.Form
        className="flex flex-col gap-4"
        method="post"
        action="/dashboard"
      >
        <input type="hidden" name="actionType" value="createAction" />
        <Input
          value={formData.role}
          onChangeInput={(e) => handleChange("role", e.target.value)}
          name="role"
          label="Target Role"
          placeholder="(e.g., Frontend Developrt , UI/UX developer , etc . )"
          type="text"
        />
        <Input
          value={formData.experience}
          onChangeInput={(e) => handleChange("experience", e.target.value)}
          name="experience"
          label="Years of Experience"
          placeholder="(e.g.,1 year , 3 years  5+ years, etc . )"
          type="number"
        />
        <Input
          value={formData.topicsToFocus}
          onChangeInput={(e) => handleChange("topicsToFocus", e.target.value)}
          name="topicsToFocus"
          label="Topic to focus on"
          placeholder="(Comma-seperated , e.g., React, Node js , MongoDB , UI/UX  , etc . )"
          type="text"
        />
        <Input
          value={formData.description}
          onChangeInput={(e) => handleChange("description", e.target.value)}
          name="description"
          label="Description"
          placeholder="(e.g., Any specific goals or notes for this session )"
          type="text"
        />
        <label htmlFor="level" className="text-sm font-medium text-gray-700">
          Level
        </label>
        <select
          id="level"
          name="level"
          value={formData.level}
          onChange={(e) => handleChange("level", e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 cursor-pointer w-[50%]"
        >
          <option value="">Select level</option>
          <option value="Basic">Basic</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        {typeof error === "string" && (
          <p className="text-red-500 text-xs pb-2.5">{error}</p>
        )}
        <button
          className="w-full p-3 bg-black text-white  rounded-lg cursor-pointer hover:bg-black/60 "
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <SpinLoader />
            </div>
          ) : (
            " Create Session"
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default CreateSessionForm;
