import { useLoaderData, useRevalidator } from "react-router-dom";
import DashBoardLayout from "../../Layouts/DashBoardLayout";
import RoleInfoReader from "./components/RoleInfoReader";
import moment from "moment";
import { useState } from "react";

import QuestionCards from "../../components/Cards/QuestionCards";
import { motion, AnimatePresence } from "framer-motion";
import Drawer from "../../components/Drawer";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import AiResponsePreview from "../../components/AiResponse/AiResponsePreview";
import SkeletonLoader from "../../components/Loaders/SkeletonLoader";
import SpinLoader from "../../components/Loaders/SpinLoader";
import {
  useExplainQuestion,
  useGenerateMoreQuestions,
  usePinQuestion,
} from "../../hooks/useCustomHooks";
const InterviewPrep = () => {
  const data = useLoaderData();
  const sessionData = data.session;
  const revalidator = useRevalidator();
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);

  const dataToGenerate = {
    role: sessionData?.role,
    experience: sessionData?.experience,
    topicsToFocus: sessionData?.topicsToFocus,
    numberOfQuestions: 5,
    level: sessionData?.level,
  };

  const { togglePin } = usePinQuestion(sessionData?._id, revalidator);

  const { isLoading, explanation, error, generateConceptExplanation } =
    useExplainQuestion(sessionData?._id, revalidator, setOpenLearnMoreDrawer);

  const {
    isLoading: isLoadingMore,
    uploadMoreQuestion,
    loadMoreError,
  } = useGenerateMoreQuestions(sessionData?._id, dataToGenerate, revalidator);

  return (
    <DashBoardLayout>
      {" "}
      <RoleInfoReader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        level={sessionData?.level || ""}
        experience={sessionData?.experience || ""}
        description={sessionData?.description || ""}
        questions={sessionData?.questions?.length || "-"}
        updatedAt={
          sessionData?.updatedAt
            ? moment(sessionData?.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />
      <div className="container mx-auto p-4 md:px-0 ">
        <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10 ">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    layout
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layoutId={`question-${data?._id || index}`}
                  >
                    <>
                      <QuestionCards
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data?.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => togglePin(data._id)}
                      />
                    </>

                    {sessionData?.questions?.length == index + 1 && (
                      <div className="flex items-center justify-center mt-5">
                        {loadMoreError ? (
                          <p className="text-red-500 text-sm font-medium">
                            {loadMoreError}
                          </p>
                        ) : (
                          <button
                            className="flex items-center gap-3 text-white bg-black font-medium text-nowrap px-5 py-2 mr-2 rounded hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                            onClick={uploadMoreQuestion}
                            disabled={isLoadingMore}
                          >
                            {isLoadingMore ? (
                              <SpinLoader />
                            ) : (
                              <LuListCollapse className="text-lg" />
                            )}
                            {isLoadingMore ? "Loading...." : "Load more"}
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <Drawer
            onClose={() => setOpenLearnMoreDrawer(false)}
            isOpen={openLearnMoreDrawer}
            title={!isLoading && explanation?.title}
          >
            {error && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {error}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AiResponsePreview content={explanation.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default InterviewPrep;
