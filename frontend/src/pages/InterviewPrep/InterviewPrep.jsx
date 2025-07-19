import { useFetcher, useLoaderData, useRevalidator } from "react-router-dom";
import DashBoardLayout from "../../Layouts/DashBoardLayout";
import RoleInfoReader from "./components/RoleInfoReader";
import moment from "moment";
import { useEffect, useState } from "react";

import QuestionCards from "../../components/Cards/QuestionCards";
import { motion, AnimatePresence } from "framer-motion";
import Drawer from "../../components/Drawer";
import { LuCircleAlert } from "react-icons/lu";
import AiResponsePreview from "../../components/AiResponse/AiResponsePreview";
import SkeletonLoader from "../../components/Loaders/SkeletonLoader";
const InterviewPrep = () => {
  const data = useLoaderData();
  const pinFetcher = useFetcher();
  const explainFetcher = useFetcher();
  const sessionData = data.session;
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const revalidator = useRevalidator();
  const toggleQuestionPinStatus = (questionId) => {
    pinFetcher.submit(
      { action: "pin", questionId },
      { method: "post", action: `/interview-prep/${sessionData._id}` }
    );
  };
  useEffect(() => {
    if (pinFetcher.state === "idle" && pinFetcher.data) {
      revalidator.revalidate();
    }
    if (explainFetcher.state === "idle" && explainFetcher.data) {
      revalidator.revalidate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pinFetcher.state,
    pinFetcher.data,
    explainFetcher.state,
    explainFetcher.data,
  ]);

  const generateConceptExplanation = (question) => {
    setOpenLearnMoreDrawer(true);
    explainFetcher.submit(
      { action: "explain", question },
      { method: "post", action: `/interview-prep/${sessionData._id}` }
    );
  };
  const isLoading = explainFetcher?.state === "submitting";
  console.log(isLoading);
  const explanation = explainFetcher?.data?.explanation;
  const error = explainFetcher?.error;
  const onLearnMore = (questionId) => {};

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
                        onTogglePin={() => toggleQuestionPinStatus(data._id)}
                      />
                    </>
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
