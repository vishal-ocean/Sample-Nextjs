import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import { ADD_NEW_CARD_MODAL } from "@/constants";
import { useBuyDummyLists } from "@/hooks/useBuyDummyLists";
import { UilCheckCircle, UilPlus } from "@/icons";
import { useHandleModalAction } from "@/store/handleModal";
import Image from "next/image";

interface CardDropDownProps {
  openCardDropdown: boolean;
  setOpenCardDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  cardValue: string;
  setCardValue: React.Dispatch<React.SetStateAction<string>>;
}
const CardDropDown: React.FC<CardDropDownProps> = ({
  cardValue,
  setCardValue,
  openCardDropdown,
  setOpenCardDropdown,
}) => {
  const { CardList } = useBuyDummyLists();
  const { setHandleModal } = useHandleModalAction;
  return (
    <Popover
      open={openCardDropdown}
      onOpenChange={(e) => setOpenCardDropdown(e)}
    >
      <PopoverTrigger />
      <PopoverContent className="sm:bg-secondary/50 bg-secondary sm:backdrop-blur-[16px] p-4 rounded-[16px] sm:w-[424px] w-[360px]">
        <p className="text-gray-300 text-12 font-500 leading-5">My Cards</p>
        <div className="max-h-[200px] overflow-y-auto mt-1">
          {CardList.map((item, index) => (
            <>
              <div
                className="w-full flex justify-between items-center py-2 cursor-pointer"
                onClick={() => {
                  setCardValue(item.value);
                  setOpenCardDropdown(false);
                }}
                key={`cardDropdown-${index}`}
              >
                <div className="flex gap-x-4 items-center">
                  <div className="py-[6px] px-1">
                    <Image width={37} height={12} src={item.img} alt="image" />
                  </div>
                  <span className="font-500 text-14 text-blue-300 leading-4">
                    {item.name}
                  </span>
                </div>
                {cardValue === item.value && (
                  <UilCheckCircle className="text-primary h-4 w-4" />
                )}
              </div>
              {index !== CardList.length - 1 && (
                <hr className="p-0 m-0 bg-gray-300 opacity-10" />
              )}
            </>
          ))}
          <div
            className="w-full flex gap-x-3 items-center py-2 cursor-pointer"
            onClick={() => {
              setCardValue("");
              setHandleModal(ADD_NEW_CARD_MODAL);
            }}
          >
            <div className="rounded-3xl h-7 w-7 bg-white flex justify-center items-center">
              <UilPlus className="text-blue-300 h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-14 font-500 text-blue-300 leading-4">
                Add New Card
              </span>
              <span className="text-12 font-500 text-gray-300 leading-4">
                Visa, Mastercard
              </span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CardDropDown;
