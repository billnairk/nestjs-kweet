import { NextApiRequest, NextApiResponse } from "next";
import handleFetchApiUser from "../../../lib/server/handleFetchApiUser";
import db from "../../../lib/db";
import withSession from "../../../lib/server/withSession";

async function LoginApi(req: NextApiRequest, res: NextApiResponse) {
  const { loginId, pass } = req.body;
  const user = await db.user.findFirst({
    where: {
      AND: [
        {
          loginId,
        },
        {
          password: pass,
        },
      ],
    },
  });
  if (!user) return res.status(404).json({ loginSuccess: false });
  if (user) {
    req.session.user = {
      id: user.loginId,
    };
    await req.session.save();
    return res.status(200).json({ loginSuccess: true });
  }
}

export default withSession(handleFetchApiUser("POST", LoginApi));
