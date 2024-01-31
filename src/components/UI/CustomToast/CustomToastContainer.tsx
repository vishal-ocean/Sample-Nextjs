"use client";
import { UilCheck, UilExclamationTriangle, UilTimes } from "@/icons";
import { ToastContainer } from "react-toastify";

const CustomToastContainer = () => {
  const contextClass = {
    success:
      "bg-gray-250/30 backdrop-blur-[20px] rounded-[24px] grid grid-cols-[1fr_auto] gap-x-4 p-3 my-2",
    error:
      "bg-gray-250/30 backdrop-blur-[20px] rounded-[24px] grid grid-cols-[1fr_auto] gap-x-4 p-3 my-2",
    warning:
      "bg-gray-250/30 backdrop-blur-[20px] rounded-[24px] grid grid-cols-[1fr_auto] gap-x-4 p-3 my-2",
  };
  type ContextType = keyof typeof contextClass;

  const getType = (type: ContextType) => {
    return contextClass[type || "default"];
  };

  const getIcon = (type: string) => {
    if (type == "success") {
      return (
        <div className="bg-success-200 rounded-3xl w-10 h-10 flex justify-center items-center cursor-pointer">
          <UilCheck className="w-4 h-4 text-white" />
        </div>
      );
    }
    if (type == "error") {
      return (
        <div className="bg-danger-100 rounded-3xl w-10 h-10 flex justify-center items-center cursor-pointer">
          <UilTimes className="w-4 h-4 text-white" />
        </div>
      );
    }
    if (type == "warning") {
      return (
        <div className="bg-orange-100 rounded-3xl w-10 h-10 flex justify-center items-center cursor-pointer">
          <UilExclamationTriangle className="w-4 h-4 text-white" />
        </div>
      );
    }
  };

  const CloseButton = ({ closeToast }: any) => (
    <div className="bg-white rounded-3xl w-6 h-6 flex justify-center items-center cursor-pointer">
      <UilTimes className="w-4 h-4 text-gray-300" onClick={closeToast} />
    </div>
  );
  return (
    <ToastContainer
      toastClassName={({ type }: any) => getType(type)}
      icon={({ type }) => getIcon(type)}
      closeButton={({ closeToast }: any) => (
        <CloseButton closeToast={closeToast} />
      )}
      position="top-center"
      autoClose={3000}
      hideProgressBar
    />
  );
};

export default CustomToastContainer;
