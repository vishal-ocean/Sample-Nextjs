import crypto from "crypto";
export const strigaWebHookSignatureValidation = async (
  headerSign: string,
  payload: any
) => {
  const signature = crypto.createHmac(
    "sha256",
    process.env.STRIGA_API_KEY as string
  );
  signature.update(JSON.stringify(payload));
  const sign = signature.digest("hex");
  return headerSign === sign;
};

export const generateStrigaSignature = (
  method: string,
  endpoint: string,
  body: any
) => {
  const hmac = crypto.createHmac("sha256", process.env.STRIGA_SECRET as string);
  const time = Date.now().toString();

  hmac.update(time);
  hmac.update(method);
  hmac.update(endpoint);

  const contentHash = crypto.createHash("md5");
  contentHash.update(JSON.stringify(body));

  hmac.update(contentHash.digest("hex"));

  const auth = `HMAC ${time}:${hmac.digest("hex")}`;
  return auth;
};

export const generateAuthorizationHeader = (
  method: string,
  endpoint: string,
  body: any
) => {
  const BODY = JSON.stringify(body);
  // Calculate MD5 hash of the request content
  const requestContentHexString = crypto
    .createHash("md5")
    .update(BODY)
    .digest("hex")
    .toLowerCase();

  // Construct the raw data for the signature
  const time = Date.now().toString();
  const signatureRawData = `${time}${method}/${endpoint}${requestContentHexString}`;

  // Create an HMAC object with SHA256 algorithm and the secret key
  const hmac = crypto.createHmac("sha256", process.env.STRIGA_SECRET as string);

  // Update the HMAC object with the raw data
  hmac.update(signatureRawData);

  // Calculate the HMAC SHA256 hash
  const requestSignaturHexString = hmac.digest("hex");

  // Construct the authorization header
  const authorizationHeader = `HMAC ${time}:${requestSignaturHexString}`;

  return authorizationHeader;
};
