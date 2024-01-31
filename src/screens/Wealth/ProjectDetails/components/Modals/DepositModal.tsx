"use client";
import { Button } from "@/components/UI/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/Dialog";
import { Input } from "@/components/UI/form/Input";
import Error from "@/components/error";
import {
  ADD_CARD_MODAL,
  DEPOSIT_MODAL,
  TOP_UP_SUCCESS_MODAL,
} from "@/constants";
import { UilCardAtm, UilCheck, UilCheckCircle, UilPlus } from "@/icons";
import { useCardStore } from "@/store/cardDetails";
import {
  useDepositFiatBalanceAction,
  useDepositFiatBalanceStore,
} from "@/store/depositFiatBalance";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validationSchema = Yup.object({
  amount: Yup.number().typeError("only numbers"),
});
const DepositModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const cardData = useCardStore((state) => state.cardData);
  const depositFiat = useDepositFiatBalanceStore((state) => state.depositFiat);
  const { setDepositFiat } = useDepositFiatBalanceAction;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const onSubmit = (data: any) => {
    handleSubmit(data);
    setDepositFiat(data);
    setHandleModal(TOP_UP_SUCCESS_MODAL);
  };
  return (
    <Dialog
      open={modalOpen === DEPOSIT_MODAL}
      onOpenChange={(e) => setHandleModal(e ? DEPOSIT_MODAL : "")}
    >
      <DialogTrigger />
      <DialogContent className="max-w-[656px]">
        <div className="flex gap-x-2 items-center">
          {cardData.length > 0 ? (
            <>
              <div className="w-10 h-10 bg-success-200 flex justify-center items-center rounded-full">
                <UilCheck className="text-white w-4 h-4" />
              </div>
              <span className="text-12 text-success-200 font-500 leading-4">
                New Card Added
              </span>
            </>
          ) : (
            <>
              <div className="rounded-full h-10 w-10 bg-blue-300 flex justify-center items-center">
                <UilCardAtm className="w-4 h-4 text-white" />
              </div>
              <span className="text-12 text-blue-300 font-500 leading-4">
                Top Up Balance
              </span>
            </>
          )}
        </div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="px-7">
            <h1 className="max-w-[220px] font-500 text-24 leading-7 mt-6 mb-10">
              How much do you want to deposit?
            </h1>
            <div>
              <span className="text-40 text-blue-300 font-500 absolute">
                {watch("amount") && !Number.isNaN(watch("amount")) && "$"}
              </span>
              <Input
                register={register("amount")}
                placeholder="€0.00"
                className={cn(
                  "!text-blue-300 text-40 !p-0 mb-6 placeholder:text-40 border-transparent sm:w-[560px] max-w-[420px] placeholder:text-gray-300 rounded-1",
                  watch("amount") && !Number.isNaN(watch("amount")) && "!px-8"
                )}
              />
              {errors.amount && <Error message={errors.amount.message} />}
            </div>
            <div className="mt-5">
              <p className="text-blue-300/60 text-16 pb-4 font-500 ">
                Deposit with
              </p>
              <div
                className="bg-gray-100 p-5 w-[560px] rounded-[28px] cursor-pointer"
                onClick={() => setHandleModal(ADD_CARD_MODAL)}
              >
                <div className="flex justify-start items-center gap-x-2 ">
                  <div className="bg-secondary rounded-full w-10 h-10 flex justify-center items-center">
                    <UilPlus className="w-4 h-4 text-blue-300" />
                  </div>
                  <p className="text-blue-300/60 text-16 font-500">
                    Add New Card
                  </p>
                </div>
              </div>
              {cardData.length > 0 && (
                <div className="bg-gray-100 p-6 w-[560px] rounded-[28px] mt-2 flex justify-between">
                  <div className="flex justify-start items-center gap-x-4 ">
                    <UilCardAtm className="w-4 h-4 text-blue-300" />
                    <p className="text-blue-300 text-16 font-500">
                      Card {cardData?.[0]?.cardNumber}
                    </p>
                  </div>
                  <UilCheckCircle className="text-primary h-6 w-6" />
                </div>
              )}
            </div>
            <Button
              variant={"default"}
              disabled={!isValid}
              type="submit"
              className="mt-11 disabled:text-blue-400/40 disabled:bg-gray-100 font-700 px-6 leading-5"
            >
              Deposit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal;
