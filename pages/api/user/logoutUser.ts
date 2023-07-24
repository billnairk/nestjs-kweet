import { NextApiRequest, NextApiResponse } from "next";
import withSession from "../../../lib/server/withSession";

async function logoutUser(req: NextApiRequest, res: NextApiResponse) {
  await req.session.destroy();
  return res.status(200).end();
}

export default withSession(logoutUser);
