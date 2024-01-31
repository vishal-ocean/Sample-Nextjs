import { google } from "googleapis";

export const googleAuth = async (): Promise<any> => {
  try {
    const auth: any = new google.auth.GoogleAuth({
      credentials: {
        client_email: process?.env?.["GOOGLE_CLIENT_EMAIL"],
        private_key: process?.env?.["GOOGLE_AUTH_PRIVATE_KEY"],
      },
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({
      version: "v4",
      auth: client,
    });
    const spreadsheetId = process?.env?.["GOOGLE_SPREADSHEET_ID"];
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1",
    });

    return { googleSheets, spreadsheetId, getRows, auth };
  } catch (error) {
    // console.log("error", error);
    return;
  }
};
