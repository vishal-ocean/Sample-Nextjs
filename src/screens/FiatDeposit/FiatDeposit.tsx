"use client";
import { UilPlus, UilWallet } from "@/icons";

import { Portal } from "@/components/Portal";
import { Button } from "@/components/UI/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { Input } from "@/components/UI/form/Input";
import Error from "@/components/error";
import {
  ADD_CARD_MODAL,
  DEPOSIT_MODAL,
  DEPOSIT_SUCCESS_MODAL,
  FIAT_DEPOSIT_MODAL,
} from "@/constants";
import { useCardStore } from "@/store/cardDetails";
import { useDepositFiatBalanceAction } from "@/store/depositFiatBalance";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

type UserSubmitForm = {
  amount: string;
};
const validationSchema = Yup.object({
  amount: Yup.number().typeError("only numbers"),
});
const FiatDeposit = () => {
  const cardData = useCardStore((state) => state.cardData);
  const { setHandleModal } = useHandleModalAction;
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
  const { modalOpen } = useHandleModalStore();

  const { setDepositFiat } = useDepositFiatBalanceAction;
  const onSubmit = (data: any) => {
    handleSubmit(data);
    setDepositFiat(data);
    setHandleModal(DEPOSIT_SUCCESS_MODAL);
  };

  return (
    <Portal>
      <Dialog
        open={modalOpen === FIAT_DEPOSIT_MODAL}
        onOpenChange={(e) => setHandleModal(e ? FIAT_DEPOSIT_MODAL : "")}
      >
        <DialogTrigger />
        <DialogContent className="sm:max-w-[656px] translate-y-0 sm:-translate-y-1/2">
          <DialogTitle className="text-12 flex gap-x-2 items-center text-blue-300 font-500">
            <Button
              variant="secondary"
              className={`w-auto h-10 px-4 py-0 text-14 font-700 ${
                cardData.length > 0 && "hidden"
              }`}
              onClick={() => setHandleModal(DEPOSIT_MODAL)}
            >
              Go Back
            </Button>
            <div className="rounded-full h-10 w-10 bg-success-200 flex justify-center items-center">
              <UilWallet className="w-4 h-4 text-white" />
            </div>
            <span className="text-12">Deposit Fiat</span>
          </DialogTitle>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="px-1 sm:px-7">
              <h1 className="max-w-[300px] sm:max-w-[220px] font-500 text-24 leading-7 mb-10 mt-6">
                How much do you want to deposit?
              </h1>
              <div className="relative">
                <span className="text-40 text-blue-300 font-500 absolute leading-[120%]">
                  {watch("amount") && !Number.isNaN(watch("amount")) && "$"}
                </span>
                <Input
                  register={register("amount")}
                  placeholder="€0.00"
                  className={cn(
                    "!text-blue-300 h-12 text-40 !p-0 placeholder:text-40 border-transparent max-w-[300px] sm:w-[560px] sm:max-w-[420px] placeholder:text-gray-300",
                    watch("amount") && !Number.isNaN(watch("amount")) && "!px-8"
                  )}
                />
                {errors.amount && <Error message={errors.amount.message} />}
              </div>
              <div className="mt-10">
                <p className="text-blue-300/60 text-16 pb-4 font-500 ">
                  Deposit with
                </p>
                <div
                  className="bg-gray-100 p-5 w-full sm:w-[560px] rounded-[28px] cursor-pointer"
                  onClick={() => setHandleModal(ADD_CARD_MODAL)}
                >
                  <div className="flex justify-start items-center gap-x-2 ">
                    <div className="bg-secondary rounded-full w-8 h-8 flex justify-center items-center">
                      <UilPlus className="w-4 h-4 text-blue-300" />
                    </div>
                    <p className="text-blue-300/60 text-16 font-500 leading-[120%]">
                      Add New Card
                    </p>
                  </div>
                </div>
                {cardData.length > 0 && (
                  <div className="bg-gray-100 p-6 w-[300px] sm:w-[560px] rounded-[28px] mt-2">
                    <div className="flex justify-start items-center gap-x-4 ">
                      <UilWallet className="w-4 h-4 text-blue-300" />
                      <p className="text-blue-300 text-16 font-500">
                        Card {cardData?.[0]?.cardNumber}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant={"default"}
                disabled={!isValid}
                type="submit"
                className="sm:mt-11 mt-6 py-3.5 px-6 disabled:text-blue-400/40 disabled:bg-gray-100 mb-1 sm:mb-7 font-700"
              >
                Deposit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Portal>
  );
};

export default FiatDeposit;
