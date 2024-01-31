import { Button } from '@/components/UI/Button';
import { Card, CardContent } from '@/components/UI/Card';
import { ADD_CARD_MODAL, REMOVE_CARD } from '@/constants';
import { UilCheck, UilPlus } from '@/icons';
import Image from 'next/image';

type PaymentProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
};
export const Payment = ({ modalOpen, setHandleModal }: PaymentProps) => {
  return (
    <>
      <Card className="flex flex-col justify-center items-center bg-gray-100 rounded-[28px] py-12 px-5 mt-6 ">
        <CardContent>
          <div className="mb-6 flex justify-center items-center">
            <div className="w-10 h-10 bg-secondary rounded-full dark:bg-gray-600 dark:border-gray-800" />
            <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-white dark:bg-gray-600 dark:border-gray-800" />
            <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-white flex justify-center items-center dark:bg-gray-600 dark:border-gray-800">
              <UilPlus className="w-4 h-4 mx-auto text-blue-300  dark:text-gray-800" />
            </div>
          </div>
          <div>
            <p className="text-16 font-500 leading-5 text-blue-300 text-center">
              Add New Card
            </p>
            <p className="text-12 font-500 leading-4 text-gray-300 text-center">
              Connect any Visa or Mastercard to make transactions
            </p>
          </div>
          <Button
            className="text-14 font-700 leading-4 text-white py-3 px-4 mx-auto flex mt-6 gap-2"
            onClick={() => setHandleModal(ADD_CARD_MODAL)}
          >
            <UilPlus className="w-4 h-4 mx-auto text-text-white" /> Add New Card
          </Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-6">
        <div
          className="px-11 py-[31px] grid bg-white rounded-2xl justify-items-center cursor-pointer"
          onClick={() => setHandleModal(ADD_CARD_MODAL)}
        >
          <div className="w-10 h-10 bg-secondary rounded-full flex justify-center items-center">
            <UilPlus className="w-4 h-4 mx-auto text-blue-300" />
          </div>
          <p className="text-16 font-500 leading-5 text-blue-300 mt-3">
            Add New Card
          </p>
        </div>
        {[...Array(3)].map((value, index) => (
          <div
            className="p-5 bg-white rounded-2xl grid content-between cursor-pointer"
            key={index}
            onClick={() => setHandleModal(REMOVE_CARD)}
          >
            <div className="flex justify-between items-center">
              {index % 2 == 0 ? (
                <Image
                  src="/images/svg/icon-MasterCard.svg"
                  width={26}
                  height={26}
                  alt="card"
                />
              ) : (
                <Image
                  src="/images/svg/icon-VISA.svg"
                  width={26}
                  height={26}
                  alt="card"
                />
              )}

              <div className="h-4 w-4 bg-success-200 flex justify-center items-center rounded-full">
                <UilCheck className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="mt-10">
              <p className="text-16 font-500 leading-5 text-blue-300">
                **** 4724
              </p>
              <p className="text-12 font-500 leading-4 text-gray-300 mt-0.5">
                Exp. **/**
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
