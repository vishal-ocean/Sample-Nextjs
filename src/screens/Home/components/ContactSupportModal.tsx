"use client";
import { Portal } from "@/components/Portal";
import { Button } from "@/components/UI/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { CONTACT_SUPPORT_MODAL } from "@/constants";
import { UilExclamationTriangle } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";

const ContactSupportModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  return (
    <Portal>
      <Dialog
        open={modalOpen === CONTACT_SUPPORT_MODAL}
        onOpenChange={(e) => setHandleModal(e ? CONTACT_SUPPORT_MODAL : "")}
      >
        <DialogTrigger />
        <DialogContent className="sm:max-w-[424px] translate-y-0 sm:-translate-y-1/2">
          <DialogTitle>
            <div className="bg-pink-100 w-10 h-10 rounded-full flex justify-center items-center">
              <UilExclamationTriangle className="w-4 h-4 text-white" />
            </div>
          </DialogTitle>
          <div className="mx-auto max-w-[327px] text-center mb-1 sm:mb-7 mt-6">
            <p className="text-24 font-500 text-blue-300 leading-[120%]">
              Contact Support to withdraw investments back from the project
            </p>
            <Button className="mt-6  sm:mt-11 py-3.5 font-700">
              Contact Support
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Portal>
  );
};

export default ContactSupportModal;
