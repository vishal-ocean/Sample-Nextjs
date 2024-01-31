import { getWalletValidationSchema } from "@/backend/Striga/WalletValidationSchema";
import { generateStrigaSignature } from "@/backend/helper/strigaSigns";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

const ALLOWED_METHODS = ["POST", "GET", "PATCH"];
const ALLOWED_ENDPOINTS = [
  "/wallets/get",
  "/wallets/get/all",
  "/wallets/get/account/statement",
  "/wallets/account/enrich",
  "/wallets/get/account",
  "/wallets/send/initiate/bank",
  "/wallets/transaction/confirm",
  "/wallets/transaction/resend-otp",
  "/wallets/whitelist-address",
  "/wallets/get/whitelisted-addresses",
  "/wallets/send/initiate/onchain/fee-estimate",
  "/wallets/send/initiate/onchain",
];

const sendRequest = async (endpoint: string, method: string, data: any) => {
  const body = data || {};

  const headers = {
    authorization: generateStrigaSignature(method, endpoint, body),
    "api-key": process.env.STRIGA_API_KEY,
    "Content-Type": "application/json",
  };

  const axiosConfig: any = {
    method,
    headers,
    url: `${process.env.STRIGA_API_ENDPOINT}/${endpoint}`,
    data: body,
  };
  const response = await axios(axiosConfig);

  return response.data;
};

export async function POST(req: NextRequest) {
  try {
    const { endpoint, method, data } = await req.json();

    let _endpoint = endpoint;
    let _data = data;

    if (!ALLOWED_METHODS.includes(method)) {
      return NextResponse.json(
        { status: false, message: "Method not allowed." },
        { status: 405 }
      );
    }
    if (!ALLOWED_ENDPOINTS.includes(endpoint)) {
      return NextResponse.json(
        { status: false, message: "Endpoint not allowed." },
        { status: 405 }
      );
    }

    await getWalletValidationSchema(endpoint)?.validate(data);

    const res = await sendRequest(_endpoint, method, _data);

    return NextResponse.json(
      { status: true, message: "Success.", data: res },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof Yup.ValidationError) {
      // Handle Yup validation errors
      return NextResponse.json(
        { status: 400, message: error.message },
        { status: 400 }
      );
    } else if (error.response && error.response.data) {
      let errorData = error.response.data;

      if (typeof errorData === "string") {
        try {
          errorData = JSON.parse(errorData);
        } catch (error) {
          console.error("Error parsing error data:", error);
        }
      }

      return NextResponse.json(
        {
          status: false,
          message: "Something went wrong.",
          type: "strigaError",
          data: errorData,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        status: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
