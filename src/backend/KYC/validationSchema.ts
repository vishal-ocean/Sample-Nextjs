import * as yup from "yup";

export const userIdStrigaSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
});

export const createUserSchema = yup.object().shape({
  email: yup.string().email().required("email is required"),
  firstName: yup.string().required("firstName is required"),
  lastName: yup.string().required("lastName is required"),
  mobile: yup.object().shape({
    countryCode: yup.string().required("countryCode is required"),
    number: yup.string().required("Mobile Number is required"),
  }),
});

export const verifyEmailSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  verificationId: yup.string().required("Verification Code is required"),
});

export const verifyMobileSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  verificationCode: yup.string().required("Verification Code is required"),
});

const schemaMap: Record<string, yup.ObjectSchema<any>> = {
  "/user": userIdStrigaSchema,
  "/user/create": createUserSchema,
  "/user/resend-email": userIdStrigaSchema,
  "/user/resend-sms": userIdStrigaSchema,
  "/user/verify-email": verifyEmailSchema,
  "/user/verify-mobile": verifyMobileSchema,
  "/user/update": userIdStrigaSchema,
  "/user/kyc/start": userIdStrigaSchema,
};

export const getValidationSchema = (
  endpoint: string
): yup.ObjectSchema<any> | null => {
  return schemaMap[endpoint] || null;
};
