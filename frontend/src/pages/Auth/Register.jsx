import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/Inputs/Input";
import ProfileImageSelector from "../../components/Inputs/ProfileImageSelector";
import { useFetcher, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";

const Register = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const userData = fetcher?.data?.user;
  const isSubmitting = fetcher.state === "submitting";
  console.log(fetcher.data);
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

  return (
    <div className="w-[90vw] md:w-[55vw] lg:w-[45vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an account</h3>
      <p className="text-base font-medium mb-4">
        Join us today by entering your details below
      </p>

      <fetcher.Form
        method="post"
        action="/auth/register"
        encType="multipart/form-data"
      >
        <ProfileImageSelector image={profilePic} setImage={setProfilePic} />
        <div className="grid gird-cols-1 md:grid-cols-1 gap-2">
          <Input
            name="fullName"
            value={fullName}
            onChangeInput={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            type="text"
            label="Full Name"
          />
          <Input
            name="email"
            value={email}
            onChangeInput={(e) => setEmail(e.target.value)}
            placeholder="JohnDoe@email.com"
            type="text"
            label="Email"
          />
          <Input
            name="password"
            value={password}
            onChangeInput={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters"
            type="password"
            label="Password"
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white p-3 w-full rounded-lg font-semibold cursor-pointer hover:bg-black/70 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-[15px] text-slate-800 mt-3">
          Already have an account?
          <button
            type="button"
            className="font-medium text-yellow-400 cursor-pointer underline"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </fetcher.Form>
    </div>
  );
};

export default Register;
