import { IconSwap } from '@/components/icons/IconSwap';
import IconTimeCoinDeposit from '@/components/icons/IconTimeCoinDeposit';
import IconTimeCoinWithdraw from '@/components/icons/IconTimeCoinWithdraw';
import {
  BUY_MODAL,
  CRYPTO_DEPOSIT_MODAL,
  SELL_MODAL,
  SWAP_CRYPTO_MODAL,
  TRANSFER_CRYPTO_MODAL
} from '@/constants';
import { UilMinus, UilPlus } from '@/icons';
export const useAssets = () => {
  const TRADE_DROPDOWN_ITEMS = [
    {
      name: 'Deposit',
      icon: (
        <IconTimeCoinDeposit
          strokeWidth={1.2}
          className="w-4 h-4 text-blue-300 dark:text-white"
        />
      ),
      modal: CRYPTO_DEPOSIT_MODAL,
      modalState: false,
      isDisabled: false
    },
    {
      name: 'Withdraw',
      icon: (
        <IconTimeCoinWithdraw
          strokeWidth={1.2}
          className="w-4 h-4 text-blue-300 dark:text-white"
        />
      ),
      modal: TRANSFER_CRYPTO_MODAL,
      modalState: false,
      isDisabled: false
    },

    {
      name: 'Swap',
      icon: <IconSwap className="w-4 h-4 text-blue-300 dark:text-white" />,
      modal: SWAP_CRYPTO_MODAL,
      modalState: true,
      isDisabled: false
    },
    {
      name: 'Buy',
      icon: <UilPlus className="w-4 h-4 text-blue-300 dark:text-white" />,
      modal: BUY_MODAL,
      modalState: true,
      isDisabled: true
    },
    {
      name: 'Sell',
      icon: <UilMinus className="w-4 h-4 text-blue-300 dark:text-white" />,
      modal: SELL_MODAL,
      isDisabled: true,
      modalState: true
    }
  ];
  return { TRADE_DROPDOWN_ITEMS };
};
