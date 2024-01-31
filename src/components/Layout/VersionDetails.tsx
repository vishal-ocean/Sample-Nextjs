"use client";
import { VERSION_DETAIL_MODAL } from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { VersionDetailsModal } from "./VersionDetailsModal";

const VersionDetails = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  return (
    <div className="lg:mb-8 mt-[60px] mb-[100px] flex sm:justify-between justify-center sm:flex-row flex-col-reverse gap-y-4 items-center lg:mx-0 mx-6">
      <span className="text-12 font-500 text-gray-300 dark:text-white/30 leading-4">
        © 2023 Ocean Money | All Rights Reserved
      </span>
      {/* <span className="text-12 font-500 text-gray-300 leading-4">
        Terms &nbsp;|&nbsp; Privacy &nbsp;|&nbsp; Cookies
      </span> */}
      <div className="flex gap-x-3 items-center">
        <div
          className="text-12 font-500 bg-secondary dark:bg-white/15 dark:text-white text-blue-300 leading-4 hover:bg-blue-300 hover:text-white px-3 py-2 rounded-[32px] cursor-pointer"
          onClick={() => setHandleModal(VERSION_DETAIL_MODAL)}
        >
          v0.0.1
        </div>
        <div className="bg-white dark:bg-white/15 rounded-[32px] px-3 py-2 flex gap-x-1 items-center">
          <div className="h-2 w-2 rounded-3xl bg-success-200" />
          <span className="text-12 font-500 text-blue-300 dark:text-white leading-4">
            Status
          </span>
        </div>
      </div>
      {modalOpen === VERSION_DETAIL_MODAL && <VersionDetailsModal />}
    </div>
  );
};

export default VersionDetails;
