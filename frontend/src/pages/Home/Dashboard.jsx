import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import DashBoardLayout from "../../Layouts/DashBoardLayout";
import { useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useEffect } from "react";
import { CARD_BG } from "../../utils/data";
import moment from "moment";
import SummaryCard from "../../components/Cards/SummaryCard";
import Modal from "../../components/Modal";
import CreateSessionForm from "../../components/Forms/CreateSessionForm";
import DeleteAlert from "../../components/DeleteAlert";
import toast from "react-hot-toast";
const Dashboard = () => {
  const { sessions } = useLoaderData();
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allSessions, setAllSessions] = useState([]);
  const hasHandled = useRef(false);
  const fetcher = useFetcher();
  const revalidator = useRevalidator();
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const deleteSession = async (sessionData) => {
    console.log("hi");
    const formdata = new FormData();
    formdata.append("actionType", "deleteAction");
    formdata.append("sessionId", sessionData?._id);
    fetcher.submit(formdata, {
      method: "post",
      action: "/dashboard",
    });
  };
  useEffect(() => {
    if (sessions) {
      setAllSessions(sessions);
    }
  }, [sessions]);

  useEffect(() => {
    if (fetcher.state === "idle" && !hasHandled.current) {
      if (fetcher.data?.error) {
        toast.error(fetcher.data.error);
        hasHandled.current = true;
      } else if (fetcher.data?.success) {
        toast.success(fetcher.data.message);
        hasHandled.current = true;
        revalidator.revalidate();
      }
      setOpenDeleteAlert((openDeleteAlert.open = false));
    }

    if (fetcher.state === "submitting") {
      hasHandled.current = false; // Reset on new request
    }
  }, [fetcher.state, fetcher.data, revalidator]);
  console.log(fetcher);
  return (
    <DashBoardLayout>
      <div className="container mx-auto pt-4 pb-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-3">
          {allSessions &&
            allSessions.map((data, index) => (
              <SummaryCard
                key={data?.key}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus}
                description={data?.description}
                experience={data?.experience}
                questions={data?.questions.length || "-"}
                level={data?.level}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("Do MMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/interview-prep/${data._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            ))}
        </div>
        <button
          onClick={() => setOpenCreateModal(true)}
          className="flex items-center justify-center h-12 gap-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-bold text-white px-7 py-2.5 rounded-3xl hover:shadow-lg hover:ring-2 hover:ring-orange-400 transition-all cursor-pointer fixed bottom-10 right-10 md:right-15 md:bottom-15"
        >
          <LuPlus className="text-xl text-white" />
          Add new
        </button>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        title={"Delete Confirmation"}
      >
        <div>
          <DeleteAlert
            content={"Are you sure to delete this session???"}
            onDelete={() => deleteSession(openDeleteAlert?.data)}
          />
        </div>
      </Modal>
    </DashBoardLayout>
  );
};

export default Dashboard;
