import React, { useContext, useEffect, useState, useRef } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

// Simple controlled input component forwarding name/value
const Input = ({ name, value, onChange, type, placeholder, label }) => (
  <div className="flex flex-col">
    {label && <label className="text-sm mb-1">{label}</label>}
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="border p-2 rounded"
      required
    />
  </div>
);

const Register = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();

  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const isSubmitting = fetcher.state === "submitting";
  const userData = fetcher.data?.user;

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        updateUser(userData);
        navigate("/dashboard");
        toast.success("Successfully signed up");
      } else {
        setError(fetcher.data.error);
      }
    }
  }, [fetcher.state, fetcher.data, navigate, updateUser, userData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const removeFile = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  console.log(fetcher);
  return (
    <div className="w-[90vw] md:w-[55vw] lg:w-[45vw] p-7 flex flex-col justify-center mx-auto h-screen">
      <h3 className="text-lg font-semibold text-black">Create an account</h3>
      <p className="text-base font-medium mb-4">
        Join us today by entering your details below
      </p>

      <fetcher.Form
        method="post"
        action="/auth/register"
        encType="multipart/form-data"
      >
        {/* File Input */}
        <input
          name="profilePic"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Profile Image Preview */}
        <div className="flex items-center justify-center mb-4">
          {!previewUrl ? (
            <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-full relative cursor-pointer">
              <LuUser className="text-4xl text-orange-500" />
              <button
                type="button"
                onClick={openFileInput}
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
                onClick={removeFile}
                className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer hover:bg-red-600"
              >
                <LuTrash />
              </button>
            </div>
          )}
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            type="text"
            label="Full Name"
          />
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="JohnDoe@email.com"
            type="email"
            label="Email"
          />
          <Input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters"
            type="password"
            label="Password"
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white p-3 w-full rounded-lg font-semibold cursor-pointer hover:bg-black/70 disabled:opacity-60 disabled:cursor-not-allowed mt-3"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-[15px] text-slate-800 mt-3">
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium text-yellow-400 cursor-pointer underline"
            onClick={() => {
              setCurrentPage("login");
              navigate("/auth/login");
            }}
          >
            Sign In
          </button>
        </p>
      </fetcher.Form>
    </div>
  );
};

export default Register;
