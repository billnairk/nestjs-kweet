import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
    };
  }
}

const cookie = {
  cookieName: "kweet-session",
  password:
    "ijdidfs89sdf89dfs98fj98f32j89f23j89fsjiosfdiojsdfjoisdf98fsd89f289f2jiofijofijodfs89fdssfd",
};

export default function withSession(fn: any) {
  return withIronSessionApiRoute(fn, cookie);
}
