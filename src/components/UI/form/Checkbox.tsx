"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

import { UilCheckSquare, UilSquareFull } from "@/icons";
import { cn } from "@/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    iconClass?: string;
  }
>(({ className, iconClass, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "group peer shrink-0 disabled:cursor-not-allowed disabled:opacity-50 w-4 h-4",
      className
    )}
    {...props}
  >
    <div className="group-data-[state=checked]:hidden">
      <UilSquareFull className={cn("h-full w-full", iconClass)}></UilSquareFull>
    </div>
    <div className="group-data-[state=unchecked]:hidden">
      <UilCheckSquare
        className={cn("h-full w-full", iconClass)}
      ></UilCheckSquare>
    </div>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
