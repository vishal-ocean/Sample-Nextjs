"use client";
import {
  ADD_NEW_CARD_MODAL,
  BUY_CRYPTO_LISTING,
  BUY_MODAL,
  BUY_SWAP_SUCCESS_MODAL,
  CONFIRM_BUY_CRYPTO_MODAL,
  CONFIRM_SELL_CRYPTO_MODAL,
  CONFIRM_TRANSFER_CRYPTO_MODAL,
  CRYPTO_DEPOSIT_MODAL,
  CRYPTO_SELL_LISTING_MODAL,
  CRYPTO_WITHDRAWAL_OTP_VERIFICATION_MODAL,
  EXCHANGE_CURRENCY_MODAL,
  FOOTER_MENU_HUB,
  FOOTER_OPTION_MENU,
  PREVIEW_EXCHANGE_CURRENCY_MODAL,
  RECEIVE_CURRENCY_MODAL,
  SELL_MODAL,
  SELL_SWAP_SUCCESS_MODAL,
  SEND_CURRENCY_MODAL,
  STRIGA_OTP_MODAL,
  SUCCESSFULLY_EXCHANGE_CURRENCY_MODAL,
  SUCCESSFULLY_SEND_MODAL,
  SWAP_CONFIRMATION_MODAL,
  SWAP_CRYPTO_MODAL,
  SWAP_SUCCESS_MODAL,
  TRANSFER_CRYPTO_MODAL,
  TRANSFER_SWAP_SUCCESS_MODAL,
  YIELD_CONFIRM_DEPOSIT_MODAL,
  YIELD_CONFIRM_WITHDRAW_MODAL,
  YIELD_CRYPTO_DEPOSIT_SUCCESS_MODAL,
  YIELD_CRYPTO_WITHDRAW_SUCCESS_MODAL,
} from "@/constants";
import { useSwap, useWithdraw } from "@/services/useCrypto";
import { useHandleModalStore } from "@/store/handleModal";
import dynamic from "next/dynamic";
const StrigaOtpVerification = dynamic(
  () => import("@/screens/neo-banking/components/Modal/StrigaOtpVerification")
);

// lazy load modal component
const CryptoWithdrawalOTPVerificationModal = dynamic(
  () => import("@/screens/Transfer/CryptoWithdrawalOTPVerificationModal")
);
const AddNewCard = dynamic(() => import("@/screens/Buy/AddNewCard"));
const BuyCrypto = dynamic(() => import("@/screens/Buy/Buy"));
const BuyCryptoListing = dynamic(
  () => import("@/screens/Buy/BuyCryptoListing")
);
const BuySuccessModal = dynamic(() => import("@/screens/Buy/BuySuccessModal"));
const ConfirmBuyCrypto = dynamic(
  () => import("@/screens/Buy/ConfirmBuyCrypto")
);
const CryptoDepositModal = dynamic(() => import("@/screens/CryptoDeposit"));
const MenuHub = dynamic(() => import("@/screens/MenuHub"));
const MenuOptions = dynamic(() => import("@/screens/MenuOptionModal"));
const ConfirmSellCrypto = dynamic(
  () => import("@/screens/Sell/ConfirmSellCrypto")
);
const SellCrypto = dynamic(() => import("@/screens/Sell/Sell"));
const SellCryptoListing = dynamic(
  () => import("@/screens/Sell/SellCryptoListing")
);
const SellSuccessModal = dynamic(
  () => import("@/screens/Sell/SellSuccessModal")
);
const SwapConfirmationModal = dynamic(
  () => import("@/screens/SwapModals/SwapConfirmationModal")
);
const SwapCryptoModal = dynamic(
  () => import("@/screens/SwapModals/SwapCryptoModal")
);
const SwapSuccessModal = dynamic(
  () => import("@/screens/SwapModals/SwapSuccessModal")
);
const ConfirmTransferCrypto = dynamic(
  () => import("@/screens/Transfer/ConfirmTransferCrypto")
);
const TransferCrypto = dynamic(
  () => import("@/screens/Transfer/TransferCrypto")
);
const TransferSuccessModal = dynamic(
  () => import("@/screens/Transfer/TransferSuccessModal")
);
const ExchangeCurrencyModal = dynamic(
  () => import("@/screens/neo-banking/components/Modal/ExchangeCurrencyModal")
);
const PreviewExchangeModal = dynamic(
  () => import("@/screens/neo-banking/components/Modal/PreviewExchangeModal")
);
const ReceiveCurrencyModal = dynamic(
  () => import("@/screens/neo-banking/components/Modal/ReceiveModal")
);
const SendCurrencyModal = dynamic(
  () => import("@/screens/neo-banking/components/Modal/SendModal")
);
const SuccessfullyExchangeCurrencyModal = dynamic(
  () =>
    import(
      "@/screens/neo-banking/components/Modal/SuccessfullyExchangeCurrencyModal"
    )
);
const SuccessfullySendModal = dynamic(
  () => import("@/screens/neo-banking/components/Modal/SuccessfullySendModal")
);

