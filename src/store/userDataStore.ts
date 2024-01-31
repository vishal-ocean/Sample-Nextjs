import { create } from "zustand";

type UserDataStore = {
  idToken: string;
  strigaUserData: any;
  userWalletDetails: any;
  userCardDetails: any;
  withdrawalDetails: any;
  strigaUserFullDetails: any;
};
const useUserDataStore = create<UserDataStore>(() => ({
  idToken: "",
  strigaUserData: {},
  userWalletDetails: {},
  userCardDetails: [],
  withdrawalDetails: {},
  strigaUserFullDetails: {},
}));

const useUserDataAction = {
  setIdToken: (payload: string) => {
    useUserDataStore.setState(() => ({
      idToken: payload,
    }));
  },
  setStrigaUserData: (payload: any) => {
    useUserDataStore.setState(() => ({
      strigaUserData: payload,
    }));
  },
  setUserWalletDetails: (payload: any) => {
    useUserDataStore.setState(() => ({
      userWalletDetails: payload,
    }));
  },
  setWithdrawalDetails: (payload: any) => {
    useUserDataStore.setState(() => ({
      withdrawalDetails: payload,
    }));
  },

  setStrigaUserFullDetails: (payload: any) => {
    useUserDataStore.setState(() => ({
      strigaUserFullDetails: payload,
    }));
  },

  setUserCardsDetails: (payload: any) => {
    useUserDataStore.setState(() => ({
      userCardDetails: payload,
      // userCardDetails: [
      //   {
      //     name: "john smith",
      //     id: "104d76b0-b2ca-48d5-884c-373e47499f48",
      //     type: "PHYSICAL",
      //     maskedCardNumber: "474367**********",
      //     expiryData: "2025-11-30T23:59:59Z",
      //     status: "CREATED",
      //     address: {
      //       addressLine1: "Test address line 1",
      //       addressLine2: "Test address line 2",
      //       city: "Test_city",
      //       postalCode: "11030",
      //       country: "EST",
      //       dispatchMethod: "DHLExpress",
      //     },
      //     isEnrolledFor3dSecure: false,
      //     security: {
      //       contactlessEnabled: true,
      //       withdrawalEnabled: true,
      //       internetPurchaseEnabled: true,
      //       overallLimitsEnabled: true,
      //     },
      //     linkedAccountId: "36726c82440942be7349a4bb8c6e4ad8",
      //     parentWalletId: "3cd7d38b-8002-428b-9a68-06d6e2c4a0b1",
      //     linkedAccountCurrency: "EUR",
      //     createdAt: "2023-11-24T10:41:01Z",
      //   },
      //   {
      //     name: "john smith",
      //     id: "776666df-d360-4026-b957-feb5661effb5",
      //     type: "VIRTUAL",
      //     maskedCardNumber: "474367******0249",
      //     expiryData: "2025-11-30T23:59:59Z",
      //     status: "ACTIVE",
      //     isEnrolledFor3dSecure: true,
      //     isCard3dSecureActivated: true,
      //     security: {
      //       contactlessEnabled: true,
      //       withdrawalEnabled: true,
      //       internetPurchaseEnabled: true,
      //       overallLimitsEnabled: true,
      //     },
      //     activatedAt: "2023-11-24T10:40:31Z",
      //     linkedAccountId: "157f8d14ae57a8f170b496907aaf41ce",
      //     parentWalletId: "3cd7d38b-8002-428b-9a68-06d6e2c4a0b1",
      //     linkedAccountCurrency: "USDT",
      //     createdAt: "2023-11-24T10:40:31Z",
      //   },
      // ],
    }));
  },
};

export { useUserDataAction, useUserDataStore };
