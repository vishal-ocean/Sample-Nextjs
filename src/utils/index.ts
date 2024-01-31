import { IS_MFA } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { deleteCookie } from "cookies-next";
import { extendTailwindMerge } from "tailwind-merge";
const customTwMerge = extendTailwindMerge({
  classGroups: {
    "font-size": [{ text: [(value: any) => Number(value) >= 0] }],
  },
});
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

// for logout from current session

export function logout() {
  window.location.href = "/api/auth/logout";
  deleteCookie(IS_MFA);
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
}
