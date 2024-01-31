import { KYCStatus, PrismaClient } from "@prisma/client";
import * as yup from "yup";

const prisma = new PrismaClient();

const GetOrRegisterUserLocallySchema = yup.object().shape({
  email: yup.string().email().required(),
  auth0Id: yup.string().required(),
});

export interface UserData {
  id: string;
  auth0Id: string;
  strigaId: string | null;
  email: string | null;
  sumsubId: string | null;
  kyc: KYCStatus;
}

export const getOrRegisterUserLocally = async (
  email: string,
  auth0Id: string
): Promise<UserData> => {
  try {
    await GetOrRegisterUserLocallySchema.validate({ email, auth0Id });

    let user = await prisma.userIds.findUnique({
      where: { email },
    });
    if (!user) {
      user = await prisma.userIds.create({
        data: { email, auth0Id },
      });
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateStrigaIdInDB = async (userId: string, email: string) => {
  const user = await prisma.userIds.update({
    where: { email },
    data: {
      strigaId: userId,
    },
  });
  return user;
};

export const updateKYCStatusInDB = async (
  strigaId: string,
  status: KYCStatus
) => {
  const user = await prisma.userIds.update({
    where: { strigaId },
    data: {
      kyc: status,
    },
  });
  return user;
};
