"use client";
import { cn } from "@/utils";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
type TooltipProps = {
  children: any;
  content: any;
  className?: string;
  tooltipContentClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  onOpenChange?: any;
};
const CustomToolTip: React.FC<TooltipProps> = ({
  content,
  children,
  className,
  tooltipContentClassName,
  side,
  open,
  onOpenChange,
}) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger className={cn("cursor-pointer", className)}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side || "top"}
          align="center"
          sideOffset={5}
          className={cn("TooltipContent", tooltipContentClassName)}
        >
          {content}
          {/* <Tooltip.Arrow className="TooltipArrow" /> */}
          <TooltipArrow className="TooltipArrow" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomToolTip;
