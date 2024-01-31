import { ID_TOKEN_COOKIE } from "@/constants";
import AXIOS from "@/middleware/axios";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export interface Notification {
  id: number;
  timestamp: string;
  assetId: number;
  assetShortName: string;
  amount: number;
  type: string;
  subject: string;
  status: string;
}

export const useNotificationList = () => {
  return useQuery<Notification[], Error, Notification[], string[]>(
    ["notificationList"],
    async () => {
      try {
        // const tokenResponse = await axios.get("/api/auth-token");
        const response = await AXIOS.get(`/notifications`, {
          headers: {
            Authorization: `Bearer ${getCookie(ID_TOKEN_COOKIE)}`,
          },
        });
        return response.data;
      } catch (error) {
        return error;
      }
    }
  );
};
