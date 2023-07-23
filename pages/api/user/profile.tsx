import { NextApiRequest, NextApiResponse } from "next";
import handleFetchApiUser from "../../../lib/server/handleFetchApiUser";
import withSession from "../../../lib/server/withSession";
import db from "../../../lib/db";

async function profile(req: NextApiRequest, res: NextApiResponse) {
  const user = await db.user.findFirst({
    where: {
      loginId: req.session.user?.id,
    },
  });
  return res.status(200).json({ success: true, user });
  // console.log(req.session.user);
}

export default withSession(handleFetchApiUser("GET", profile));
