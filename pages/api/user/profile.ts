import { NextApiRequest, NextApiResponse } from "next";
import handleFetchApiUser from "../../../lib/server/handleFetchApiUser";
import withSession from "../../../lib/server/withSession";
import db from "../../../lib/db";
import useUser from "../../../lib/client/useUser";

async function profile(req: NextApiRequest, res: NextApiResponse) {
  console.log("리퀘 아이디", req.session.user?.id);
  let user;
  if ((await req.session.user?.id) === undefined) {
    console.log("프로필1");
    return res.json({ success: false, user: false, ErrorMsg: "Not Login" });
  } else {
    user = await db.user.findFirst({
      where: {
        loginId: req.session?.user?.id,
      },
    });
  }
  console.log("프로필2");

  return res.json({ success: true, user });
}

export default withSession(handleFetchApiUser("GET", profile));
