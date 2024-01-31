import { UilInfo } from "@/icons";
import { cn } from "@/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
  errorMessage?: string;
  errorIconClass?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, register, errorMessage, errorIconClass, ...props },
    ref
  ) => {
    return (
      <div className="w-full relative">
        <input
          type={type}
          className={cn(
            "form-control font-500 text-16 font-body text-secondary placeholder:text-gray-200 placeholder:text-16 placeholder:font-500 placeholder:font-body outline-offset-0 outline-none border rounded-2xl bg-transparent py-4 px-5 w-full focus:outline focus:outline-black-100/50 border-gray-500 dark:text-white",
            className,
            errorMessage && "border border-solid border-danger-100"
          )}
          ref={ref}
          {...register}
          {...props}
        />
        {errorMessage && (
          <span
            className={cn(
              "absolute h-5 w-5 flex justify-center items-center rounded-full bg-danger-100 right-5 top-7",
              errorIconClass
            )}
          >
            <UilInfo className="text-white" />
          </span>
        )}
        {errorMessage && (
          <p className="mt-2 ml-5 p-0 text-12 font-500 leading-[120%] text-danger-100">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
