import { Button } from "@/components/UI/Button";
import { CardShape } from "@/components/icons/CardShape";
import { IconDots } from "@/components/icons/IconDots";
import { SmallCardShape } from "@/components/icons/SmallCardShape";
import { ACTIVATE_CARD_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { UilBoltAlt, UilCreditCard } from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";
import Slider from "react-slick";
import { useCardSection } from "./useCardSection";

const CardSliderSection = ({
  currentCard,
  setCurrentCard,
  isCardFreeze,
}: {
  currentCard: string;
  setCurrentCard: (payload: string) => void;
  isCardFreeze: any;
}) => {
  const {
    sliderRef,
    slickRef,
    setHandleModal,
    userCardDetails,
    isLoading,
    setIsLoading,
    orderCard,
    onCardSwitch,
  } = useCardSection();

  const currentCardDetails = userCardDetails.find(
    (obj: any) => obj.type === currentCard?.toUpperCase()
  );

  const settings = {
    dots: false,
    infinite: false,
    touchMove: false,
    lazyLoad: false,
    centerMode: false,
    fade: true,
    initialSlide: currentCard === "VIRTUAL" ? 1 : 0,
  };

  return (
    <>
      {/* slider action button */}
      <div className="flex gap-1 top-0 pl-3 sm:p-0 mt-6 sm:m-0">
        <Button
          className={`px-4 py-3 rounded-full text-white dark:disabled:text-white disabled:text-white text-14 font-700 leading-4 ${
            currentCard === "PHYSICAL"
              ? "bg-white/15 disabled:bg-white/15 dark:disabled:bg-white/15"
              : "bg-transparent disabled:bg-transparent dark:disabled:bg-transparent"
          }`}
          disabled={isLoading}
          onClick={() => {
            setCurrentCard("PHYSICAL");
            onCardSwitch("PHYSICAL");
          }}
        >
          Physical
        </Button>
        <Button
          className={`px-4 py-3 rounded-full text-white dark:disabled:text-white disabled:text-white text-14 font-700 leading-4 ${
            currentCard === "VIRTUAL"
              ? "bg-white/15 disabled:bg-white/15 dark:disabled:bg-white/15"
              : "bg-transparent disabled:bg-transparent dark:disabled:bg-transparent"
          }`}
          disabled={isLoading}
          onClick={() => {
            setCurrentCard("VIRTUAL");
            onCardSwitch("VIRTUAL");
          }}
        >
          Virtual
        </Button>
      </div>
      {/* slider action button */}
      {/* Card slider */}
      <Slider
        {...settings}
        ref={slickRef}
        className={`sm:block hidden mt-3 md:mt-0 ${
          currentCard === "PHYSICAL" ? "physical-card" : "virtual-card"
        } ${currentCard === "VIRTUAL" ? "virtual-card" : "physical-card"} ${
          isLoading ? "pointer-events-none" : ""
        }`}
      >
        <div>
          <div className="w-[324px] h-[200px] sm:w-[400px] sm:h-[240px] sm:mx-auto relative">
            {!isCardFreeze.PHYSICAL && (
              <CardShape
                className={cn(
                  "w-full h-full",
                  userCardDetails.find((obj: any) => obj.type === "PHYSICAL")
                    ? "fill-primary"
                    : "fill-white/10 backdrop-blur-[20px]"
                )}
              />
            )}
            {isCardFreeze.PHYSICAL && (
              <Image
                src={"/images/physical_Frozen.png"}
                height={100}
                width={200}
                alt="freeze"
                className="w-full h-full sm:w-[400px] sm:h-[240px] backdrop-blur-[20px]"
              />
            )}
            <p className="text-24 font-500 leading-7 text-white absolute top-5 left-5">
              Physical
            </p>
            {userCardDetails.find((obj: any) => obj.type === "PHYSICAL") ? (
              <Image
                src={
                  AssetImages[
                    userCardDetails.find((obj: any) => obj.type === "PHYSICAL")
                      ?.linkedAccountCurrency
                  ]
                }
                height={100}
                width={200}
                alt="visa"
                className="w-10 h-10 absolute top-0 right-0"
              />
            ) : (
              <div className="flex justify-center items-center h-10 w-10 bg-white/15 rounded-full text-white absolute top-0 right-0">
                <UilCreditCard className="h-4 w-4" />
              </div>
            )}
            {userCardDetails.find((obj: any) => obj.type === "PHYSICAL") ? (
              <>
                <p
                  className={cn(
                    "text-16 font-500 leading-5 text-white align-middle absolute bottom-5 left-5 flex gap-1",
                    isCardFreeze.PHYSICAL ? "blur-sm" : ""
                  )}
                >
                  {userCardDetails
                    .find((obj: any) => obj.type === "PHYSICAL")
                    ?.maskedCardNumber?.slice(-8) || (
                    <>
                      <IconDots className="text-white h-5 w-5" fill="#FFF" />{" "}
                      <IconDots className="text-white h-5 w-5" fill="#FFF" />{" "}
                    </>
                  )}
                </p>
                <Image
                  src={"/images/svg/visa.svg"}
                  height={100}
                  width={200}
                  alt="visa"
                  className={cn(
                    "w-11 h-3.5 absolute bottom-5 right-5",
                    isCardFreeze.PHYSICAL ? "blur-sm" : ""
                  )}
                />
                {currentCardDetails?.status === "DISPATCHED" && (
                  <div className="w-full top-0 h-full flex justify-center items-center absolute ">
                    <Button
                      className="px-4 py-3 text-14 font-700 leading-4 text-white bg-white/15"
                      onClick={() => {
                        setHandleModal(ACTIVATE_CARD_MODAL);
                      }}
                    >
                      Activate
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full top-0 h-full flex justify-center items-center absolute ">
                <Button
                  className="px-4 py-3 text-14 font-700 leading-4 text-white"
                  onClick={() => orderCard("Physical")}
                >
                  Order Physical Card
                </Button>
              </div>
            )}
            <div
              className="w-1/12 h-full -right-8 absolute top-0 cursor-pointer"
              onClick={() => {
                slickRef.current.slickGoTo(currentCard === "PHYSICAL" ? 1 : 0),
                  setCurrentCard(
                    currentCard === "PHYSICAL" ? "VIRTUAL" : "PHYSICAL"
                  );
                setIsLoading(true);

                setTimeout(() => {
                  setIsLoading(false);
                }, 500);
              }}
            />
          </div>
        </div>
        <div>
          <div className="w-[324px] h-[200px] sm:w-[400px] sm:h-[240px] sm:mx-auto relative">
            {!isCardFreeze.VIRTUAL &&
              userCardDetails.find((obj: any) => obj.type === "VIRTUAL") && (
                <CardShape
                  className="w-full h-full"
                  color1="#1F5EFF"
                  color2="#25CBFF"
                  color3="#45B4F3"
                />
              )}
            {isCardFreeze.VIRTUAL && (
              <Image
                src={"/images/virtual_Frozen.png"}
                height={100}
                width={200}
                alt="freeze"
                className="w-full h-full sm:w-[400px] sm:h-[240px] backdrop-blur-[20px]"
              />
            )}
            {!userCardDetails.find((obj: any) => obj.type === "VIRTUAL") &&
              !isCardFreeze.VIRTUAL && (
                <CardShape
                  className={cn(
                    "w-full h-full",
                    userCardDetails.find((obj: any) => obj.type === "VIRTUAL")
                      ? ""
                      : "fill-white/10 backdrop-blur-[20px]"
                  )}
                />
              )}
            <p className="text-24 font-500 leading-7 text-white absolute top-5 left-5">
              Virtual
            </p>

            {userCardDetails.find((obj: any) => obj.type === "VIRTUAL") ? (
              <>
                <p
                  className={cn(
                    "text-16 font-500 leading-5 text-white align-middle absolute bottom-5 left-5 flex gap-1",
                    isCardFreeze.VIRTUAL ? "blur-sm" : ""
                  )}
                >
                  {userCardDetails
                    .find((obj: any) => obj.type === "VIRTUAL")
                    ?.maskedCardNumber?.slice(-8) || (
                    <>
                      <IconDots className="text-white h-5 w-5" fill="#FFF" />{" "}
                      <IconDots className="text-white h-5 w-5" fill="#FFF" />{" "}
                    </>
                  )}
                </p>
                <Image
                  src={"/images/svg/visa.svg"}
                  height={100}
                  width={200}
                  alt="visa"
                  className={cn(
                    "w-11 h-3.5 absolute bottom-5 right-5",
                    isCardFreeze.VIRTUAL ? "blur-sm" : ""
                  )}
                />
                <Image
                  src={
                    AssetImages[
                      userCardDetails.find((obj: any) => obj.type === "VIRTUAL")
                        ?.linkedAccountCurrency
                    ]
                  }
                  height={100}
                  width={200}
                  alt="visa"
                  className="w-10 h-10 absolute top-0 right-0"
                />
              </>
            ) : (
              <>
                <div className="w-full top-0 h-full flex justify-center items-center absolute ">
                  <Button
                    className="px-4 py-3 text-14 font-700 leading-4 text-white"
                    onClick={() => orderCard("Virtual")}
                  >
                    Order Virtual Card
                  </Button>
                </div>
                <div className="flex justify-center items-center h-10 w-10 bg-white/15 rounded-full text-white absolute top-0 right-0">
                  <UilBoltAlt className="h-4 w-4" />
                </div>
              </>
            )}
            <div
              className="w-1/12 h-full -left-9 absolute top-0 cursor-pointer"
              onClick={() => {
                slickRef.current.slickGoTo(currentCard === "PHYSICAL" ? 1 : 0),
                  setCurrentCard(
                    currentCard === "PHYSICAL" ? "VIRTUAL" : "PHYSICAL"
                  );
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 500);
              }}
            />
          </div>
        </div>
      </Slider>
      {/* Card slider */}
      {/*  Responsive slider */}
      <div
        className="relative snap-x snap-mandatory flex sm:hidden gap-4 w-full overflow-auto remove-scrollbar scroll-smooth px-4 mt-6"
        id="slider"
        ref={sliderRef}
      >
        <div className="min-w-[324px] min-h-[200px] relative snap-center snap-always">
          {!isCardFreeze.PHYSICAL && (
            <div className=" w-[324px] h-[200px]">
              <SmallCardShape
                className={cn(
                  "w-full h-full",
                  currentCardDetails
                    ? "fill-primary"
                    : "fill-white/10 backdrop-blur-[20px]"
                )}
              />
            </div>
          )}
          {isCardFreeze.PHYSICAL && (
            <Image
              src={"/images/physical_Frozen_Mobile.png"}
              height={100}
              width={200}
              alt="freeze"
              className="w-[324px] h-[200px]"
            />
          )}
          <p className="text-24 font-500 leading-7 text-white absolute top-5 left-5">
            Physical
          </p>

          {userCardDetails.find((obj: any) => obj.type === "PHYSICAL") ? (
            <Image
              src={
                AssetImages[
                  userCardDetails.find((obj: any) => obj.type === "PHYSICAL")
                    ?.linkedAccountCurrency
                ]
              }
              height={100}
              width={200}
              alt="visa"
              className="w-10 h-10 absolute top-0 right-0"
            />
          ) : (
            <div className="flex justify-center items-center h-10 w-10 bg-white/15 rounded-full text-white absolute top-0 right-0">
              <UilCreditCard className="h-4 w-4" />
            </div>
          )}

          {currentCardDetails ? (
            <>
              <p
                className={cn(
                  "text-16 font-500 leading-5 text-white align-middle absolute bottom-5 left-5 flex gap-1",
                  isCardFreeze.PHYSICAL ? "blur-sm" : ""
                )}
              >
                {userCardDetails
                  .find((obj: any) => obj.type === "VIRTUAL")
                  ?.maskedCardNumber?.slice(-8) || (
                  <>
                    <IconDots className="text-white h-5 w-5" fill="#FFF" />{" "}
                    <IconDots className="text-white h-5 w-5" fill="#FFF" />{" "}
                  </>
                )}
              </p>
              <Image
                src={"/images/svg/visa.svg"}
                height={100}
                width={200}
                alt="visa"
                className={cn(
                  "w-11 h-3.5 absolute bottom-5 right-5",
                  isCardFreeze.PHYSICAL ? "blur-sm" : ""
                )}
              />
              {userCardDetails.find(
                (obj: any) => obj.type === currentCard?.toUpperCase()
              )?.status === "DISPATCHED" && (
                <div className="w-full top-0 h-full flex justify-center items-center absolute ">
                  <Button
                    className="px-4 py-3 text-14 font-700 leading-4 text-white bg-white/15"
                    onClick={() => {
                      setHandleModal(ACTIVATE_CARD_MODAL);
                    }}
                  >
                    Activate
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="w-full top-0 h-full flex justify-center items-center absolute ">
              <Button
                className="px-4 py-3 text-14 font-700 leading-4 text-white"
                onClick={() => orderCard("Physical")}
              >
                Order Physical Card
              </Button>
            </div>
          )}
        </div>
        <div className="min-w-[324px] min-h-[200px] relative snap-center snap-always">
          {!isCardFreeze.VIRTUAL && currentCardDetails && (
            <div className="w-[324px] h-[200px]">
              <SmallCardShape
                className="w-full h-full"
                color1="#1F5EFF"
                // color2="#25CBFF"
                color3="#45B4F3"
              />
            </div>
          )}
          {!currentCardDetails && (
            <SmallCardShape
              className={cn(
                "w-full h-full",
                userCardDetails.find(
                  (obj: any) => obj.type === currentCard?.toUpperCase()
                )
                  ? ""
                  : "fill-white/15 backdrop-blur-[20px]"
              )}
            />
          )}
          {isCardFreeze.VIRTUAL && (
            <Image
              src={"/images/virtual_Frozen_Mobile.png"}
              height={100}
              width={200}
              alt="freeze"
              className="w-[324px] h-[200px] absolute"
            />
          )}
          <p className="text-24 font-500 leading-7 text-white absolute top-5 left-5">
            Virtual
          </p>
          {currentCardDetails ? (
            <>
              <p
                className={cn(
                  "text-16 font-500 leading-5 text-white align-middle absolute bottom-5 left-5 flex gap-1",
                  isCardFreeze.VIRTUAL ? "blur-sm" : ""
                )}
              >
                {userCardDetails
                  .find((obj: any) => obj.type === "VIRTUAL")
                  ?.maskedCardNumber?.slice(-8) || (
                  <>
                    <IconDots className="text-white h-5 w-5" fill="#FFF" />{" "}
                    <IconDots className="text-white h-5 w-5" fill="#FFF" />{" "}
                  </>
                )}
              </p>
              <Image
                src={"/images/svg/visa.svg"}
                height={100}
                width={200}
                alt="visa"
                className={cn(
                  "w-11 h-3.5 absolute bottom-5 right-5",
                  isCardFreeze.VIRTUAL ? "blur-sm" : ""
                )}
              />
              <Image
                src={
                  AssetImages[
                    userCardDetails.find((obj: any) => obj.type === "VIRTUAL")
                      ?.linkedAccountCurrency
                  ]
                }
                height={100}
                width={200}
                alt="visa"
                className="w-10 h-10 absolute top-0 right-0"
              />
            </>
          ) : (
            <>
              <div className="w-full top-0 h-full flex justify-center items-center absolute ">
                <Button
                  className="px-4 py-3 text-14 font-700 leading-4 text-white"
                  onClick={() => orderCard("Virtual")}
                >
                  Order Virtual Card
                </Button>
              </div>
              <div className="flex justify-center items-center h-10 w-10 bg-white/15 rounded-full text-white absolute top-0 right-0">
                <UilBoltAlt className="h-4 w-4" />
              </div>
            </>
          )}
        </div>
      </div>
      {/*  Responsive slider */}
    </>
  );
};

export default CardSliderSection;
