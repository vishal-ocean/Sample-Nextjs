import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { NextResponse } from "next/server";

const GET = withApiAuthRequired(async function GET(req) {
  try {
    const res = new NextResponse();
    const userSession = await getSession(req, res);

    var options = {
      method: "POST",
      url: `${process.env.AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`,
      headers: { "content-type": "application/json" },
      data: {
        client_id: process.env.AUTH0_CLIENT_ID,
        email: userSession?.user.email,
        connection: process.env.AUTH0_DB_NAME,
      },
    };

    const response = await axios.request(options);

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: response.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
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
