"use client";
import { Button } from "@/components/UI/Button";
import { CustomInput, inputVariants } from "@/components/UI/form/CustomInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/form/CustomSelect";
import { UilCheck, UilInfo } from "@/icons";
import { cn } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
// import DatePicker from "react-datepicker";
import { DatePicker } from "@/components/UI/DatePicker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { useKYCContext } from "./KycContextProvider";
import { countryOptions } from "./static";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.object().shape({
    countryCode: Yup.string()
      .matches(/^\+?\d+$/, "Invalid country code")
      .required("Country code is required"),
    number: Yup.string()
      .required("Mobile number is required")
      .matches(/^\d{7,15}$/, "Mobile number must be between 7 and 15 digits"),
  }),

  placeOfBirth: Yup.string()
    .notOneOf(["Select country"], "Please select a country")
    .required("Place of birth is required"),
  dateOfBirth: Yup.date()
    .max(
      new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
      "You must be at least 18 years old"
    )
    .min(
      new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000),
      "You cannot be more than 100 years old"
    )
    .required("Birth date is required")
    .nullable(),
});

type FormDataSchemaType = Yup.InferType<typeof validationSchema>;

const Register = () => {
  const [selfDeclaration, setSelfDeclaration] = useState<boolean>(false); // Declare explicitly the boolean type for the state
  const {
    userEmail,
    registerUserDataInStriga,
    userDetails,
    updateUserDataInStriga,
  } = useKYCContext();
  const updateMode = userDetails?.email && userDetails?.mobile?.number;
  const defaultDateOfBirth =
    userDetails?.dateOfBirth?.year &&
    userDetails?.dateOfBirth?.month !== undefined &&
    userDetails?.dateOfBirth?.day
      ? new Date(
          Number(userDetails?.dateOfBirth?.year),
          Number(userDetails?.dateOfBirth?.month) - 1,
          Number(userDetails?.dateOfBirth?.day)
        )
      : undefined;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, touchedFields },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      email: userEmail || userDetails?.email || "",
      dateOfBirth: defaultDateOfBirth,
      firstName: userDetails?.firstName || "",
      lastName: userDetails?.lastName || "",
      mobile: {
        countryCode: userDetails?.mobile?.countryCode || "",
        number: userDetails?.mobile?.number || "",
      },
      placeOfBirth: userDetails?.placeOfBirth || "",
    },
  });

  const dateOfBirthValue = watch("dateOfBirth");

  const registerUserInStriga = async (data: FormDataSchemaType) => {
    if (data.dateOfBirth) {
      const db = new Date(data.dateOfBirth);
      const _data = {
        ...data,
        dateOfBirth: {
          year: db.getFullYear(),
          month: db.getMonth() + 1,
          day: db.getDate(),
        },
      };
      if (updateMode) {
        let { email, mobile, ...rest } = _data;
        await updateUserDataInStriga.mutate(rest);
      } else {
        await registerUserDataInStriga.mutate(_data);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(registerUserInStriga)} className="p-4">
      <div className="grid grid-cols-12 items-end mb-10">
        <h1 className="text-24 font-500 col-span-7">
          Before we start, let’s get to know you{" "}
        </h1>
        <p className="col-span-5 text-right text-12">1/4</p>
      </div>
      <div className="grid grid-cols-1 gap-y-5 ">
        <label>
          <p className="mb-2">First Name</p>
          <CustomInput
            error={errors?.firstName?.message}
            isValid={touchedFields.firstName && isDirty}
            type="text"
            {...register("firstName")}
            className="relative bg-white"
          />
        </label>
        <label>
          <p className="mb-2">Last Name</p>
          <CustomInput
            error={errors?.lastName?.message}
            isValid={touchedFields.lastName && isDirty}
            type="text"
            {...register("lastName")}
            className="relative bg-white"
          />
        </label>
        <span className="relative">
          <p className="mb-2">Date of birth</p>
          <div className="relative">
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  className={cn(
                    inputVariants({
                      variant: "default",
                      inputSize: "default",
                    }),
                    errors.dateOfBirth?.message &&
                      "border border-solid border-danger-100"
                  )}
                  dateFormat="dd.MM.yyyy"
                  selected={value || undefined}
                  onChange={onChange}
                  minDate={
                    new Date(
                      new Date().getFullYear() - 99,
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                  }
                  maxDate={
                    new Date(
                      new Date().getFullYear() - 18,
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                  }
                />
              )}
            />
            {!errors.dateOfBirth?.message && dateOfBirthValue !== undefined && (
              <UilCheck className="bg-success-200 text-white w-5 h-5 p-[1px] rounded-full absolute top-1/2 -translate-y-1/2 right-5" />
            )}
            {errors.dateOfBirth?.message && (
              <UilInfo className="bg-danger-100 text-white w-5 h-5 p-[1px] rounded-full absolute top-1/2 -translate-y-1/2 right-5" />
            )}
          </div>
          {errors.dateOfBirth?.message && (
            <p className="mt-2 ml-5 p-0 text-12 font-500 leading-[120%] text-danger-100">
              {errors.dateOfBirth?.message}
            </p>
          )}
        </span>
        <label className="relative">
          <p className="mb-2">Place of birth</p>
          <Controller
            control={control}
            name="placeOfBirth"
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger
                  className={cn(
                    inputVariants({
                      variant: "default",
                      inputSize: "default",
                    }),
                    errors.placeOfBirth?.message &&
                      "border border-solid border-danger-100",
                    "w-full"
                  )}
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {countryOptions.map((option) => (
                    <SelectItem key={option.alpha3} value={option.alpha3}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.placeOfBirth?.message && (
            <>
              <p className="mt-2 ml-5 p-0 text-12 font-500 leading-[120%] text-danger-100">
                {errors.placeOfBirth?.message}
              </p>
            </>
          )}
        </label>
        <label>
          <p className="mb-2">Email</p>
          <CustomInput
            type="email"
            {...register("email")}
            error={errors?.email?.message}
            isValid={true}
            disabled
            className="relative bg-white"
          />
        </label>
        <div className="grid grid-cols-12 gap-x-4">
          <div className="flex flex-col col-span-4">
            <label>
              <p className="mb-2">Country Code</p>
              <CustomInput
                placeholder="+44"
                {...register("mobile.countryCode")}
                error={errors?.mobile?.countryCode?.message}
                isValid={touchedFields.mobile?.countryCode && isDirty}
                className="relative bg-white"
              />
            </label>
          </div>
          <div className="flex flex-col col-span-8">
            <label>
              <p className="mb-2">Mobile Number</p>
              <CustomInput
                {...register("mobile.number")}
                error={errors?.mobile?.number?.message}
                isValid={touchedFields.mobile?.number && isDirty}
                className="relative bg-white"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-10 sm:flex-row flex-col">
        <div className="flex gap-2 sm:mr-16">
          <label className="flex gap-3  cursor-pointer">
            <input
              type="checkbox"
              checked={selfDeclaration}
              onChange={(event) => setSelfDeclaration(event.target.checked)}
              className="peer absolute -z-50 opacity-0"
            />

            <span className="hidden text-primary peer-checked:block peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
              <UilCheck className=" h-4 w-4 text-white bg-blue-300 rounded" />
            </span>
            <span className="block text-muted-foreground peer-checked:hidden peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
              <div className="bg-white h-4 w-4 rounded"></div>
            </span>
            <span className="text-12 leading-4 font-500 text-blue-300">
              I understand that provided information will be linked to my
              account and cannot be changed
            </span>
          </label>
        </div>
        <div className="sm:mt-0 mt-8 sm:block flex justify-end w-full sm:w-auto">
          <Button
            type="submit"
            className="font-700 "
            isLoading={
              registerUserDataInStriga.isLoading ||
              updateUserDataInStriga.isLoading
            }
            disabled={!selfDeclaration}
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Register;
