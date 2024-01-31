import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import {
  BUY_MODAL,
  MARKET_PLACE_ASSETS_ACTIONS,
  SELL_MODAL,
  SWAP_CRYPTO_MODAL,
} from "@/constants";
import { UilExchange, UilMinus, UilPlus } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";

const MarketPlaceListingActions = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? MARKET_PLACE_ASSETS_ACTIONS : "");
  };
  return (
    <CustomModal
      className="p-6 w-full rounded-t-[32px] bottom-0 rounded-b-none max-w-[920px]"
      open={modalOpen === MARKET_PLACE_ASSETS_ACTIONS}
      onOpenChange={handleOpenChange}
    >
      <div className="flex gap-x-3">
        <Image
          width={40}
          height={40}
          src="/images/svg/icon-BTC.svg"
          alt="image"
        />
        <div className="flex flex-col">
          <span className="text-blue-300 text-16 font-500 leading-5">
            Bitcoin
          </span>
          <span className="text-gray-300 text-16 font-500 leading-5">BTC</span>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-y-6">
        <div className="flex justify-between">
          <span className="text-16 text-blue-300 font-500 leading-5">Buy</span>
          <Button
            variant="secondary"
            className="!p-0 h-10 w-10 flex justify-center items-center"
            onClick={() => {
              setHandleModal(BUY_MODAL);
              setHandleModalState(true);
            }}
          >
            <UilPlus className="h-4 w-4 text-blue-300" />
          </Button>
        </div>
        <div className="flex justify-between">
          <span className="text-16 text-blue-300 font-500 leading-5">Sell</span>
          <Button
            variant="secondary"
            className="!p-0 h-10 w-10 flex justify-center items-center"
            onClick={() => {
              setHandleModal(SELL_MODAL);
              setHandleModalState(true);
            }}
          >
            <UilMinus className="h-4 w-4 text-blue-300" />
          </Button>
        </div>
        <div className="flex justify-between">
          <span className="text-16 text-blue-300 font-500 leading-5">Swap</span>
          <Button
            variant="secondary"
            className="!p-0 h-10 w-10 flex justify-center items-center"
            onClick={() => setHandleModal(SWAP_CRYPTO_MODAL)}
          >
            <UilExchange className="h-4 w-4 text-blue-300" />
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default MarketPlaceListingActions;
