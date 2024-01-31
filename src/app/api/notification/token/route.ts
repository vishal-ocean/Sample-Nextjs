import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import Ably from "ably/promises";
import { NextResponse } from "next/server";

export const GET = withApiAuthRequired(async function GET(req) {
  try {
    const res = new NextResponse();
    const userSession = await getSession(req, res);

    if (!userSession) {
      return NextResponse.json(
        {
          status: 400,
          message: "No user session found.",
        },
        { status: 400 }
      );
    }

    const userId = userSession.user.sub;

    const client = new Ably.Realtime(
      process.env.ABLY_SUBSCRIBER_PUBLISHER_KEY as string
    );

    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: userId,
      capability: {
        [userId]: ["subscribe"],
      },
    });

    return NextResponse.json(tokenRequestData);
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
