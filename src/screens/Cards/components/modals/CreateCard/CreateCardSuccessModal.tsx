'use client';
import CustomModal from '@/components/CustomModal';
import ProcessingLoader from '@/components/Loaders/ProcessingLoader';
import { Button } from '@/components/UI/Button';
import CustomToolTip from '@/components/UI/Tooltip';
import { IconDots } from '@/components/icons/IconDots';
import { CREATE_VIRTUAL_OR_PHYSICAL_CARD_SUCCESS_MODAL } from '@/constants';
import { AssetImages } from '@/constants/AssetsImages';
import { UilBoltAlt, UilCheck, UilCopy, UilCreditCard } from '@/icons';
import { useGetCardsMutation } from '@/services/useStrigaCards';
import { useCardStore } from '@/store/cardDetails';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useUserDataStore } from '@/store/userDataStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CreateCardSuccessModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [isLoading, setIsLoading] = useState(true);
  const { cardActionDetails, cardDetails } = useCardStore();
  const [isDataCopy, setIsDataCopy] = useState(false);
  const { strigaUserData } = useUserDataStore();
  const getAllCards = useGetCardsMutation();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CREATE_VIRTUAL_OR_PHYSICAL_CARD_SUCCESS_MODAL : '');
  };
  const handleButtonClick = () => {
    setHandleModal('');
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  });
  useEffect(() => {
    if (strigaUserData.strigaId) {
      getAllCards.mutate({
        userId: strigaUserData.strigaId,
        offset: 0,
        limit: 100
      });
    }
  }, [strigaUserData]);
  const trackingNumber = 'GM1234567890123456';
  return (
    <CustomModal
      open={modalOpen === CREATE_VIRTUAL_OR_PHYSICAL_CARD_SUCCESS_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5"
    >
      {!isLoading ? (
        <>
          <div className="flex gap-x-2 items-center">
            <span className="rounded-3xl p-3 flex justify-center items-center bg-success-200">
              <UilCheck className="text-white h-4 w-4" />
            </span>

            <span className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15">
              {cardActionDetails.selectedType === 'Physical' ? (
                <UilCreditCard className="h-4 w-4 text-blue-300 dark:text-white" />
              ) : (
                <UilBoltAlt className="h-4 w-4 text-blue-300 dark:text-white" />
              )}
            </span>
            <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
              {`${
                cardActionDetails.selectedType === 'Physical'
                  ? 'Physical'
                  : 'Virtual'
              } Card`}
            </span>
          </div>
          <div className="text-center mx-auto flex flex-col items-center ">
            <div className="relative mt-3 sm:mt-0">
              <Image
                width={268}
                height={160}
                src={`/images/small-${
                  cardActionDetails.selectedType === 'Physical'
                    ? 'physical'
                    : 'virtual'
                }-card.png`}
                alt="image"
              />
              <span className="absolute top-5 left-5 text-16 leading-5 font-500 text-white">
                {cardActionDetails.selectedType === 'Physical'
                  ? 'Physical'
                  : 'Virtual'}
              </span>
              <Image
                height={40}
                width={40}
                src={AssetImages[cardActionDetails.selectedCurrency]}
                alt="token-image"
                className="top-0 right-0 absolute"
              />
              <div className="absolute flex flex-row items-center bottom-4 left-5 gap-[2px]">
                <IconDots className="h-6 w-6 fill-white" />
                {/* <span className="text-16 leading-5 font-500 ml-[6px] text-white">
                  4762
                </span> */}
              </div>
              <Image
                src={'/images/svg/visa.svg'}
                height={15}
                width={40}
                alt=""
                className="absolute bottom-5 right-5"
              />
            </div>
            <span className="text-16 font-500 text-success-200 mb-3 leading-5 mt-5">
              {cardActionDetails.selectedType === 'Physical'
                ? `Your card will arrive in ${
                    cardActionDetails.selectedDeliveryMethod === 'Tracked'
                      ? '3-6'
                      : cardActionDetails.selectedDeliveryMethod === 'Ordinary'
                      ? '9-10'
                      : '1-2'
                  } days`
                : 'Your Virtual Card is ready'}
            </span>
            {cardActionDetails.selectedType === 'Physical' ? (
              cardDetails?.status !== 'StandardLatvianPostMail' ? (
                <>
                  <p className="text-16 font-500 leading-5 text-gray-300 w-[270px]  dark:text-white/30">
                    Track it on DHL Global Mail&apos;s website with{' '}
                    <span className="text-blue-300">tracking number</span> below
                  </p>
                  <div className="flex items-center justify-between px-5 py-4 gap-4 bg-gray-100 dark:bg-white dark:bg-opacity-5 rounded-[16px] mt-3 w-full">
                    <p className="text-blue-300 dark:text-white text-16 font-500 leading-5 max-w-full sm:max-w-[90%] truncate py-1">
                      {cardDetails?.address.trackingNumber || 'N.A.'}
                    </p>
                    <CustomToolTip content={'Copied to clipboard'}>
                      <Button
                        variant={'outline'}
                        className="p-0"
                        onClick={() => {
                          navigator.clipboard
                            .writeText(
                              cardDetails?.address.trackingNumber || ''
                            )
                            .then(() => {
                              // Text was successfully copied to clipboard
                              toast.success('Copied to clipboard', {
                                toastId: 'tracking-number'
                              });
                              setIsDataCopy(true);
                            })
                            .catch((error) => {
                              // Handle the error if the text couldn't be copied
                              toast.error('Error in copied to clipboard', {
                                toastId: 'tracking-number'
                              });
                            });
                        }}
                      >
                        {isDataCopy ? (
                          <div className="h-6 w-6 bg-success-200 flex justify-center items-center rounded-full">
                            <UilCheck className="text-white w-4 h-4" />
                          </div>
                        ) : (
                          <UilCopy className="text-blue-300 dark:text-white w-6 h-6 cursor-pointer" />
                        )}
                      </Button>
                    </CustomToolTip>
                  </div>
                </>
              ) : (
                <p className="text-16 font-500 leading-5 text-gray-300 w-[270px]  dark:text-white/30 px-2">
                  Once Card is arrived you can activate it
                </p>
              )
            ) : (
              <span className="text-16 font-500 leading-5 text-gray-300 w-[270px] px-2 dark:text-white/30">
                One card to spend or withdraw money with the real exchange rate
              </span>
            )}
            <Button
              variant="secondary"
              className="mb-1 sm:mb-3 font-700 text-blue-300 mt-8 w-fit px-4 py-2 self-center leading-4 text-14 dark:bg-white dark:bg-opacity-15 dark:text-white"
              onClick={handleButtonClick}
            >
              OK
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-x-2 items-center">
            <span className="rounded-3xl p-3 flex justify-center items-center bg-secondary dark:bg-white/15">
              <UilBoltAlt className="h-4 w-4 text-blue-300 dark:text-white" />
            </span>
            <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
              {`${
                cardActionDetails.selectedType === 'Physical'
                  ? 'Physical'
                  : 'Virtual'
              } Card`}
            </span>
          </div>
          <div className="mx-auto text-center">
            <div className="mt-4 mb-8">
              <h3 className="text-24 leading-7 font-500 text-blue-300 dark:text-white">
                {` Creating ${
                  cardActionDetails.selectedType === 'Physical'
                    ? 'Physical'
                    : 'Virtual'
                } Card`}
              </h3>
              <p className="text-gray-300 dark:text-white/30  leading-5 font-500 text-16 mt-2">
                It will take just a moment
              </p>
            </div>
            <div className="mb-11 py-1">
              <ProcessingLoader />
            </div>
          </div>
        </>
      )}
    </CustomModal>
  );
};

export default CreateCardSuccessModal;
