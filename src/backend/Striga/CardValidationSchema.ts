import { countryOptions } from "@/screens/KYC/step-form/static";
import * as yup from "yup";
const eeaCountryCodes = countryOptions.map((country) => country.alpha2);

export const getAllCardOfUserSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  limit: yup.number().required("Limit is required"),
  offset: yup.number().required("Offset is required"),
});

// const threeDSecurePasswordRegex = /^[A-Za-z0-9!“#;:?\()+=/\&,.[]{}]$/;
export const createCardSchema = yup.object().shape({
  userId: yup.string().max(40, "Name must be at most 40 characters long"),
  nameOnCard: yup.string().required("nameOnCard is required"),
  threeDSecurePassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password must be at most 30 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[!#&*(),.?:{}]/,
      "Password must contain at least one special character from '!', '#' ,'&' ,'*' ,'(' , ')' ,',', '.', '?' , ':' , '{' ,'}'"
    )
    .test(
      "no-invalid-chars",
      "Password must not contain '@','$', '%', '^', '|', '<', or '>'",
      (value) => !/[\\$%@^|<>]/.test(value)
    ),

  accountIdToLink: yup.string().length(32).required("accoutnId is required"),
  type: yup
    .string()
    .oneOf(["PHYSICAL", "VIRTUAL"])
    .required("Type is required and must be one of PHYSICAL or VIRTUAL"),
  address: yup.object().shape({
    addressLine1: yup
      .string()
      .max(45, "Address Line 1 must be at most 45 characters long")
      .required("Address Line 1 is required"),
    addressLine2: yup
      .string()
      .max(45, "Address Line 2 must be at most 45 characters long"),
    postalCode: yup
      .string()
      .max(20, "Postal Code must be at most 20 characters long")
      .required("Postal Code is required"),
    city: yup
      .string()
      .max(40, "City must be at most 40 characters long")
      .required("City is required"),
    countryCode: yup
      .string()
      .matches(/^[A-Z]{2}$/, "Invalid country code")
      .test("is-in-eea", "Country must be in the EEA", (value) =>
        eeaCountryCodes.includes(value ?? "")
      )
      .required("Country code is required"),
    dispatchMethod: yup
      .string()
      .when("type", {
        is: (type: string) => type === "PHYSICAL",
        then: (schema) =>
          schema.required("Dispatch method is required for PHYSICAL card type"),
      })
      .oneOf(["POST", "TRACKED", "EXPRESS"], "Invalid dispatch method"),
  }),
});

export const cardIdSchema = yup.object().shape({
  cardId: yup.string().required("cardId is required"),
});

export const confirmConsentSchema = yup.object().shape({
  userId: yup.string(),
  challengeId: yup.string(),
  verificationCode: yup.string().default("123456"),
});
export const cardStatementSchema = yup.object().shape({
  cardId: yup.string().required("cardId is required"),
  startDate: yup.number().required("startDate is required"),
  endDate: yup.number().required("endDate is required"),
  page: yup.number().required("Page number is required"),
  limit: yup.number().nullable(),
});
export const requestConsentSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  applicationId: yup.string().required("applicationId is required"),
});
const activateCardSchema = yup.object().shape({
  cardId: yup.string().required("Card ID is required"),
  activationCode: yup
    .string()
    .required("Activation code is required")
    .min(4, "Activation code must be exactly 4 characters")
    .max(4, "Activation code must be exactly 4 characters"),
});

export const simulateCardStatusSchema = yup.object().shape({
  cardId: yup.string().required("cardId is required"),
  status: yup.string().required("Status is required"),
});

export const terminateCardSchema = yup.object().shape({
  cardId: yup.string().required("cardId is required"),
});

export const updateCardSettingSchema = yup.object().shape({
  cardId: yup.string().required("cardId is required"),
  security: yup.object().shape({
    contactlessEnabled: yup
      .boolean()
      .required("contactlessEnabled is required"),
    withdrawalEnabled: yup.boolean().required("withdrawalEnabled is required"),
    internetPurchaseEnabled: yup
      .boolean()
      .required("internetPurchaseEnabled is required"),
  }),
});

export const updateCardCurrencySchema = yup.object().shape({
  accountId: yup.string().length(32).required("accoutnId is required"),
  cardId: yup.string().required("cardId is required"),
});

export const setNew3DsPasswordSchema = yup.object().shape({
  cardId: yup.string().required("cardId is required"),
  threeDSecurePassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password must be at most 30 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[!#&*(),.?:{}]/,
      "Password must contain at least one special character from '!', '#' ,'&' ,'*' ,'(' , ')' ,',', '.', '?' , ':' , '{' ,'}'"
    )
    .test(
      "no-invalid-chars",
      "Password must not contain '@','$', '%', '^', '|', '<', or '>'",
      (value) => !/[\\$%@^|<>]/.test(value)
    ),
});

const schemaMap: Record<string, yup.ObjectSchema<any>> = {
  "/card/get-all": getAllCardOfUserSchema,
  "/card/create": createCardSchema,
  "/card/block": cardIdSchema,
  "/card/unblock": cardIdSchema,
  "/card": cardIdSchema,
  "/card/report-missing": cardIdSchema,
  "/card/confirm-consent": confirmConsentSchema,
  "/card/request-consent": requestConsentSchema,
  "/card/statement": cardStatementSchema,
  "/card/activate": activateCardSchema,
  "/simulate/card/status": simulateCardStatusSchema,
  "/card/burn": terminateCardSchema,
  "/card/security": updateCardSettingSchema,
  "/card/3ds": setNew3DsPasswordSchema,
  "/card/link-account": updateCardCurrencySchema,
};

export const getCardValidationSchema = (
  endpoint: string
): yup.ObjectSchema<any> | null => {
  return schemaMap[endpoint] || null;
};
