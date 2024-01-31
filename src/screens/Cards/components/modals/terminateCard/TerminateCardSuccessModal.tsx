'use client';
import CustomModal from '@/components/CustomModal';
import ProcessingLoader from '@/components/Loaders/ProcessingLoader';
import { Button } from '@/components/UI/Button';
import { SUCCESSFULLY_TERMINATE_CARD_MODAL } from '@/constants';
import { UilCheck, UilTrashAlt } from '@/icons';
import { useGetCardsMutation } from '@/services/useStrigaCards';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { useUserDataStore } from '@/store/userDataStore';
import { useEffect, useState } from 'react';

const TerminateCardSuccessModal = ({
  currentCard,
  confirmationMutation
}: {
  currentCard: string;
  confirmationMutation: any;
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [isLoading, setIsLoading] = useState(true);

  const { strigaUserData } = useUserDataStore();
  const getAllCards = useGetCardsMutation();
  const { userCardDetails } = useUserDataStore();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? SUCCESSFULLY_TERMINATE_CARD_MODAL : '');
  };
  const handleButtonClick = () => {
    setHandleModal('');
  };

  const currentCardDetail = userCardDetails.find(
    (val: any) => val.type === currentCard
  );

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

  return (
    <CustomModal
      open={modalOpen === SUCCESSFULLY_TERMINATE_CARD_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5"
    >
      <div className="flex gap-x-2 items-center">
        {!isLoading && (
          <span className="rounded-3xl p-3 flex justify-center items-center bg-success-200 text-white">
            <UilCheck className="h-4 w-4" />
          </span>
        )}

        <span className="rounded-3xl p-3 flex justify-center items-center bg-danger-100 ">
          <UilTrashAlt className="h-4 w-4 text-white" />
        </span>
        <div className="flex flex-col">
          <span className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
            Terminate Card
          </span>
          <span className="text-12 leading-4 font-500 text-gray-300 dark:text-white/30">
            {currentCard === 'PHYSICAL' ? 'Physical' : 'Virtual'}{' '}
            {currentCardDetail?.maskedCardNumber.substr(-7)}
          </span>
        </div>
      </div>
      {!isLoading ? (
        <>
          <div className="text-center mx-auto flex flex-col items-center ">
            <span className="text-16 font-500 text-success-200 mb-2 leading-5 mt-3">
              Your Card is Terminated
            </span>
            <span className="text-16 font-500 leading-5 text-gray-300 w-[270px] dark:text-white/30">
              For any queries or urgent assistance, please contact our support
              team
            </span>
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
          <div className="mx-auto text-center">
            <div className="mt-4 mb-8">
              <h3 className="text-24 leading-7 font-500 text-blue-300 dark:text-white">
                Terminating Card
              </h3>
              <p className="text-gray-300 dark:text-white/30  leading-5 font-500 text-16 mt-2">
                It will take just a moment{' '}
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

export default TerminateCardSuccessModal;
