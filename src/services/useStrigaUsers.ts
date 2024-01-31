import { useUserDataAction } from "@/store/userDataStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendDataToStriga = async (data: {
  endpoint: string;
  method: string;
  data: any;
}) => {
  return await axios.post("/api/kyc/striga/user", data);
};

export const useStrigaUserDetailsMutation = () => {
  const { setStrigaUserFullDetails } = useUserDataAction;
  return useMutation(async (data: any) => {
    const response = await sendDataToStriga({
      endpoint: "/user",
      method: "GET",
      data: data,
    });
    setStrigaUserFullDetails(response?.data?.data);
    return response.data;
  });
};
