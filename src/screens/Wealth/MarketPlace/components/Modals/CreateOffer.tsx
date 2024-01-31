import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/form/Input";
import { CREATE_OFFER_MODAL, OFFER_CREATED_MODAL } from "@/constants";
// import { useReactSelectStyles } from "@/hooks/useReactSelectStyles";
import { UilAngleUp, UilExchange, UilPlus } from "@/icons";
import AssetsSelectionDropdown from "@/screens/Wealth/MarketPlace/components/AssetsSelectionDropdown";
import { useProjectDummyList } from "@/screens/Wealth/MarketPlace/components/SecondaryMarket/useProjectDummyList";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import Image from "next/image";
import { useState } from "react";

const CreateOffer = () => {
  const { modalOpen } = useHandleModalStore();
  // const { selectNetworkStyle } = useReactSelectStyles();
  const { setHandleModal } = useHandleModalAction;
  const [forSend, setForSend] = useState("");
  const [openForSendAssetsDropdown, setOpenForSendAssetsDropdown] =
    useState(false);
  const [openForReceiveAssetsDropdown, setOpenForReceiveAssetsDropdown] =
    useState(false);
  const [forReceive, setForReceive] = useState("");

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CREATE_OFFER_MODAL : "");
  };
  const { PROJECT_LIST } = useProjectDummyList();
  return (
    <CustomModal
      open={modalOpen === CREATE_OFFER_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5 bottom-0 sm:bottom-auto sm:top-1/2 translate-y-0 sm:-translate-y-1/2"
    >
      <div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 sm:justify-between">
        <div className="flex gap-x-2 items-center">
          <span className="bg-secondary rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilPlus className="h-4 w-4 text-blue-300" />
          </span>
          <span className="text-12 text-blue-300 font-500 leading-4">
            Create Offer
          </span>
        </div>
      </div>
      <div className="sm:px-7 mt-1 sm:mt-4 relative">
        <p className="text-24 font-500 leading-7 text-blue-300">New Offer</p>
        <div className="mt-6 bg-gray-100 rounded-[24px] p-5">
          <span className="flex justify-between">
            <p className="text-gray-300 text-12 font-500 leading-4">You Send</p>
            <p className="text-gray-300 text-12 font-500 leading-4">
              Balance 48,074 USDT
            </p>
          </span>
          <div className="mt-3 flex gap-x-4">
            <Button
              variant="outline"
              className={cn(
                "p-1 flex gap-x-2 items-center rounded-3xl",
                openForSendAssetsDropdown && "bg-blue-300 text-white"
              )}
              onClick={() =>
                setOpenForSendAssetsDropdown(!openForSendAssetsDropdown)
              }
            >
              {forSend ? (
                PROJECT_LIST.find((x) => x.value === forSend)?.img && (
                  <Image
                    width={16}
                    height={16}
                    src={
                      PROJECT_LIST.find((x) => x.value === forSend)?.img || ""
                    }
                    alt="image"
                  />
                )
              ) : (
                <div className="w-6 h-6 rounded-3xl bg-secondary" />
              )}
              <span
                className={cn(
                  "font-700 leading-4 text-14 text-blue-300",
                  openForSendAssetsDropdown && "text-white"
                )}
              >
                {forSend
                  ? PROJECT_LIST.find((x) => x.value === forSend)?.value
                  : "Select"}
              </span>
              <div
                className={cn(
                  "flex justify-center items-center text-blue-300 rotate-180",
                  openForSendAssetsDropdown && "text-white rotate-0"
                )}
              >
                <UilAngleUp className="h-4 w-4" />
              </div>
            </Button>
            <AssetsSelectionDropdown
              assetsValue={forSend}
              setAssetsValue={setForSend}
              openAssetsDropdown={openForSendAssetsDropdown}
              setOpenAssetsDropdown={setOpenForSendAssetsDropdown}
              className={"ml-0"}
              align="center"
            />
          </div>
          <div className="bg-gray-100 rounded-[16px] flex  items-center max-h-[52px] mt-8 sm:mt-12">
            <span className="flex gap-x-1">
              <Input
                type="number"
                className="w-1/2 !p-0 border-none text-24 font-500 placeholder:text-gray-300 placeholder:text-24 leading-7 tracking-[-0.8px] text-blue-300  py-0"
                placeholder="0.00"
              />
              <p className="text-gray-300 text-24 font-500 leading-7">USDT</p>
            </span>

            <div className="flex gap-x-2">
              <Button
                variant={"outline"}
                className="text-blue-300 text-12 w-fit h-fit p-0 font-700 leading-4"
              >
                25%
              </Button>
              <Button
                variant={"outline"}
                className="text-blue-300 text-12 w-fit h-fit p-0 font-700 leading-4"
              >
                50%
              </Button>
              <Button
                variant={"outline"}
                className="text-blue-300 text-12 w-fit h-fit p-0 font-700 leading-4"
              >
                100%
              </Button>
            </div>
          </div>
        </div>
        <Button
          variant={"outline"}
          className="p-0 h-10 w-10 absolute rounded-3xl left-[45%] top-[42%] sm:top-[39%] bg-gray-100 !border-4 border-solid !border-white"
        >
          <UilExchange className="w-4 h-4 text-blue-300 rotate-90" />
        </Button>
        <div className="bg-gray-100 rounded-[24px] p-5 mt-1">
          <span className="flex justify-between">
            <p className="text-gray-300 text-12 font-500 leading-4">
              You Receive
            </p>
            <p className="text-gray-300 text-12 font-500 leading-4">
              Balance 0 P79
            </p>
          </span>
          <div className="mt-3 flex gap-x-4">
            <Button
              variant="outline"
              className={cn(
                "p-1 flex gap-x-2 items-center rounded-3xl",
                openForReceiveAssetsDropdown && "bg-blue-300 text-white"
              )}
              onClick={() =>
                setOpenForReceiveAssetsDropdown(!openForReceiveAssetsDropdown)
              }
            >
              {forReceive ? (
                PROJECT_LIST.find((x) => x.value === forReceive)?.img && (
                  <Image
                    width={16}
                    height={16}
                    src={
                      PROJECT_LIST.find((x) => x.value === forReceive)?.img ||
                      ""
                    }
                    alt="image"
                  />
                )
              ) : (
                <div className="w-6 h-6 rounded-3xl bg-secondary" />
              )}
              <span
                className={cn(
                  "font-700 leading-4 text-14 text-blue-300",
                  openForReceiveAssetsDropdown && "text-white"
                )}
              >
                {forReceive
                  ? PROJECT_LIST.find((x) => x.value === forReceive)?.value
                  : "Select"}
              </span>
              <div
                className={cn(
                  "flex justify-center items-center text-blue-300 rotate-180",
                  openForReceiveAssetsDropdown && " text-white rotate-0"
                )}
              >
                <UilAngleUp className="h-4 w-4" />
              </div>
            </Button>
            <AssetsSelectionDropdown
              assetsValue={forReceive}
              setAssetsValue={setForReceive}
              openAssetsDropdown={openForReceiveAssetsDropdown}
              setOpenAssetsDropdown={setOpenForReceiveAssetsDropdown}
              className={"ml-0"}
              align="center"
            />
          </div>
          <div className="bg-gray-100 rounded-[16px] flex  items-center max-h-[52px] mt-8 sm:mt-12">
            <span className="flex gap-x-1">
              <Input
                type="number"
                className="!p-0 border-none text-24 font-500 placeholder:text-gray-300 placeholder:text-24 leading-7 tracking-[-0.8px] text-blue-300  py-0"
                placeholder="0.00"
              />
              <p className="text-gray-300 text-24 font-500 leading-7">P79</p>
            </span>
          </div>
        </div>
        <Button
          className={`bg-secondary mt-6 sm:mt-10 w-max mb-0 sm:mb-7 leading-5 text-gray-300 font-700 ${
            forReceive && forSend
              ? "bg-primary text-white py-3"
              : "pointer-events-none py-4 "
          }`}
          onClick={() => setHandleModal(OFFER_CREATED_MODAL)}
        >
          Create Offer
        </Button>
      </div>
    </CustomModal>
  );
};

export default CreateOffer;
