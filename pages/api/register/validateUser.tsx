import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

export default async function ValidateUser(loginId: string) {
  const user = await db.user.findUnique({
    where: { loginId },
  });
  if (user) {
    return true;
  } else if (!user) {
    return false;
  }
}
