import React, { useContext, useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import toast from "react-hot-toast";
import { UserContext } from "../../context/userContext";
const Login = ({ setCurrentPage }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";
  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);
  const error = fetcher.data?.error;

  const userData = fetcher.data?.user;
  const goToRegister = () => {
    setCurrentPage("register");
    navigate("/auth/register");
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        updateUser(userData);
        navigate("/dashboard");
        toast.success("Sccessfully logged in"); // 🔥 show success
      }
    }
  }, [fetcher.state, fetcher.data, navigate, updateUser, userData]);
  return (
    <div className="w-[90vw] md:w-[55vw] lg:w-[45vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome back</h3>

      <p className="text-sm text-salte-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <fetcher.Form method="post" action="/auth/login">
        <Input
          name="email"
          value={email}
          onChangeInput={({ target }) => setEmail(target.value)}
          label="Email address"
          placeholder="john@email.com"
          type="text"
        />
        <Input
          name="password"
          value={password}
          onChangeInput={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />
        {typeof error === "string" && (
          <p className="text-red-500 text-xs pb-2.5">{error}</p>
        )}

        <button
          type="submit"
          className="bg-black text-white p-3 w-full rounded-lg font-semibold cursor-pointer hover:bg-black/70"
        >
          {isSubmitting ? "Logging in..." : "LOGIN"}
        </button>
        <p className="text-[15px] text-slate-800 mt-3">
          Don't have an account?
          <button
            className="font-medium text-yellow-400 cursor-pointer underline"
            onClick={goToRegister}
          >
            SignUp
          </button>
        </p>
      </fetcher.Form>
    </div>
  );
};

export default Login;
