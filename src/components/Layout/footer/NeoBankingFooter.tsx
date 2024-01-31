'use client';
import { useFooter } from '@/components/Layout/useFooter';
import CustomToolTip from '@/components/UI/Tooltip';
import IconCoinStacked from '@/components/icons/IconCoinStacked';
import { IconSwap } from '@/components/icons/IconSwap';
import IconTopUp from '@/components/icons/IconTopUp';
import IconTransfer from '@/components/icons/IconTransfer';
import {
  EXCHANGE_CURRENCY_MODAL,
  FOOTER_MENU_HUB,
  RECEIVE_CURRENCY_MODAL,
  SEND_CURRENCY_MODAL
} from '@/constants';
import { UilEstate } from '@/icons';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { cn } from '@/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Direction = 'up' | 'down';

export const NeoBankingFooter = () => {
  const [scrollDirection, setScrollDirection] = useState<Direction>('up');
  const { modalOpen, isFooterModal } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { MODAL_WITH_NO_FOOTER_IN_RESPONSIVE, MODALS_WITH_NO_FOOTER } =
    useFooter();

  useEffect(() => {
    let lastScrollY = document.documentElement.scrollTop;

    const updateScrollDirection = () => {
      const scrollY = document.documentElement.scrollTop;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 1 || scrollY - lastScrollY < -1)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  // scroll removed while modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('!m-0');
      document.body.classList.add('!overflow-y-auto');
    }
  }, [modalOpen]);

  return (
    <>
      {!isFooterModal && (
        <div
          className={cn(
            'fixed sm:pb-6 pb-0 pt-1 left-0 right-0 transition-all duration-200 sm:max-w-[368px] mx-auto flex justify-center items-center gap-x-2 bottom-0 z-[60]',
            MODAL_WITH_NO_FOOTER_IN_RESPONSIVE.includes(modalOpen) &&
              'md:flex hidden',
            MODALS_WITH_NO_FOOTER.includes(modalOpen) && '!hidden'
          )}
        >
          <div
            className={cn(
              'flex justify-center items-center gap-x-2 bg-gray-250/50 dark:bg-gray-250/10 rounded-3xl p-2 backdrop-blur-[10px] h-[68px] mb-5 sm:mb-0',
              modalOpen.length > 0 && 'shadow-lg'
            )}
          >
            <CustomToolTip content={'Menu'}>
              <div
                className={cn(
                  'bg-white rounded-3xl sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0',
                  modalOpen === FOOTER_MENU_HUB && 'bg-blue-300'
                )}
                onClick={() => setHandleModal(FOOTER_MENU_HUB)}
              >
                <IconCoinStacked
                  className={cn(
                    'w-6 h-6 text-blue-300',
                    modalOpen === FOOTER_MENU_HUB && 'text-white'
                  )}
                  strokeWidth={1.5}
                />
              </div>
            </CustomToolTip>
            <CustomToolTip content={'Home'}>
              <Link
                href="/"
                className="rounded-3xl bg-primary dark:bg-white/10 sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0"
              >
                <UilEstate className="h-6 w-6 text-white" />
              </Link>
            </CustomToolTip>
          </div>
          <div
            className={cn(
              'flex justify-center items-center gap-x-2 bg-gray-250/50 dark:bg-gray-250/10 rounded-3xl p-2 backdrop-blur-[10px] h-[68px] mb-5 sm:mb-0',
              modalOpen.length > 0 && 'shadow-lg'
            )}
          >
            {/* <CustomToolTip content={"Cards"} className="pointer-events-none">
              <div
                className={cn(
                  "rounded-3xl sm:w-[52px] sm:h-[52px] w-11 h-11 flex bg-white/20 justify-center items-center !p-0 pointer-events-none hover:bg-white"
                  // modalOpen === CRYPTO_DEPOSIT_MODAL && "bg-blue-300 "
                )}
                // onClick={() => setHandleModal(CRYPTO_DEPOSIT_MODAL)}
              >
                <UilCardAtm
                  className={cn(
                    "w-6 h-6 text-blue-300 opacity-50"
                    // modalOpen === CRYPTO_DEPOSIT_MODAL && "text-white"
                  )}
                />
              </div>
            </CustomToolTip> */}
            <CustomToolTip content={'Exchange'}>
              <div
                className={cn(
                  'rounded-3xl sm:w-[52px] sm:h-[52px] w-11 h-11 bg-white/20 dark:bg-white/10 flex justify-center items-center cursor-pointer !p-0 hover:bg-white dark:hover:bg-white/30',
                  modalOpen === EXCHANGE_CURRENCY_MODAL && 'bg-blue-300'
                )}
                // onClick={() => setHandleModal(EXCHANGE_CURRENCY_MODAL)}
              >
                <IconSwap
                  className={cn(
                    'w-6 h-6 text-blue-300 dark:text-white',
                    modalOpen === EXCHANGE_CURRENCY_MODAL && 'text-white'
                  )}
                />
              </div>
            </CustomToolTip>
            <CustomToolTip content={'Send'}>
              <div
                className={cn(
                  'rounded-3xl sm:w-[52px] sm:h-[52px] w-11 h-11 bg-white/20 dark:bg-white/10 flex justify-center items-center cursor-pointer !p-0 hover:bg-white dark:hover:bg-white/30',
                  modalOpen === SEND_CURRENCY_MODAL && 'bg-blue-300'
                )}
                onClick={() => setHandleModal(SEND_CURRENCY_MODAL)}
              >
                <IconTransfer
                  className={cn(
                    'w-6 h-6 text-blue-300 dark:text-white',
                    modalOpen === SEND_CURRENCY_MODAL && 'text-white'
                  )}
                  strokeWidth={2}
                />
              </div>
            </CustomToolTip>
            <CustomToolTip content={'Receive'}>
              <div
                className={cn(
                  'rounded-3xl sm:w-[52px] sm:h-[52px] w-11 h-11 bg-white/20 dark:bg-white/10 flex justify-center items-center cursor-pointer !p-0 hover:bg-white dark:hover:bg-white/30',
                  modalOpen === RECEIVE_CURRENCY_MODAL && 'bg-blue-300'
                )}
                onClick={() => setHandleModal(RECEIVE_CURRENCY_MODAL)}
              >
                <IconTopUp
                  className={cn(
                    'w-6 h-6 text-blue-300 dark:text-white',
                    modalOpen === RECEIVE_CURRENCY_MODAL && 'text-white'
                  )}
                  strokeWidth={2}
                />
              </div>
            </CustomToolTip>
          </div>
        </div>
      )}
    </>
  );
};
