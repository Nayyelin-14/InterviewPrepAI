import { useContext, useState } from "react";
import heroImg from "./../assets/interviewPhoto.jpg";
import { APP_FEATURES } from "../utils/data";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/Cards/ProfileCard";
const LandingPage = () => {
  const { user } = useContext(UserContext);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const navigate = useNavigate();
  const HandleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div className="w-full min-h-full bg-[#FFFCEF]">
        <div className="w-[500px] h-[500px] backdrop-blur-[65px] absolute top-0 left-0" />
        <div className="container mx-auto px-6 md:px-10 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-7 ">
            <div className="text-xl text-black font-bold">
              Interview Prep By AI
            </div>
            {user ? (
              <ProfileCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-black hover:text-white border-white transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col lg:flex-row items-center gap-6 w-[90%] mx-auto">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center justify-start mb-4">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-3xl border border-amber-300">
                  AI Powered
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2">
              <p className="text-lg md:text-xl font-semibold text-black">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery – your ultimate interview toolkit is
                here.
              </p>
              <button
                className="p-3 bg-black text-white text-md rounded-full px-9 mt-5 font-medium hover:bg-black/80"
                onClick={HandleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-full relative z-10 ">
        <div>
          <section className="flex items-center justify-center -mt-36">
            <img
              src={heroImg}
              alt=""
              className="w-[70vw] h-[40vw] md:h-[28vw] rounded-lg object-cover"
              loading="lazy"
            />
          </section>
        </div>

        <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12">
                Features That Make You Shine
              </h2>
              <div className="flex flex-col items-center  gap-8">
                {/* first 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100">
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
                {/* //2 cards  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100">
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
          Make with love ------ happy coding
        </div>
      </div>
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <Register setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
