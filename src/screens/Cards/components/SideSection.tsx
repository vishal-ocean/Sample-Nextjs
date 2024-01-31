import CardSkeleton from '@/components/Loaders/CardSkeleton';
import { Button } from '@/components/UI/Button';
import IconGold from '@/components/icons/IconGold';
import { IconSlice } from '@/components/icons/IconSlice';
import { IconStar } from '@/components/icons/IconStar';
import { CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL } from '@/constants';
import { readableNumber } from '@/helper/readableNumber';
import { UilBolt, UilCreditCard } from '@/icons';
import { useGetCardsMutation } from '@/services/useStrigaCards';
import { useGetWalletsMutation } from '@/services/useStrigaWallet';
import { useCardAction } from '@/store/cardDetails';
import { useHandleModalAction } from '@/store/handleModal';
import { useUserDataStore } from '@/store/userDataStore';
import Image from 'next/image';
export const SideSection = ({ currentCard }: { currentCard: string }) => {
  const { userCardDetails, userWalletDetails } = useUserDataStore();
  const { setCardActionDetails } = useCardAction;
  const { setHandleModal } = useHandleModalAction;

  const { isLoading: cardsDataLoading } = useGetCardsMutation();
  const { isLoading: walletsDataLoading } = useGetWalletsMutation();

  return (
    <div className="h-max">
      {cardsDataLoading || walletsDataLoading ? (
        <div className="sm:mx-10 lg:mx-0 mx-3">
          <CardSkeleton cardClassName="w-full h-full  " cardType="large" />
        </div>
      ) : (
        <div className="rounded-[20px] bg-white p-5 mx-3 sm:mx-10 lg:mx-0 dark:bg-white/10">
          <span className="flex gap-2 text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
            <IconSlice className="h-4 w-4 text-blue-300 dark:text-white" />
            Total Balance
          </span>

          <p className="mt-20 text-40 font-500 leading-10 text-blue-300 dark:text-white">
            {`€${readableNumber(
              Number(
                userWalletDetails?.accounts?.[
                  userCardDetails.find((obj: any) => obj.type === currentCard)
                    ?.linkedAccountCurrency
                ]?.availableBalance?.amount
              ) / 100 || 0
            )}`}
          </p>

          <hr className="my-5 border-secondary dark:border-white/15" />
          <div>
            <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Cards
            </p>
            <div className="flex justify-between items-center mt-5">
              <span className="flex items-center gap-2 text-16 font-500 leading-5 text-blue-300 dark:text-white">
                <UilCreditCard className="h-4 w-4" />
                Physical
              </span>
              <p className="flex gap-2 text-16 font-500 leading-5 text-blue-300 dark:text-white">
                {userCardDetails.find((obj: any) => obj.type === 'PHYSICAL') ? (
                  ['DISPATCHED', 'CREATED']?.includes(
                    userCardDetails.find((obj: any) => obj.type === 'PHYSICAL')
                      ?.status
                  ) ? (
                    <span>On the way</span>
                  ) : userCardDetails.find(
                      (obj: any) => obj.type === 'PHYSICAL'
                    )?.status === 'BLOCKED' ? (
                    <span>Frozen</span>
                  ) : (
                    userCardDetails
                      .find((obj: any) => obj.type === 'PHYSICAL')
                      ?.maskedCardNumber?.slice(-8)
                  )
                ) : (
                  <span
                    className="underline cursor-pointer"
                    onClick={() => {
                      setHandleModal(CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL);
                      setCardActionDetails({
                        selectedCurrency: '',
                        selectedType: 'Physical',
                        password: '',
                        selectedDeliveryMethod: ''
                      });
                    }}
                  >
                    Order
                  </span>
                )}
              </p>
            </div>
            <div className="flex justify-between items-center mt-5">
              <span className="flex items-center gap-2 text-16 font-500 leading-5 text-blue-300 dark:text-white">
                <UilBolt className="h-4 w-4" />
                Virtual
              </span>
              <p className="flex gap-2 text-16 font-500 leading-5 text-blue-300 dark:text-white">
                {/* {userCardDetails
                  .find((obj: any) => obj.type === 'VIRTUAL')
                  ?.maskedCardNumber?.slice(-8) || ( */}

                {userCardDetails.find((obj: any) => obj.type === 'VIRTUAL') ? (
                  ['DISPATCHED', 'CREATED']?.includes(
                    userCardDetails.find((obj: any) => obj.type === 'VIRTUAL')
                      ?.status
                  ) ? (
                    <span>On the way</span>
                  ) : userCardDetails.find((obj: any) => obj.type === 'VIRTUAL')
                      ?.status === 'BLOCKED' ? (
                    <span>Frozen</span>
                  ) : (
                    userCardDetails
                      .find((obj: any) => obj.type === 'VIRTUAL')
                      ?.maskedCardNumber?.slice(-8)
                  )
                ) : (
                  <span
                    className="underline cursor-pointer"
                    onClick={() => {
                      setHandleModal(CREATE_VIRTUAL_OR_PHYSICAL_CARD_MODAL);
                      setCardActionDetails({
                        selectedCurrency: '',
                        selectedType: 'Virtual',
                        password: '',
                        selectedDeliveryMethod: ''
                      });
                    }}
                  >
                    Get Virtual Card
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mt-5 flex flex-row lg:flex-col gap-2 px-3 sm:px-10 lg:px-0 overflow-auto remove-scrollbar">
        <div className="relative rounded-[24px] min-w-[260px] w-1/2 sm:w-full">
          <Image
            src={'/images/wave.png'}
            width={1000}
            height={1000}
            sizes="100vh"
            alt=""
            className="w-full h-full rounded-[24px] absolute top-0 -z-10 block"
          />
          {/* <Image
            src={"/images/small-wave.png"}
            width={1000}
            height={1000}
            sizes="100vh"
            alt=""
            className="w-full h-full rounded-[24px] absolute top-0 -z-10 lg:hidden block"
          /> */}
          <div className="rounded-[24px] flex flex-col p-3 lg:justify-between h-full ">
            <div className="flex justify-between lg:justify-start items-center">
              <span className="lg:h-10 lg:w-10 h-8 w-8 bg-primary rounded-full flex justify-center items-center">
                <IconStar className="text-white h-5 w-5" />
              </span>
              <Button
                variant="secondary"
                className="text-14 font-700 px-4 py-3 w-fit block leading-4 bg-secondary/10 backdrop-blur-[20px] text-white/60 lg:hidden"
              >
                Coming Soon
              </Button>
            </div>
            <div className="mt-12 lg:mt-24 ml-3 mb-3 lg:ml-2 lg:mb-2">
              <p className="text-white text-24 font-500 leading-7 mb-2">
                WAVE Tier
              </p>
              <p className="text-white/60 text-16 font-500 whitespace-break-spaces leading-5 w-[88%]">
                Explore our staking options today and let your crypto work for
                you
              </p>
              <Button
                variant="secondary"
                className="text-14 font-700 px-4 py-3 mt-5 w-fit lg:block hidden leading-4 bg-secondary/10 backdrop-blur-[10px] text-white/60"
              >
                Coming Soon
              </Button>
            </div>
          </div>
        </div>
        <div className="lg:h-[188px] relative rounded-[24px] min-w-[260px] w-1/2 sm:w-full">
          <Image
            src={'/images/wealth-side-card.png'}
            width={1000}
            height={1000}
            sizes="100vh"
            alt=""
            className="w-full h-full block absolute top-0 -z-10 rounded-[24px]"
          />
          {/* <Image
            src={"/images/small-wealth.png"}
            width={1000}
            height={1000}
            sizes="100vh"
            alt=""
            className="w-full h-full rounded-[24px] absolute top-0 -z-10 lg:hidden block"
          /> */}
          <div className="flex flex-col justify-between p-3 rounded-[24px] top-0 h-full w-full">
            <div className="flex justify-between items-center ">
              <span className="h-10 w-10 overflow-hidden bg-secondary/10 relative backdrop-blur-[10px] bg-opacity-30 rounded-full flex justify-center items-center">
                <IconGold className="text-orange-700 h-5 w-5" />
                <span className="h-9 w-9 bg-orange-700 blur-lg absolute translate-y-5"></span>
              </span>

              <Button className="bg-secondary/10 text-14 backdrop-blur-[10px] w-fit text-white/60 px-4 py-3 font-700 rounded-3xl leading-4 pointer-events-none">
                Grow Your Wealth
              </Button>
            </div>
            <div className="mr-2 mb-2 w-2/3 lg:w-[57%] ml-auto lg:mt-9">
              <p className="text-16 text-white font-700 leading-5 w-11/12 lg:w-auto">
                Access a wide range of opportunities
              </p>
              <p className="text-12 text-gray-300 mt-2 whitespace-break-spaces leading-4 font-500">
                From crypto-related to sports funds and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
