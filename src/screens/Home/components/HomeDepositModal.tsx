import { Card, CardContent } from "@/components/UI/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { cn } from "@/utils";

import { Portal } from "@/components/Portal";
import IconBank from "@/components/icons/IconBank";
import IconEthereum from "@/components/icons/IconEthereum";
import IconOceanCard from "@/components/icons/IconOceanCard";
import IconTopUp from "@/components/icons/IconTopUp";
import {
  CRYPTO_DEPOSIT_MODAL,
  DEPOSIT_MODAL,
  NFT_DEPOSIT_MODAL,
  RECEIVE_CURRENCY_MODAL,
} from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";

const CARD_DETAILS = [
  {
    name: "Crypto",
    component: (
      <IconEthereum strokeWidth={1.5} className="text-white w-4 h-4" />
    ),
    bg: "bg-primary",
    hover_card_bg: "hover:bg-blue-600 dark:hover:bg-blue-600",
    hover_text_white: "hover:text-white",
    modal: CRYPTO_DEPOSIT_MODAL,
    isDisabled: false,
  },
  {
    name: "Fiat",
    component: <IconBank strokeWidth={1.3} className="text-white w-4 h-4" />,
    bg: "bg-success-200",
    hover_card_bg: "hover:bg-success-200",
    hover_text_white: "hover:text-white",
    modal: RECEIVE_CURRENCY_MODAL,
    isDisabled: false,
  },
  {
    name: "NFT",
    component: (
      <IconOceanCard strokeWidth={1.3} className="text-white w-4 h-4" />
    ),
    bg: "bg-purple-200",
    hover_card_bg: "hover:bg-purple-100",
    hover_text_white: "hover:text-white",
    modal: NFT_DEPOSIT_MODAL,
    isDisabled: true,
  },
];

const HomeDepositModal = () => {
  const { setHandleModal } = useHandleModalAction;
  const { modalOpen } = useHandleModalStore();

  return (
    <Portal>
      <Dialog
        open={modalOpen === DEPOSIT_MODAL}
        onOpenChange={(e) => setHandleModal(e ? DEPOSIT_MODAL : "")}
      >
        <DialogTrigger />
        <DialogContent className="bg-white border-none dark:bg-gray-600 sm:max-w-[656px] translate-y-0 sm:-translate-y-1/2">
          <DialogHeader>
            <DialogTitle className="text-12 flex gap-x-2 items-center  font-500">
              <div className="rounded-full h-10 w-10 bg-primary  flex items-center">
                <IconTopUp
                  className="w-4 h-4 text-white m-auto"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-12 text-blue-300 dark:text-white">
                Deposit funds
              </span>
            </DialogTitle>
            <DialogDescription className="px-1 sm:px-7">
              <div className="text-24 mt-[34px] mb-6 sm:mb-10 leading-7 text-left text-blue-300 dark:text-white">
                What do you want <br />
                to deposit?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-y-2 gap-x-4 mx-auto mb-1 sm:mb-7">
                {CARD_DETAILS.map((item, index) => (
                  <div key={`depositmodal-${index}`}>
                    <Card
                      className={cn(
                        "bg-gray-100 dark:bg-white/5 dark:text-white rounded-[28px] p-5 flex sm:block items-center gap-x-4 cursor-pointer text-blue-300",
                        item.isDisabled
                          ? "bg-gray-100 pointer-events-none opacity-60"
                          : `${item.hover_card_bg} ${item.hover_text_white}`
                      )}
                      onClick={() => setHandleModal(item.modal)}
                    >
                      <CardContent className="  ">
                        <div
                          className={cn(
                            "rounded-full w-10 h-10 flex justify-center items-center",
                            item?.bg
                          )}
                        >
                          {item?.component}
                        </div>
                      </CardContent>
                      <div className="text-24 font-500 sm:pt-10 text-start leading-7">
                        {item?.name}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Portal>
  );
};

export default HomeDepositModal;
