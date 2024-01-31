"use server";

import { cookies } from "next/headers";

export const setTokenToCookie = (token: string) => {
  return cookies().set("idToken", token);
};
