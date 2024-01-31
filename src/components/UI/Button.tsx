"use client";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";
import LoadingSpinner from "../LoadingSpinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white rounded-full disabled:bg-gray-100 disabled:dark:bg-white/15 disabled:text-gray-300 disabled:dark:text-white/30",

        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary disabled:text-gray-300 text-black rounded-full",
      },
      size: {
        default: "py-4 px-6",
        sm: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { isLoading?: boolean; loadingClass?: string }
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      isLoading,
      loadingClass,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? <LoadingSpinner className={loadingClass} /> : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
