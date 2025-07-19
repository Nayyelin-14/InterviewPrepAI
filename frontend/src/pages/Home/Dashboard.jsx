import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import DashBoardLayout from "../../Layouts/DashBoardLayout";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useEffect } from "react";
import { CARD_BG } from "../../utils/data";
import moment from "moment";
import SummaryCard from "../../components/Cards/SummaryCard";
import Modal from "../../components/Modal";
import CreateSessionForm from "../../components/Forms/CreateSessionForm";
const Dashboard = () => {
  const { sessions } = useLoaderData();
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allSessions, setAllSessions] = useState([]);
  const fetcher = useFetcher();
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const deleteSession = async (sessionId) => {
    const formdata = new FormData();
    formdata.append("actionType", "deleteAction");
    formdata.append("sessionId", "sessionId");
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

  return (
    <DashBoardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-3">
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
    </DashBoardLayout>
  );
};

export default Dashboard;