const ConfirmDepositModal = dynamic(
  () =>
    import(
      "@/screens/YieldFarming/PairPage/components/modals/ConfirmDepositModal"
    )
);
const ConfirmWithdrawModal = dynamic(
  () =>
    import(
      "@/screens/YieldFarming/PairPage/components/modals/ConfirmWithdrawModal"
    )
);
const SuccessDepositModal = dynamic(
  () =>
    import(
      "@/screens/YieldFarming/PairPage/components/modals/SuccessDepositModal"
    )
);

const SuccessWithdrawModal = dynamic(
  () =>
    import(
      "@/screens/YieldFarming/PairPage/components/modals/SuccessWithdrawModal"
    )
);

export const FooterModals = () => {
  const { modalOpen } = useHandleModalStore();
  const mutation = useWithdraw();
  const swapMutation = useSwap();

  return (
    <>
      {modalOpen === FOOTER_OPTION_MENU && <MenuOptions />}
      {modalOpen === SWAP_CRYPTO_MODAL && <SwapCryptoModal />}
      {modalOpen === SWAP_CONFIRMATION_MODAL && (
        <SwapConfirmationModal swapMutation={swapMutation} />
      )}
      {modalOpen === SWAP_SUCCESS_MODAL && (
        <SwapSuccessModal swapMutation={swapMutation} />
      )}
      {modalOpen === CRYPTO_DEPOSIT_MODAL && <CryptoDepositModal />}
      {modalOpen === TRANSFER_CRYPTO_MODAL && <TransferCrypto />}
      {modalOpen === CONFIRM_TRANSFER_CRYPTO_MODAL && (
        <ConfirmTransferCrypto withDrawMutation={mutation} />
      )}
      {modalOpen === YIELD_CONFIRM_DEPOSIT_MODAL && <ConfirmDepositModal />}
      {modalOpen === YIELD_CONFIRM_WITHDRAW_MODAL && <ConfirmWithdrawModal />}
      {modalOpen === YIELD_CRYPTO_DEPOSIT_SUCCESS_MODAL && (
        <SuccessDepositModal />
      )}
      {modalOpen === YIELD_CRYPTO_WITHDRAW_SUCCESS_MODAL && (
        <SuccessWithdrawModal />
      )}
      {modalOpen === TRANSFER_SWAP_SUCCESS_MODAL && (
        <TransferSuccessModal withDrawMutation={mutation} />
      )}
      {modalOpen === BUY_MODAL && <BuyCrypto />}
      {modalOpen === ADD_NEW_CARD_MODAL && <AddNewCard />}
      {modalOpen === CONFIRM_BUY_CRYPTO_MODAL && <ConfirmBuyCrypto />}
      {modalOpen === BUY_SWAP_SUCCESS_MODAL && <BuySuccessModal />}
      {modalOpen === BUY_CRYPTO_LISTING && <BuyCryptoListing />}
      {modalOpen === SELL_MODAL && <SellCrypto />}
      {modalOpen === CRYPTO_SELL_LISTING_MODAL && <SellCryptoListing />}
      {modalOpen === CONFIRM_SELL_CRYPTO_MODAL && <ConfirmSellCrypto />}
      {modalOpen === SELL_SWAP_SUCCESS_MODAL && <SellSuccessModal />}
      {modalOpen === FOOTER_MENU_HUB && <MenuHub />}
      {modalOpen === RECEIVE_CURRENCY_MODAL && <ReceiveCurrencyModal />}
      {modalOpen === SEND_CURRENCY_MODAL && <SendCurrencyModal />}
      {modalOpen === SUCCESSFULLY_SEND_MODAL && <SuccessfullySendModal />}
      {modalOpen === EXCHANGE_CURRENCY_MODAL && <ExchangeCurrencyModal />}
      {modalOpen === PREVIEW_EXCHANGE_CURRENCY_MODAL && (
        <PreviewExchangeModal />
      )}
      {modalOpen === SUCCESSFULLY_EXCHANGE_CURRENCY_MODAL && (
        <SuccessfullyExchangeCurrencyModal />
      )}
      {modalOpen === CRYPTO_WITHDRAWAL_OTP_VERIFICATION_MODAL && (
        <CryptoWithdrawalOTPVerificationModal />
      )}
      {modalOpen === STRIGA_OTP_MODAL && <StrigaOtpVerification />}
    </>
  );
};
