import { getParams } from "@/backend/helper/getParams";
import { googleAuth } from "@/backend/helper/googleAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { getRows } = await googleAuth();

    const params = getParams(req.url);
    const existingRecord = getRows.data.values.find(
      (subArray: [string, string]) => {
        return (
          subArray[0] === params.email && subArray[1] === params.property_id
        );
      }
    );

    if (existingRecord) {
      return NextResponse.json({
        status: true,
        isInterested: true,
        message: "A record with this email and project id already exists.",
      });
    }
    return NextResponse.json(
      {
        isInterested: false,
        status: true,
        message: "A record with this email and project id is not exists.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: true,
        message: "Something Went Wrong.",
      },
      { status: 500 }
    );
  }
}
