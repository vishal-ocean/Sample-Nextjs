import { Button } from "@/components/UI/Button";
import CustomToastMessage from "@/components/UI/CustomToast/CustomToastMessage";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/Dialog";
import { CHANGE_PASSWORD, CHECK_EMAIL } from "@/constants";
import { UilPen } from "@/icons";
import { cn } from "@/utils";
import axios from "axios";
import { toast } from "react-toastify";

type ChangePasswordModalProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
};

export const ChangePasswordModal = ({
  modalOpen,
  setHandleModal,
}: ChangePasswordModalProps) => {
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CHANGE_PASSWORD : "");
  };

  const requestPasswordChangeLink = async () => {
    const res = await axios.get("/api/auth/change-password");
    if (res.data.success) {
      setHandleModal(CHECK_EMAIL);
      toast.success(
        <CustomToastMessage message="Success" subText={res.data.message} />
      );
    }
  };
  return (
    <Dialog open={modalOpen == CHANGE_PASSWORD} onOpenChange={handleOpenChange}>
      <DialogTrigger />
      <DialogContent
        className={cn(
          "max-w-[656px] sm:-translate-y-1/2 translate-y-0 rounded-[24px] data-[state=closed]:slide-out-to-top-[100%] data-[state=open]:slide-in-from-bottom-[100%] ",
          "p-5 sm:max-w-[520px] w-full bottom-0 top-auto"
        )}
      >
        <div className="h-10 w-10 flex items-center justify-center bg-secondary dark:bg-white/15 rounded-full">
          <UilPen className="h-4 w-4 text-blue-300 dark:text-white" />
        </div>
        <div className="mt-6">
          <p className="text-center text-24 font-500 leading-7 text-blue-300 dark:text-white">
            Change password
          </p>
          <p className="text-center text-16 font-500 leading-5 text-blue-300/60 dark:text-white/30 mt-3">
            Request a password reset link to your email
          </p>
          <Button
            className="text-16 font-700 leading-5 text-white py-4 px-6 mx-auto flex mt-6 mb-10"
            onClick={requestPasswordChangeLink}
          >
            {/* onClick={() => setHandleModal(CHECK_EMAIL)} */}
            Request the link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
