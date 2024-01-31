import { updateKYCStatusInDB } from "@/backend/KYC/users";
import { strigaWebHookSignatureValidation } from "@/backend/helper/strigaSigns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const signature = req.headers.get("signature");

    if (!signature) {
      return NextResponse.json(
        { status: false, message: "Signature is required" },
        { status: 400 }
      );
    }

    const isAuthentic = await strigaWebHookSignatureValidation(signature, data);

    if (!isAuthentic) {
      return NextResponse.json(
        { status: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    await updateKYCStatusInDB(data.userId, data.status);

    return NextResponse.json(
      { status: true, message: "Success." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
