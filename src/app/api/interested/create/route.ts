import { googleAuth } from "@/backend/helper/googleAuth";
import { NextResponse } from "next/server";
import * as Yup from "yup";

// Validation schema
const schema = Yup.object().shape({
  email: Yup.string().email().required("email is required"),
  property_id: Yup.string().required("Project Id is required"),
});

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" });
  }
  const { auth, googleSheets, spreadsheetId, getRows } = await googleAuth();
  try {
    const data = await req.json();
    // Validate the request body
    await schema.validate(data);

    // Check if a record with the same email and property_id already exists
    const existingRecord = getRows.data.values.find(
      (subArray: ["string", "string"]) => {
        return subArray[0] === data.email && subArray[1] === data.property_id;
      }
    );

    if (existingRecord) {
      return NextResponse.json(
        {
          status: false,
          message: "A record with this email and project id already exists.",
        },
        {
          status: 400,
        }
      );
    }

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[data.email, data.property_id]],
      },
    });

    return NextResponse.json(
      {
        status: true,
        message: "Your interest has been recorded successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return NextResponse.json(
        { status: false, message: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        status: true,
        message: "Something Went Wrong.",
      },
      { status: 500 }
    );
  }
}
