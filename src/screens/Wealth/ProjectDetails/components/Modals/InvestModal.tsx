"use client";
import { Button } from "@/components/UI/Button";
import { Dialog, DialogContent } from "@/components/UI/Dialog";
import { Input } from "@/components/UI/form/Input";
import { INVEST_MODAL, INVEST_SUMMARY_MODAL } from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validationSchema = Yup.object({
  amount: Yup.number()
    .typeError("Enter numbers only.")
    .required("This Field is required."),
});
const InvestModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const onSubmit = (data: any) => {
    handleSubmit(data);
    setHandleModal(INVEST_SUMMARY_MODAL);
  };
  return (
    <Dialog
      open={modalOpen === INVEST_MODAL}
      onOpenChange={() => setHandleModal("")}
    >
      <DialogContent className="bg-white rounded-[24px] max-w-[656px] gap-5 translate-y-0 sm:-translate-y-1/2">
        <div className="flex gap-x-2 items-center">
          <span className="rounded-full w-10 h-10 bg-yellow-100 flex justify-center items-center">
            {/*     <Image
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
        <div className="px-7">
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 select-none"
          >
            <span className="text-24 font-500 leading-7 text-blue-300">
              How much do you
              <br />
              want to invest?
            </span>
            <div className="mt-6 sm:mt-10">
              <span className="text-40 text-blue-300 font-500 absolute">
                {watch("amount") && !Number.isNaN(watch("amount")) && "$"}
              </span>
              <Input
                register={register("amount")}
                placeholder="€25,000"
                className={cn(
                  "!text-blue-300 text-40 !p-0 mb-3 placeholder:text-40 border-transparent w-[560px] max-w-[420px] placeholder:text-gray-300 rounded-1",
                  watch("amount") && !Number.isNaN(watch("amount")) && "!px-8"
                )}
              />
            </div>
            <span
              className={cn(
                "text-blue-300/60 font-500 leading-[120%] mt-3",
                errors.amount && "text-danger-100"
              )}
            >
              Minimum Investment €25,000
            </span>

            <div className="mt-6 sm:mt-11 flex gap-x-5 items-center mb-1 sm:mb-7">
              <Button
                type="submit"
                className="font-700 !leading-5 text-16"
                disabled={!isValid}
              >
                Next
              </Button>
              <span className="text-blue-300/60 font-500 text-16 leading-7">
                Your balance €180,000
              </span>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestModal;
