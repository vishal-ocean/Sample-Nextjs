import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { FOOTER_OPTION_MENU } from "@/constants";
import { UilAngleRightB, UilChartPieAlt, UilGraphBar } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";

const MenuOptions = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? FOOTER_OPTION_MENU : "");
  };
  return (
    <CustomModal
      open={modalOpen === FOOTER_OPTION_MENU}
      onOpenChange={handleOpenChange}
      withoutClose
      className="max-w-[320px] p-6 flex flex-col gap-y-5  md:translate-y-[40%]"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <span className="bg-blue-300 rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilChartPieAlt className="h-4 w-4 text-white" />
          </span>
          <span className="text-16 text-blue-300 font-500 leading-5">
            Crypto Market
          </span>
        </div>
        <Button
          variant="secondary"
          className="w-10 h-10 bg-secondary rounded-3xl items-center justify-center flex !p-0"
          onClick={() => setHandleModal("")}
        >
          <UilAngleRightB className="text-blue-300 h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <span className="bg-blue-300 rounded-3xl h-10 w-10 flex justify-center">
            <Image
              src="/images/svg/icon-flower.svg"
              height={16}
              width={16}
              alt="flower-icon"
              className="mx-auto"
            />
          </span>
          <span className="text-16 text-blue-300 font-500 leading-5">
            Yield Farming
          </span>
        </div>
        <Button
          variant="secondary"
          className="w-10 h-10 bg-secondary rounded-3xl items-center justify-center flex !p-0"
          onClick={() => setHandleModal("")}
        >
          <UilAngleRightB className="text-blue-300 h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <span className="bg-blue-300 rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilGraphBar className="h-4 w-4 text-white" />
          </span>
          <span className="text-16 text-blue-300 font-500 leading-5">
            Staking
          </span>
        </div>
        <Button
          variant="secondary"
          className="w-10 h-10 bg-secondary rounded-3xl items-center justify-center flex !p-0"
          onClick={() => setHandleModal("")}
        >
          <UilAngleRightB className="text-blue-300 h-4 w-4" />
        </Button>
      </div>
    </CustomModal>
  );
};

export default MenuOptions;
