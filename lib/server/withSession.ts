import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
    };
  }
}

const cookieOptions = {
  cookieName: "kweet-cookie",
  password: "foiwejoiwje328923jf923jf8sfwkldsoifsd0fwoiweoji32i",
};

export default function withSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
