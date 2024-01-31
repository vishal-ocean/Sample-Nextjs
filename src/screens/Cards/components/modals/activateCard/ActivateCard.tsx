import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import { CustomInput } from "@/components/UI/form/CustomInput";
import { ACTIVATE_CARD_MODAL } from "@/constants";
import { UilCreditCard } from "@/icons";
import { useCardActivationMutation } from "@/services/useStrigaCards";
import { useCardAction } from "@/store/cardDetails";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useUserDataStore } from "@/store/userDataStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { UilQuestion } from "@iconscout/react-unicons";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const activateCardSchema = Yup.object().shape({
  cardId: Yup.string().required("Card ID is required"),
  activationCode: Yup.string()
    .required("Activation code is required")
    .min(4, "Activation code must be exactly 4 characters")
    .max(4, "Activation code must be exactly 4 characters"),
});
const ActivateCard = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { setActivateCardDetails } = useCardAction;
  const { userCardDetails } = useUserDataStore();
  const activateCardMutation = useCardActivationMutation();

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? ACTIVATE_CARD_MODAL : "");
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, touchedFields, isDirty },
  } = useForm({
    resolver: yupResolver(activateCardSchema),
    mode: "onChange",
    defaultValues: {
      cardId: userCardDetails?.find((card: any) => card.type === "PHYSICAL")
        ?.id,
      activationCode: "",
    },
  });

  const handleActivateCardSubmit = (data: {
    cardId: string;
    activationCode: string;
  }) => {
    activateCardMutation?.mutate(data);
    setActivateCardDetails(data);
  };

  return (
    <CustomModal
      open={modalOpen === ACTIVATE_CARD_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5 pr-3 sm:pr-5 max-h-[600px]"
    >
      <div className="flex gap-x-2 items-center">
        <span className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15">
          <UilCreditCard className="h-4 w-4 text-blue-300 dark:text-white" />
        </span>
        <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
          Activate Card
        </span>
      </div>
      <div className="mt-4  sm:px-3">
        <p className="text-24 leading-7 font-500 text-blue-300  dark:text-white">
          Enter 4 last digits <br />
          of your card number
        </p>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(handleActivateCardSubmit)}
        >
          <div className="mt-8 flex flex-row">
            <p className="text-12  leading-4 font-500 text-gray-300  dark:text-white/30">
              4 last digits
            </p>

            <UilQuestion className="w-4 h-4 bg-secondary  dark:bg-white/15 rounded-full text-white ml-1 dark:text-blue-300" />
          </div>

          <div className="mt-3">
            <CustomInput
              {...register("activationCode")}
              isValid={touchedFields.activationCode && isDirty}
              type="number"
              error={errors?.activationCode?.message}
              className="bg-gray-100 dark:bg-white/5 dark:text-white dark:border-none"
              maxLength={4}
            />
          </div>
          <div className="flex justify-center mt-8 mb-3">
            <Button
              className="font-700 leading-5 text-16 rounded-3xl px-6 py-4"
              type="submit"
              disabled={
                watch("activationCode")?.length !== 4 ||
                activateCardMutation?.isLoading
              }
            >
              {activateCardMutation?.isLoading
                ? "Loading..."
                : " Activate Card"}
            </Button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default ActivateCard;
