import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useFetcher } from "react-router-dom";

export const useGenerateMoreQuestions = (
  sessionId,
  dateToGenerate,
  revalidator
) => {
  const generateMoreFetcher = useFetcher();
  const uploadMoreQuestion = () => {
    generateMoreFetcher.submit(
      { actionType: "createAction", ...dateToGenerate, sessionId },
      { method: "post", action: `/dashboard` }
    );
  };

  const hasHandled = useRef(false);

  useEffect(() => {
    if (generateMoreFetcher.state === "idle" && !hasHandled.current) {
      if (generateMoreFetcher.data?.error) {
        toast.error(generateMoreFetcher.data.error);
        hasHandled.current = true;
      } else if (generateMoreFetcher.data?.success) {
        toast.success("Questions added successfully");
        hasHandled.current = true;
        revalidator.revalidate();
      }
    }

    if (generateMoreFetcher.state === "submitting") {
      hasHandled.current = false; // Reset on new request
    }
  }, [generateMoreFetcher.state, generateMoreFetcher.data, revalidator]);

  return {
    uploadMoreQuestion,
    isLoading: generateMoreFetcher.state === "submitting",
    loadMoreError: generateMoreFetcher.data?.error,
  };
};

export const useExplainQuestion = (sessionId, revalidator, setOpenDrawer) => {
  const explainFetcher = useFetcher();

  useEffect(() => {
    if (explainFetcher.state === "idle" && explainFetcher.data) {
      revalidator.revalidate();
    }
  }, [explainFetcher.state, explainFetcher.data, revalidator]);

  const generateConceptExplanation = (question) => {
    setOpenDrawer(true);
    explainFetcher.submit(
      { action: "explain", question },
      { method: "post", action: `/interview-prep/${sessionId}` }
    );
  };

  return {
    generateConceptExplanation,
    explainFetcher,
    isLoading: explainFetcher.state === "submitting",
    explanation: explainFetcher.data?.explanation,
    error: explainFetcher?.error,
  };
};
export const usePinQuestion = (sessionId, revalidator) => {
  const pinFetcher = useFetcher();

  const togglePin = (questionId) => {
    pinFetcher.submit(
      { action: "pin", questionId },
      { method: "post", action: `/interview-prep/${sessionId}` }
    );
  };

  useEffect(() => {
    if (pinFetcher.state === "idle" && pinFetcher.data) {
      revalidator.revalidate();
    }
  }, [pinFetcher.state, pinFetcher.data, revalidator]);

  return { togglePin, pinFetcher };
};
