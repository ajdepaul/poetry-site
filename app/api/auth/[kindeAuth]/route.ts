import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

let kindeAuthHandler: ((req: any, res: any) => any) | null = null;

export const GET = (req: any, res: any) => {
  if (kindeAuthHandler) { return kindeAuthHandler(req, res); }

  if (process.env.KINDE_CLIENT_ID
    && process.env.KINDE_CLIENT_SECRET
    && process.env.KINDE_ISSUER_URL
    && process.env.KINDE_SITE_URL
    && process.env.KINDE_POST_LOGOUT_REDIRECT_URL
    && process.env.KINDE_POST_LOGIN_REDIRECT_URL
  ) {
    kindeAuthHandler = handleAuth();
    return kindeAuthHandler(req, res);
  }
};
