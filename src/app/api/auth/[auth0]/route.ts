import { getParams } from "@/backend/helper/getParams";
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin((req: any) => {
    const params = getParams(req.url);
    return {
      authorizationParams: { confirmationId: params.confirmationId },
    };
  }),
});
