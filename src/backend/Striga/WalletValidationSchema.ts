import * as yup from "yup";

export const getWalletByIdSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  walletId: yup.string().required("walletId is required"),
});

export const getWalletsByUserSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  startDate: yup.number().required("startDate is required"),
  endDate: yup.number().required("endDate is required"),
  page: yup.number().required("Page number is required"),
});

export const getTransactionsOfAccountByUserSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  accountId: yup.string().required("accountId is required"),
  startDate: yup.number().required("startDate is required"),
  endDate: yup.number().required("endDate is required"),
  page: yup.number().required("Page number is required"),
});

export const getAccountDetailsSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  accountId: yup.string().required("accountId is required"),
});

export const withdrawValidationSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  sourceAccountId: yup.string().required("sourceAccountId is required"),
  amount: yup.string().required("amount is required"),
  destination: yup.object().shape({
    iban: yup.string().required("IBAN is required"),
    bic: yup.string().required("BIC is required"),
  }),
});

export const otpVerificationValidationSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  challengeId: yup.string().required("challengeId is required"),
  verificationCode: yup.string().required("verificationCode is required"),
  ip: yup.string().required("IP is required"),
});

export const resendOtpValidationSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  challengeId: yup.string().required("challengeId is required"),
});

export const whitelistDestinationAddressValidationSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  address: yup.string().required("address is required"),
  currency: yup.string().required("currency is required"),
  network: yup.string().required("network is required"),
});
export const whitelistDestinationAddressListValidationSchema = yup
  .object()
  .shape({
    userId: yup.string().required("userId is required"),
  });

export const WithdrawalFeeEstimateValidationSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  sourceAccountId: yup.string().required("sourceAccountId is required"),
  whitelistedAddressId: yup.string().required("currency is required"),
  amount: yup.string().required("amount is required"),
});
export const OnChainWithdrawalValidationSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  sourceAccountId: yup.string().required("sourceAccountId is required"),
  whitelistedAddressId: yup.string().required("currency is required"),
  amount: yup.string().required("amount is required"),
});

const schemaMap: Record<string, yup.ObjectSchema<any>> = {
  "/wallets/get": getWalletByIdSchema,
  "/wallets/get/all": getWalletsByUserSchema,
  "/wallets/get/account/statement": getTransactionsOfAccountByUserSchema,
  "/wallets/account/enrich": getAccountDetailsSchema,
  "/wallets/get/account": getAccountDetailsSchema,
  "/wallets/send/initiate/bank": withdrawValidationSchema,
  "/wallets/transaction/confirm": otpVerificationValidationSchema,
  "/wallets/transaction/resend-otp": resendOtpValidationSchema,
  "/wallets/whitelist-address": whitelistDestinationAddressValidationSchema,
  "/wallets/get/whitelisted-addresses":
    whitelistDestinationAddressListValidationSchema,
  "/wallets/send/initiate/onchain/fee-estimate":
    WithdrawalFeeEstimateValidationSchema,
  "/wallets/send/initiate/onchain": OnChainWithdrawalValidationSchema,
};

export const getWalletValidationSchema = (
  endpoint: string
): yup.ObjectSchema<any> | null => {
  return schemaMap[endpoint] || null;
};
