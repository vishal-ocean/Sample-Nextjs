'use client';
import CustomModal from '@/components/CustomModal';
import { Button } from '@/components/UI/Button';
import { CHAT_CONVERSATIONS_LIST_MODAL, CHAT_MODAL } from '@/constants';
import {
  UilAngleRightB,
  UilCommentAltMessage,
  UilExchange,
  UilTimes,
  UilUser
} from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { cn } from '@/utils';
import { useState } from 'react';

const ChatConversationListModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [section, setSection] = useState('wealth');
  return (
    <CustomModal
      open={modalOpen === CHAT_CONVERSATIONS_LIST_MODAL}
      onOpenChange={(e: boolean) =>
        setHandleModal(e ? CHAT_CONVERSATIONS_LIST_MODAL : '')
      }
      withoutClose
      className="sm:max-w-[520px] w-full"
    >
      <div className="flex justify-between items-center">
        <span className="text-16 text-blue-300 font-500 leading-5">
          Messages
        </span>
        <Button
          variant="secondary"
          className="p-0 h-10 w-10 flex justify-center items-center"
          onClick={() => setHandleModal('')}
        >
          <UilTimes className="h-4 w-4 text-blue-300" />
        </Button>
      </div>
      <div className="mt-1 px-1">
        <div className="flex gap-x-1">
          <Button
            variant="secondary"
            className={cn(
              'px-4 py-0 h-10 font-700 text-14 leading-4',
              section === 'wealth' && 'bg-blue-300 text-white'
            )}
            onClick={() => setSection('wealth')}
          >
            Wealth
          </Button>
          <Button
            variant="secondary"
            className={cn(
              'px-4 py-0 h-10 font-700 text-14 leading-4',
              section === 'escrow' && 'bg-blue-300 text-white'
            )}
            onClick={() => setSection('escrow')}
          >
            Escrow
          </Button>
        </div>
        <div className="flex flex-col mt-8 max-h-[520px] overflow-y-auto">
          <div className="rounded-[24px] bg-gray-100 flex flex-col gap-y-4 px-5 py-[60px] justify-center items-center mb-5">
            <div className="flex justify-center items-center">
              <div className="w-10 h-10 bg-secondary rounded-full border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800 " />
              <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
              <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 flex justify-center items-center dark:bg-gray-600 dark:border-gray-800">
                <UilCommentAltMessage className="w-4 h-4 mx-auto text-gray-300 dark:text-gray-800" />
              </div>
            </div>
            <span className="text-16 text-gray-300 font-500 leading-5">
              You have no Messages yet
            </span>
          </div>
          {[...Array(10)].map((_, index) => (
            <>
              <div className="flex justify-between">
                <div className="flex gap-x-3">
                  <div className="h-10 w-10 flex justify-center items-center rounded-3xl bg-secondary">
                    <UilUser className="h-4 w-4 text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-16 text-blue-300 font-500 leading-5">
                      Moe Yan
                    </span>
                    <div className="flex gap-x-1">
                      <span className="text-12 text-gray-300 font-500 leading-4">
                        22,487 USDT
                      </span>
                      <UilExchange className="w-4 h-4 text-gray-300" />
                      <span className="text-12 text-gray-300 font-500 leading-4">
                        2 P79
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-3xl bg-danger-100" />
                  <Button
                    variant="outline"
                    className="p-0 h-10 w-10 flex justify-center items-center"
                    onClick={() => setHandleModal(CHAT_MODAL)}
                  >
                    <UilAngleRightB className="w-4 h-4 text-blue-300" />
                  </Button>
                </div>
              </div>
              {index !== [...Array(10)].length - 1 && (
                <hr className="h-1 border-secondary my-5" />
              )}
            </>
          ))}
        </div>
      </div>
    </CustomModal>
  );
};

export default ChatConversationListModal;
