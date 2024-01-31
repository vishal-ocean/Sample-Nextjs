import { Portal } from "@/components/Portal";
import { Button } from "@/components/UI/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/Dialog";
import { VIEW_NFT_MODAL } from "@/constants";
import { readableNumber } from "@/helper/readableNumber";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";

interface Asset {
  type: string;
  name: string;
  subText: string;
  marketPrice: number;
  percentage?: string;
  isOwned: boolean;
  owned?: number;
  img: string;
  btc?: number;
  bg?: string;
}

// Define the ViewNFTModalProps interface
interface ViewNFTModalProps {
  item: Asset;
}
const ViewNFTModal = ({ item }: ViewNFTModalProps) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  return (
    <Portal>
      <Dialog
        open={modalOpen === VIEW_NFT_MODAL}
        onOpenChange={(e) => setHandleModal(e ? VIEW_NFT_MODAL : "")}
      >
        <DialogTrigger />
        <DialogContent className="!p-0 sm:max-w-[656px] translate-y-0 sm:-translate-y-1/2">
          <div className="relative">
            <Image
              src={"/images/nft-2.jpg"}
              width={656}
              height={575}
              alt=""
              className="rounded-[48px]"
            />
          </div>
          <div className="absolute top-5 left-5 flex gap-x-1">
            <Image
              src={item.img}
              width={40}
              height={40}
              className="rounded-full"
              alt="nft-bg"
            />
            <Image
              src="/images/svg/OpenSea-logo.svg"
              width={40}
              height={40}
              className="rounded-full"
              alt="nft-bg"
            />
          </div>
          <div className="absolute bottom-[48px] left-5 z-10">
            <div className="flex flex-col gap-y-1 z-20 px-7">
              <span className="font-500 text-white text-24 leading-7">
                €{readableNumber(Number(item.marketPrice.toFixed(2) || 0))}
              </span>
              <span className="font-500 text-gray-300 leading-5">
                {item.percentage}
              </span>
            </div>
          </div>
          <div className="absolute bottom-[48px] right-5 z-10">
            <Button className="px-6 bg-white text-blue-300 font-700 py-3.5">
              To NFT Vault
            </Button>
          </div>
          <div className="bg-gradient-to-t from-[#061935] dark:from-black-100 from-10% to-transparent pointer-events-none w-full !h-full absolute left-0 bottom-0 rounded-[48px]" />
        </DialogContent>
      </Dialog>
    </Portal>
  );
};

export default ViewNFTModal;
