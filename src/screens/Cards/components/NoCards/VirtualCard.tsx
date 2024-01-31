import { IconDots } from "@/components/icons/IconDots";
import { SmallCardShape } from "@/components/icons/SmallCardShape";
import { CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL } from "@/constants";
import { UilBoltAlt } from "@/icons";
import { useCardAction } from "@/store/cardDetails";
import { useHandleModalAction } from "@/store/handleModal";
import Image from "next/image";

export const VirtualCard = () => {
  const { setHandleModal } = useHandleModalAction;
  const { setCardActionDetails } = useCardAction;

  return (
    <div className="bg-blue-1000 rounded-[24px] w-full md:w-3/6 relative overflow-hidden group">
      <div className="absolute w-full bg-blue-150 blur-[200px] rounded-full h-24 group-hover:h-[216px] "></div>
      <p className="text-16 leading-5 font-500 text-white/30 text-center mb-3 mt-10 sm:mt-[60px]">
        Card
      </p>
      <p className="text-white text-24 leading-7 font-500 text-center mb-5">
        Virtual card
      </p>
      <p className="text-16 leading-5 font-500 text-white/30 text-center mb-10">
        One card to spend or withdraw money <br /> with the real exchange rate
      </p>
      <div
        className="px-6 py-4 bg-white/15 w-max m-auto rounded-3xl mb-5 md:mb-10 cursor-pointer"
        onClick={() => {
          setCardActionDetails({
            selectedCurrency: "",
            selectedType: "Virtual",
            password: "",
            selectedDeliveryMethod: "",
          });
          setHandleModal(CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL);
        }}
      >
        <span className="text-white text-16 leading-5 font-700">
          Get Virtual Card
        </span>
      </div>
      <div className="relative rounded-[18px] w-[268px] h-40 md:w-80 lg:w-[402px] md:h-[200px] lg:h-[240px] m-auto -bottom-5 md:-bottom-9 group-hover:-bottom-2 transform transition-all duration-150 ease-in-out delay-0">
        <Image
          src={"/images/virtual-card-bg.png"}
          height={1000}
          width={1000}
          alt="virtual card"
          className="w-full h-full absolute hidden lg:block"
        />
        <SmallCardShape
          className="w-full h-full hidden md:block lg:hidden"
          color1="#1F5EFF"
          color2="#25CBFF"
          color3="#45B4F3"
        />
        <SmallCardShape className="w-full h-full md:hidden" />
        <span className="absolute text-white font-500 leading-[30px] text-24 top-[30px] left-[30px]">
          Virtual
        </span>
        <div className="lg:h-[60px] lg:w-[60px] h-10 w-10 absolute top-0 right-0 bg-white/15 rounded-full flex items-center justify-center">
          <UilBoltAlt className="w-4 h-4 lg:w-6 lg:h-6 text-white " />
        </div>
        <div className="hidden md:flex gap-[3px] absolute bottom-5 left-[30px] items-center">
          <IconDots className="h-10 w-10 fill-white" />
          <span className="text-white text-24 font-500 leading-[30px] ml-[9px]">
            0000
          </span>
        </div>
        <Image
          src={"/images/svg/visa.svg"}
          height={20}
          width={63}
          alt=""
          className="absolute bottom-7 right-7"
        />
      </div>
    </div>
  );
};
