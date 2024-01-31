"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { Button } from "@/components/UI/Button";
import { CustomInput, inputVariants } from "@/components/UI/form/CustomInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/form/CustomSelect";
import { cn } from "@/utils";
import { KYC_STEP, useKYCContext } from "./KycContextProvider";
import { countryOptions } from "./static";

const validationSchema = Yup.object().shape({
  address: Yup.object()
    .shape({
      addressLine1: Yup.string().max(80).required("Address line 1 is required"),
      addressLine2: Yup.string().max(80).required("Address line 2 is required"),
      city: Yup.string().max(40).required("City is required"),
      postalCode: Yup.string().max(20).required("Postal code is required"),
      state: Yup.string().max(80).required("State is required"),
      country: Yup.string().max(80).required("State is required"),
    })
    .required("Address is required"),
});

type FormDataSchemaType = Yup.InferType<typeof validationSchema>;

const AddressInformation = () => {
  const { updateUserDataInStriga, changeStep } = useKYCContext();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const updateUserAddressData = async (data: FormDataSchemaType) => {
    await updateUserDataInStriga.mutate({
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(updateUserAddressData)} className="p-4">
      <div className="grid grid-cols-12 items-end mb-10">
        <h1 className="text-24 font-500 col-span-7">
          What’s your current address?
        </h1>
        <p className="col-span-5 text-right text-12">4/4</p>
      </div>
      <div className="grid grid-cols-1 gap-y-5">
        <label>
          <p className="mb-2">Address line 1</p>
          <CustomInput
            error={errors?.address?.addressLine1?.message}
            isValid={touchedFields.address?.addressLine1 && isDirty}
            type="text"
            {...register("address.addressLine1")}
            className="relative bg-white"
          />
        </label>
        <label>
          <p className="mb-2">Address line 2</p>
          <CustomInput
            error={errors?.address?.addressLine2?.message}
            isValid={touchedFields.address?.addressLine2 && isDirty}
            type="text"
            {...register("address.addressLine2")}
            className="relative bg-white"
          />
        </label>
        <label>
          <p className="mb-2">City</p>
          <CustomInput
            error={errors?.address?.city?.message}
            isValid={touchedFields.address?.city && isDirty}
            type="text"
            {...register("address.city")}
            className="relative bg-white"
          />
        </label>
        <label>
          <p className="mb-2">Postal code</p>
          <CustomInput
            error={errors?.address?.postalCode?.message}
            isValid={touchedFields.address?.postalCode && isDirty}
            type="text"
            {...register("address.postalCode")}
            className="relative bg-white"
          />
        </label>
        <label>
          <p className="mb-2">State</p>
          <CustomInput
            error={errors?.address?.state?.message}
            isValid={touchedFields.address?.state && isDirty}
            type="text"
            {...register("address.state")}
            className="relative bg-white"
          />
        </label>
        <label className="relative">
          <p className="mb-2">Country</p>
          <Controller
            control={control}
            name="address.country"
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger
                  className={cn(
                    inputVariants({
                      variant: "default",
                      inputSize: "default",
                    }),
                    errors?.address?.country?.message &&
                      "border border-solid border-danger-100",
                    "w-full"
                  )}
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {countryOptions.map((option) => (
                    <SelectItem key={option.alpha2} value={option.alpha2}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.address?.country && (
            <span className="text-red-500 text-sm">
              <p className="mt-2 ml-5 p-0 text-12 font-500 leading-[120%] text-danger-100">
                {errors.address?.country?.message}
              </p>
            </span>
          )}
        </label>
      </div>
      <div className="flex items-center justify-between mt-10">
        <Button
          type="button"
          variant={"secondary"}
          onClick={() => changeStep(KYC_STEP.Occupation)}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="font-700"
          isLoading={updateUserDataInStriga.isLoading}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddressInformation;
