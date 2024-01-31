import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const GET = withApiAuthRequired(async function GET(req) {
  try {
    const res = new NextResponse();
    const userSession = await getSession(req, res);
    return NextResponse.json(
      {
        status: 200,
        idToken: userSession?.idToken,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 400,
        message: error.message,
      },
      { status: 400 }
    );
  }
});

export { GET };
