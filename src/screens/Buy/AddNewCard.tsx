"use client";
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/form/Input";
import Error from "@/components/error";
import { ADD_NEW_CARD_MODAL, BUY_MODAL } from "@/constants";
import { UilCheck, UilClock, UilPlus } from "@/icons";
import { useCardAction, useCardStore } from "@/store/cardDetails";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("This field is required."),
  cardNumber: Yup.number().typeError("Only Numbers"),
  expiration: Yup.string().required("This field is required."),
  cvv: Yup.string().min(3).max(4).typeError("Only Numbers"),
});
const AddNewCard = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const cardData = useCardStore((state) => state.cardData);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const { setCardData } = useCardAction;
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const onSubmit = (data: any) => {
    setIsAddingCard(true);
    setTimeout(() => {
      handleSubmit(data);
      // setHandleModal(DEPOSIT_MODAL);
      setCardData(data);
      setIsAddingCard(false);
    }, 2000);
  };
  return (
    <CustomModal
      open={modalOpen === ADD_NEW_CARD_MODAL}
      onOpenChange={(e: boolean) => {
        setHandleModal(e ? ADD_NEW_CARD_MODAL : "");
        setHandleModalState(false);
      }}
    >
      <div className="text-12 flex gap-x-2 items-center text-blue-300 font-500">
        <Button
          variant="secondary"
          className="w-auto h-10 px-4 py-0 text-14 font-700"
          onClick={() => setHandleModal(BUY_MODAL)}
        >
          Go Back
        </Button>
        <div className="rounded-full h-10 w-10 bg-secondary  flex justify-center items-center">
          <UilPlus className="text-blue-300 w-4 h-4 mx-auto" />
        </div>
        <span className="text-12 text-blue-300">Add New Card</span>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:px-7">
          <div className="my-5 sm:my-6">
            <h2 className="text-blue-300 text-24 font-500">Card Details</h2>
          </div>
          <div className="pt-2.5 sm:pt-[14px]">
            <div className="relative">
              <Input
                register={register("name")}
                placeholder="Cardholder Name"
                className={`!bg-gray-100 !border-0 placeholder:!text-blue-300/60 placeholder:normal-case uppercase !rounded-[28px] px-6 py-6  sm:!px-7 leading-5 !text-blue-300 sm:!py-[26px] ${
                  errors.name ? "!border-danger-100 !border" : ""
                }`}
              />
              {watch("name") && !errors.name && watch.name !== "" && (
                <UilCheck className="text-success-200 w-6 h-6 absolute top-1/2 -translate-y-1/2 right-6" />
              )}
            </div>
            {errors.name && <Error message={errors.name.message} />}
          </div>
          <div className="pt-2">
            <div className=" relative">
              <Input
                register={register("cardNumber")}
                placeholder="Card Number"
                className={`!bg-gray-100 !border-0 placeholder:!text-blue-300/60 !rounded-[28px] px-6 py-6 sm:!px-7 leading-5 !text-blue-300 sm:!py-[26px] ${
                  errors.cardNumber ? "!border-danger-100 !border" : ""
                }`}
              />
              {watch("cardNumber") && !errors.cardNumber && (
                <UilCheck className="text-success-200 w-6 h-6 absolute top-1/2 -translate-y-1/2 right-6" />
              )}
            </div>
            {errors.cardNumber && <Error message={errors.cardNumber.message} />}
          </div>
          <div className="pt-2 grid grid-cols-2 gap-x-2">
            <div>
              <div className="relative">
                <Input
                  register={register("expiration")}
                  placeholder="Expiration"
                  className={`!bg-gray-100 !border-0 placeholder:!text-blue-300/60 !rounded-[28px] px-6 py-6 sm:!px-7 leading-5 !text-blue-300 sm:!py-[26px] ${
                    errors.expiration ? "!border-danger-100 !border" : ""
                  }`}
                />
                {watch("expiration") && !errors.expiration && (
                  <UilCheck className="text-success-200 w-6 h-6 absolute top-1/2 -translate-y-1/2 right-6" />
                )}
              </div>
              {errors.expiration && (
                <Error message={errors.expiration.message} />
              )}
            </div>
            <div>
              <div className="relative">
                <Input
                  type="number"
                  register={register("cvv")}
                  placeholder="CVV"
                  className={`!bg-gray-100 !border-0 placeholder:!text-blue-300/60 !rounded-[28px] px-6 py-6 sm:!px-7 leading-5 !text-blue-300 sm:!py-[26px] ${
                    errors.cvv ? "!border-danger-100 !border" : ""
                  }`}
                />
                {watch("cvv") && !errors.cvv && (
                  <UilCheck className="text-success-200 w-6 h-6 absolute top-1/2 -translate-y-1/2 right-6" />
                )}
              </div>
              {errors.cvv && <Error message={errors.cvv.message} />}
            </div>
          </div>

          {isAddingCard ? (
            <Button
              type="submit"
              variant={"default"}
              className="mt-6 sm:mt-11 mb-1 sm:mb-7 flex justify-center items-center gap-x-2 bg-blue-300 text-white font-700 leading-5"
            >
              <div>
                <UilClock className="w-4 h-4 text-white" />
              </div>
              <p> Adding Your Card... </p>
            </Button>
          ) : (
            <Button
              type="submit"
              variant={"default"}
              disabled={!isValid}
              className="mt-6 sm:mt-11 mb-1 sm:mb-7  disabled:text-blue-400/40 disabled:bg-gray-100 font-700 leading-5"
            >
              Add Card
            </Button>
          )}
        </div>
      </form>
    </CustomModal>
  );
};

export default AddNewCard;
