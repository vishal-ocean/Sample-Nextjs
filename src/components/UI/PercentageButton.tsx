import { Button } from "./Button";

interface PercentageButtonProps {
  percentage: number;
  onClick: () => void;
  disabled?: boolean;
}
export const PercentageButton = ({
  percentage,
  onClick,
  disabled,
}: PercentageButtonProps) => (
  <Button
    variant={"outline"}
    type="button"
    className="text-blue-300 text-12 w-fit h-fit p-0 font-500 leading-4 dark:text-white"
    disabled={disabled}
    onClick={onClick}
  >
    {percentage}%
  </Button>
);
