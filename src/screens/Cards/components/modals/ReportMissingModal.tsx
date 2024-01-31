import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { Switch } from "@/components/UI/Switch";
import { IconWhistle } from "@/components/icons/IconWhistle";
import { REPORT_MISSING_MODAL } from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import React, { useState } from "react";
interface reportMissingModalProps {
  handleReportMissingCard: any;
  loading: boolean;
}

export const ReportMissingModal: React.FC<reportMissingModalProps> = ({
  handleReportMissingCard,
  loading,
}) => {
  const [stolenCard, setStolenCard] = useState(false);
  const [destroyedCard, setDestroyedCard] = useState(false);
  const [reorderCard, setReorderCard] = useState(false);
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? REPORT_MISSING_MODAL : "");
  };

  return (
    <CustomModal
      open={modalOpen === REPORT_MISSING_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5"
    >
      <div className="flex gap-x-2 items-center">
        <span className="bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
          <IconWhistle className="h-4 w-4 text-white" />
        </span>
        <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
          Report Missing
        </span>
      </div>
      <div className="px-0 sm:px-7 mb-5 sm:mb-7 mt-6">
        <p className="text-24 font-500 leading-7">Choose reason</p>
        <div className="mt-10">
          <div className="flex gap-x-1 justify-between  items-center w-full">
            <span className="text-blue-300 leading-4 text-14 font-700 flex items-center whitespace-nowrap dark:text-white">
              Stolen card
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <Switch
                className="data-[state=checked]:bg-blue-300"
                onCheckedChange={setStolenCard}
              />
            </label>
          </div>
          <hr className="border-secondary dark:border-white/15 my-3" />
          <div className="flex gap-x-1 justify-between  items-center w-full">
            <span className="text-blue-300 leading-4 text-14 font-700 flex items-center whitespace-nowrap dark:text-white">
              Destroyed card
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <Switch
                className="data-[state=checked]:bg-blue-300"
                onCheckedChange={setDestroyedCard}
              />
            </label>
          </div>
          <hr className="border-secondary dark:border-white/15 my-3" />
          <div className="flex gap-x-1 justify-between  items-center w-full">
            <span className="text-blue-300 leading-4 text-14 font-700 flex items-center whitespace-nowrap dark:text-white">
              Reorder Card
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <Switch
                className="data-[state=checked]:bg-blue-300"
                onCheckedChange={setReorderCard}
              />
            </label>
          </div>
        </div>
        <Button
          className="bg-primary px-6 py-4 text-white text-16 font-700 leading-5 mt-10 flex mx-auto"
          disabled={!stolenCard && !destroyedCard && !reorderCard}
          onClick={() => handleReportMissingCard()}
          isLoading={loading}
        >
          Report Missing
        </Button>
      </div>
    </CustomModal>
  );
};
