'use client';
import { useFooter } from '@/components/Layout/useFooter';
import CustomToolTip from '@/components/UI/Tooltip';
import IconBank from '@/components/icons/IconBank';
import IconCoinStacked from '@/components/icons/IconCoinStacked';
import IconEthereum from '@/components/icons/IconEthereum';
import IconGold from '@/components/icons/IconGold';
import IconTimeCoinDeposit from '@/components/icons/IconTimeCoinDeposit';
import IconTimeCoinWithdraw from '@/components/icons/IconTimeCoinWithdraw';
import {
  CRYPTO_DEPOSIT_MODAL,
  FOOTER_MENU_HUB,
  TRANSFER_CRYPTO_MODAL
} from '@/constants';
import { UilCardAtm } from '@/icons';
import { useWithdraw } from '@/services/useCrypto';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import { cn } from '@/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Direction = 'up' | 'down';

export const DashboardFooter = () => {
  const [scrollDirection, setScrollDirection] = useState<Direction>('up');
  const { modalOpen, isFooterModal } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const {
    MODAL_WITH_NO_FOOTER_IN_RESPONSIVE,
    TRANSFER_MODALS,
    MODALS_WITH_NO_FOOTER
  } = useFooter();
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
  const mutation = useWithdraw();
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
                  modalOpen === FOOTER_MENU_HUB && 'bg-blue-300 dark:bg-white'
                )}
                onClick={() => setHandleModal(FOOTER_MENU_HUB)}
              >
                <IconCoinStacked
                  className={cn(
                    'w-6 h-6 text-blue-300 ',
                    modalOpen === FOOTER_MENU_HUB &&
                      'text-white dark:text-blue-300'
                  )}
                  strokeWidth={1.5}
                />
              </div>
            </CustomToolTip>
            <CustomToolTip content={'Neobanking'}>
              <Link
                href={'/neo-banking'}
                className="rounded-3xl bg-primary sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0"
              >
                <IconBank
                  strokeWidth={1.5}
                  className="h-6 w-6 text-white opacity-80"
                />
              </Link>
            </CustomToolTip>
            <CustomToolTip content={'Crypto'}>
              <Link
                href={'/crypto'}
                className="rounded-3xl bg-primary sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0"
              >
                <IconEthereum
                  className="h-6 w-6 text-white"
                  strokeWidth={1.5}
                />
              </Link>
            </CustomToolTip>
            <CustomToolTip content={'Wealth'}>
              <Link
                href={'/wealth'}
                className="rounded-3xl bg-primary sm:w-[52px] w-11 h-11 sm:h-[52px] flex justify-center items-center cursor-pointer !p-0"
              >
                <IconGold strokeWidth={1.2} className="h-6 w-6 text-white" />
              </Link>
            </CustomToolTip>
            <CustomToolTip content={'Cards'} className="hidden">
              <div
                className={cn(
                  'rounded-3xl sm:w-[52px] sm:h-[52px] w-11 h-11 flex lg:hidden bg-primary justify-center items-center pointer-events-none !p-0'
                  // modalOpen === CRYPTO_DEPOSIT_MODAL && "bg-blue-300 dark:bg-white "
                )}
                // onClick={() => setHandleModal(CRYPTO_DEPOSIT_MODAL)}
              >
                <UilCardAtm
                  className={cn(
                    'w-6 h-6 text-white opacity-50'
                    // modalOpen === CRYPTO_DEPOSIT_MODAL && "text-white dark:text-blue-300"
                  )}
                />
              </div>
            </CustomToolTip>
          </div>
          <div
            className={cn(
              'hidden sm:flex justify-center items-center gap-x-2 bg-gray-250/50 dark:bg-gray-250/10  rounded-3xl p-2 backdrop-blur-[10px] h-[68px] mb-5 sm:mb-0',
              modalOpen.length > 0 && 'shadow-lg'
            )}
          >
            <CustomToolTip content={'Cards'} className="pointer-events-none">
              <div
                className={cn(
                  'rounded-3xl sm:w-[52px] sm:h-[52px] w-11 h-11 flex bg-white/20 dark:bg-white/10 justify-center items-center pointer-events-none !p-0 hover:bg-white dark:hover:bg-white/30'
                  // modalOpen === CRYPTO_DEPOSIT_MODAL && "bg-blue-300 dark:bg-white "
                )}
                // onClick={() => setHandleModal(CRYPTO_DEPOSIT_MODAL)}
              >
                <UilCardAtm
                  className={cn(
                    'w-6 h-6 text-blue-300 dark:text-white  opacity-40'
                    // modalOpen === CRYPTO_DEPOSIT_MODAL && "text-white dark:text-blue-300"
                  )}
                />
              </div>
            </CustomToolTip>
            <CustomToolTip content={'Withdrawal'}>
              <div
                className={cn(
                  'rounded-3xl sm:w-[52px] sm:h-[52px] w-11 h-11 bg-white/20 dark:bg-white/10 flex justify-center items-center cursor-pointer !p-0 hover:bg-white dark:hover:bg-white/30',
                  TRANSFER_MODALS.includes(modalOpen) &&
                    'bg-blue-300 dark:bg-white'
                )}
                onClick={() => setHandleModal(TRANSFER_CRYPTO_MODAL)}
              >
                <IconTimeCoinWithdraw
                  className={cn(
                    'w-6 h-6 text-blue-300 dark:text-white ',
                    TRANSFER_MODALS.includes(modalOpen) &&
                      'text-white dark:text-blue-300'
                  )}
                  strokeWidth={1.2}
                />
              </div>
            </CustomToolTip>
            <CustomToolTip content={'Deposit'}>
              <div
                className={cn(
                  'rounded-3xl sm:w-[52px] sm:h-[52px] w-11 h-11 bg-white/20 dark:bg-white/10 flex justify-center items-center cursor-pointer !p-0 hover:bg-white dark:hover:bg-white/30',
                  modalOpen === CRYPTO_DEPOSIT_MODAL &&
                    'bg-blue-300 dark:bg-white '
                )}
                onClick={() => setHandleModal(CRYPTO_DEPOSIT_MODAL)}
              >
                <IconTimeCoinDeposit
                  className={cn(
                    'w-6 h-6 text-blue-300 dark:text-white ',
                    modalOpen === CRYPTO_DEPOSIT_MODAL &&
                      'text-white dark:text-blue-300'
                  )}
                  strokeWidth={1.2}
                />
              </div>
            </CustomToolTip>
          </div>
        </div>
      )}
    </>
  );
};
