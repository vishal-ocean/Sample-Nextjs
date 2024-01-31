import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/form/Input";
import { CHAT_CONVERSATIONS_LIST_MODAL, CHAT_MODAL } from "@/constants";
import {
  UilAngleLeftB,
  UilExchange,
  UilLocationArrow,
  UilTimes,
  UilUser,
} from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";

const ChatModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  return (
    <CustomModal
      open={modalOpen === CHAT_MODAL}
      onOpenChange={(e: boolean) => setHandleModal(e ? CHAT_MODAL : "")}
      withoutClose
      className="sm:max-w-[520px] w-full p-0 h-[600px] pr-2"
    >
      <div className="relative w-full h-full">
        <div className="flex justify-between bg-white/80 p-3 rounded-t-[24px] fixed top-0 w-full backdrop-blur-md">
          <div className="flex gap-x-2">
            <Button
              variant="secondary"
              className="p-0 h-10 w-10 flex justify-center items-center"
              onClick={() => setHandleModal(CHAT_CONVERSATIONS_LIST_MODAL)}
            >
              <UilAngleLeftB className="h-4 w-4 text-blue-300" />
            </Button>
            <div className="flex gap-x-2 items-center">
              <div className="h-10 w-10 rounded-3xl bg-blue-300 flex justify-center items-center">
                <UilUser className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-12 text-blue-300 font-500 leading-4">
                  Jason S
                </span>
                <div className="flex gap-x-1 leading-4">
                  <span className="text-12 font-500 text-gray-300 leading-4">
                    22,487 USDT
                  </span>
                  <UilExchange className="w-4 h-4 text-gray-300" />
                  <span className="text-12 font-500 text-gray-300 leading-4">
                    2 P79
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            className="p-0 h-10 w-10 flex justify-center items-center"
            onClick={() => setHandleModal("")}
          >
            <UilTimes className="h-4 w-4 text-blue-300" />
          </Button>
        </div>
        <div
          className="mt-1 pt-[66px] px-6 h-[calc(600px-88px)] overflow-y-auto flex flex-col chat-modal"
          id="chat-section"
        >
          {[...Array(6)].map((_, index) => (
            <div key={`ChatMessages-${index}`}>
              <div className="sender flex flex-col gap-y-2 ">
                <div className="flex justify-end w-full break-words">
                  <p className="py-3 px-6 bg-secondary rounded-3xl text-blue-300 font-500 leading-5 max-w-[80%] text-left">
                    Hey, I added my assets
                  </p>
                </div>
                <p className="text-right font-500 text-12 text-gray-300">
                  Me, 12:06 PM
                </p>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-start w-full break-words gap-y-2">
                  <p className="py-3 px-6 bg-blue-300 rounded-3xl text-white font-500 leading-6 max-w-[80%] text-left">
                    Awesome 🔥 I will add mine a bit later, okay?
                  </p>
                </div>
                <p className="text-left font-500 text-12 text-gray-300">
                  Jason S, 12:06 PM
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 w-full p-[24px_12px_12px_12px] grid grid-cols-[1fr_auto] gap-x-2">
          <Input
            type="text"
            className="input w-full rounded-[16px] outline-none py-4 px-5 lg:placeholder:text-16 placeholder:text-gray-300 placeholder:font-500 placeholder:font-body placeholder:text-16 text-16 font-500 cursor-pointer text-blue-300 bg-secondary lg:h-fit h-10 border-none leading-4"
            placeholder="Message"
          />
          <Button
            variant={"secondary"}
            className="p-0 h-[52px] w-[52px] flex justify-center items-center"
          >
            <UilLocationArrow className="w-6 h-6 text-blue-300" />
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ChatModal;
