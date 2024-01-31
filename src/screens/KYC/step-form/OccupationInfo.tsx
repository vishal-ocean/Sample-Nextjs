"use client";
import { Button } from "@/components/UI/Button";
import { Checkbox } from "@/components/UI/form/Checkbox";
import { CustomInput, inputVariants } from "@/components/UI/form/CustomInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/form/CustomSelect";
import { cn } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { KYC_STEP, useKYCContext } from "./KycContextProvider";
import {
  expectedIncomingTxVolumeYearlyOptions,
  expectedOutgoingTxVolumeYearlyOptions,
  occupationOptions,
  purposeOfAccountOptions,
  sourceOfFundsOptions,
} from "./static";

const validationSchema = Yup.object().shape({
  occupation: Yup.string().required("Occupation is required"),
  sourceOfFunds: Yup.string().required("Source of funds is required"),
  sourceOfFundsOther: Yup.string().when("sourceOfFunds", {
    is: "OTHER",
    then: (schema) =>
      schema
        .max(80, "Max 80 characters allowed")
        .required("Other Source of funds is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  purposeOfAccount: Yup.string().required("Purpose of account is required"),
  purposeOfAccountOther: Yup.string().when("purposeOfAccount", {
    is: "OTHER",
    then: (schema) =>
      schema
        .max(80, "Max 80 characters allowed")
        .required("Other Purpose of account is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  expectedOutgoingTxVolumeYearly: Yup.string().required("Field is required"),
  expectedIncomingTxVolumeYearly: Yup.string().required("Field is required"),
  selfPepDeclaration: Yup.boolean(),
});

type FormDataSchemaType = Yup.InferType<typeof validationSchema>;

const OccupationInfo = () => {
  const { updateUserDataInStriga, changeStep, userDetails } = useKYCContext();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isDirty },
    watch,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      selfPepDeclaration: userDetails?.selfPepDeclaration || false,
      expectedIncomingTxVolumeYearly:
        userDetails?.expectedIncomingTxVolumeYearly || undefined,
      expectedOutgoingTxVolumeYearly:
        userDetails?.expectedOutgoingTxVolumeYearly || undefined,
      occupation: userDetails?.occupation || undefined,
      sourceOfFunds: userDetails?.sourceOfFunds || undefined,
      purposeOfAccount: userDetails?.purposeOfAccount || undefined,
      sourceOfFundsOther: userDetails?.sourceOfFundsOther || undefined,
      purposeOfAccountOther: userDetails?.purposeOfAccountOther || undefined,
    },
  });

  const sourceOfFunds = watch("sourceOfFunds");
  const purposeOfAccount = watch("purposeOfAccount");

  const updateOccupationDataInStriga = async (data: FormDataSchemaType) => {
    await updateUserDataInStriga.mutate({
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(updateOccupationDataInStriga)} className="p-4">
      <div className="grid grid-cols-12 items-end mb-10">
        <h1 className="text-24 font-500 col-span-7">
          Tell us a little bit more about your occupation
        </h1>
        <p className="col-span-5 text-right text-12">3/4</p>
      </div>
      <div className="grid grid-cols-1 gap-y-5">
        <label className="relative">
          <p className="mb-2">Occupation</p>
          <Controller
            control={control}
            name="occupation"
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger
                  className={cn(
                    inputVariants({
                      variant: "default",
                      inputSize: "default",
                    }),
                    errors.occupation?.message &&
                      "border border-solid border-danger-100",
                    "w-full"
                  )}
                >
                  <SelectValue placeholder="Select occupation" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {Object.entries(occupationOptions).map(([key, value]) => (
                    <SelectItem key={value} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.occupation?.message && (
            <>
              <p className="mt-2 ml-5 p-0 text-12 font-500 leading-[120%] text-danger-100">
                {errors.occupation?.message}
              </p>
            </>
          )}
        </label>
        <label className="relative">
          <p className="mb-2">Source of funds</p>
          <Controller
            control={control}
            name="sourceOfFunds"
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger
                  className={cn(
                    inputVariants({
                      variant: "default",
                      inputSize: "default",
                    }),
                    errors.sourceOfFunds?.message &&
                      "border border-solid border-danger-100",
                    "w-full"
                  )}
                >
                  <SelectValue placeholder="Select source of funds" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {Object.entries(sourceOfFundsOptions).map(([key, value]) => (
                    <SelectItem key={value} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.sourceOfFunds?.message && (
            <>
              <p className="mt-2 ml-5 p-0 text-12 font-500 leading-[120%] text-danger-100">
                {errors.sourceOfFunds?.message}
              </p>
            </>
          )}
        </label>
        {sourceOfFunds === "OTHER" && (
          <label>
            <p className="mb-2">Source of funds (other)</p>
            <CustomInput
              error={errors?.sourceOfFundsOther?.message}
              isValid={touchedFields.sourceOfFundsOther && isDirty}
              type="text"
              {...register("sourceOfFundsOther")}
              className="relative bg-white"
            />
          </label>
        )}
        <label className="relative">
          <p className="mb-2">Purpose of account</p>
          <Controller
            control={control}
            name="purposeOfAccount"
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger
                  className={cn(
                    inputVariants({
                      variant: "default",
                      inputSize: "default",
                    }),
                    errors.purposeOfAccount?.message &&
                      "border border-solid border-danger-100",
                    "w-full"
                  )}
                >
                  <SelectValue placeholder="Select purpose of account" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {Object.entries(purposeOfAccountOptions).map(
                    ([key, value]) => (
                      <SelectItem key={value} value={key}>
                        {value}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.purposeOfAccount?.message && (
            <>
              <p className="mt-2 ml-5 p-0 text-12 font-500 leading-[120%] text-danger-100">
                {errors.purposeOfAccount?.message}
              </p>
            </>
          )}
        </label>
        {purposeOfAccount === "OTHER" && (
          <label>
            <p className="mb-2">Purpose of account (other)</p>
            <CustomInput
              error={errors?.purposeOfAccountOther?.message}
              isValid={touchedFields.purposeOfAccountOther && isDirty}
              type="text"
              {...register("purposeOfAccountOther")}
              className="relative bg-white"
            />
          </label>
        )}
        <label className="relative">
          <p className="mb-2">Expected Outgoing Tx Volume Yearly</p>
          <Controller
            control={control}
            name="expectedOutgoingTxVolumeYearly"
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger
                  className={cn(
                    inputVariants({
                      variant: "default",
                      inputSize: "default",
                    }),
                    errors.expectedOutgoingTxVolumeYearly?.message &&
                      "border border-solid border-danger-100",
                    "w-full"
                  )}
                >
                  <SelectValue placeholder="Select Tx Volume" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {Object.entries(expectedOutgoingTxVolumeYearlyOptions).map(
                    ([key, value]) => (
                      <SelectItem key={value} value={key}>
                        {value}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.expectedOutgoingTxVolumeYearly?.message && (
            <>
              <p className="mt-2 ml-5 p-0 text-12 font-500 leading-[120%] text-danger-100">
                {errors.expectedOutgoingTxVolumeYearly?.message}
              </p>
            </>
          )}
        </label>
        <label className="relative">
          <p className="mb-2">Expected Incoming Tx Volume Yearly</p>
          <Controller
            control={control}
            name="expectedIncomingTxVolumeYearly"
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger
                  className={cn(
                    inputVariants({
                      variant: "default",
                      inputSize: "default",
                    }),
                    errors.expectedIncomingTxVolumeYearly?.message &&
                      "border border-solid border-danger-100",
                    "w-full"
                  )}
                >
                  <SelectValue placeholder="Select Tx Volume" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {Object.entries(expectedIncomingTxVolumeYearlyOptions).map(
                    ([key, value]) => (
                      <SelectItem key={value} value={key}>
                        {value}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.expectedIncomingTxVolumeYearly?.message && (
            <>
              <p className="mt-2 ml-5 p-0 text-12 font-500 leading-[120%] text-danger-100">
                {errors.expectedIncomingTxVolumeYearly?.message}
              </p>
            </>
          )}
        </label>
        <div className="flex items-center my-3">
          <Controller
            control={control}
            name="selfPepDeclaration"
            render={({ field: { onChange, value } }) => (
              <label
                className="text-sm font-medium flex items-center gap-x-2 cursor-pointer select-none"
                htmlFor="selfPepDeclaration"
              >
                <Checkbox
                  defaultChecked={false}
                  id="selfPepDeclaration"
                  className="w-6 h-6"
                  iconClass="group-data-[state=checked]:text-blue-600"
                  onCheckedChange={onChange}
                  checked={!!value}
                ></Checkbox>
                <span>I am politically exposed person.</span>
              </label>
            )}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-10">
        <Button
          type="button"
          variant={"secondary"}
          onClick={() => changeStep(KYC_STEP.Verification)}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="font-700"
          isLoading={updateUserDataInStriga.isLoading}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default OccupationInfo;
