import { getOrRegisterUserLocally } from "@/backend/KYC/users";
import { getParams } from "@/backend/helper/getParams";
import { NextRequest, NextResponse } from "next/server";

import * as yup from "yup";

export async function GET(req: NextRequest) {
  try {
    const params = getParams(req.url);

    const { email, auth0Id } = params;
    const user = await getOrRegisterUserLocally(email, auth0Id);

    return NextResponse.json(
      {
        status: true,
        message: "Success.",
        data: {
          user,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        { status: true, message: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { status: true, message: "Something Went Wrong." },
      { status: 500 }
    );
  }
}
