import { LuX } from "react-icons/lu";

const Drawer = ({ children, isOpen, onClose, title }) => {
  return (
    <div
      className={`fixed top-[80px] right-0 h-[calc(100vh-64px)] w-full md:w-[42%] bg-white dark:bg-gray-800 shadow-lg border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">{title || "Loading...."}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <LuX />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-full">{children}</div>
    </div>
  );
};

export default Drawer;
