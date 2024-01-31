import { Button } from "@/components/UI/Button";
import { Dialog, DialogContent } from "@/components/UI/Dialog";
import {
  INVESTMENT_SUCCESS_MODAL,
  INVEST_MODAL,
  INVEST_SUMMARY_MODAL,
} from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";

const InvestSummaryModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  return (
    <Dialog
      open={modalOpen === INVEST_SUMMARY_MODAL}
      onOpenChange={() => setHandleModal("")}
    >
      <DialogContent className="bg-white rounded-[24px] max-w-[656px] translate-y-0 sm:-translate-y-1/2">
        <div className="flex gap-x-2 items-center">
          <Button
            variant="secondary"
            className="w-auto h-10 px-4 py-0 text-14 font-700"
            onClick={() => setHandleModal(INVEST_MODAL)}
          >
            Go Back
          </Button>
          <span className="rounded-full w-10 h-10 bg-yellow-100 flex justify-center items-center">
            {/*    <Image
              src="/images/svg/dodo.svg"
              width={16}
              height={16}
              alt="dodo logo"
              className="h-4 w-4"
  /> */}
          </span>
          <div className="flex flex-col">
            <span className="text-blue-300 text-12 font-500 leading-4">
              Polkadot’s Hotel Renovation
            </span>
            <span className="text-blue-300/60 text-12 font-500 leading-4">
              by Gordon Capital Estate
            </span>
          </div>
        </div>
        <div className="px-4 sm:px-7 mb-1 sm:pb-7 mt-[30px] flex-flex-col">
          <span className="text-24 text-blue-300 font-500 leading-[120%]">
            Confirm Investment
          </span>
          <div className="grid grid-cols-2 items-center mt-[42px]">
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                You are investing
              </span>
              <span className="text-blue-300 text-[40px] font-500 whitespace-break-spaces leading-[120%]">
                €25,000
              </span>
            </div>
            <span className="text-blue-300/60 text-12 font-500 whitespace-break-spaces leading-[120%]">
              To withdraw investments back from the project — contact our
              support
            </span>
          </div>
          <div className="grid grid-cols-2 gap-y-4 items-center my-10">
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Owner
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Gordon Road Capital
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Owner
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Gordon Road Capital
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Real Estate Type
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Hotel
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Real Estate Type
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Hotel
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Business Type
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Hotel Services
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Business Type
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Hotel Services
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-4 items-center ">
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Owner
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Gordon Road Capital
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Owner
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Gordon Road Capital
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Real Estate Type
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Hotel
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Real Estate Type
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Hotel
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Business Type
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Hotel Services
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-blue-300/60 text-12 font-500 leading-[120%]">
                Business Type
              </span>
              <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
                Hotel Services
              </span>
            </div>
          </div>
          <Button
            className="mt-6 sm:mt-11 font-700 leading-5"
            onClick={() => setHandleModal(INVESTMENT_SUCCESS_MODAL)}
          >
            Confirm and invest
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestSummaryModal;
