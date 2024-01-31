import * as yup from "yup";

export const getUserByIdSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
});

const schemaMap: Record<string, yup.ObjectSchema<any>> = {
  "/user": getUserByIdSchema,
};

export const getUserValidationSchema = (
  endpoint: string
): yup.ObjectSchema<any> | null => {
  return schemaMap[endpoint] || null;
};
