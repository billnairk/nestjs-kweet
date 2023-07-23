import { NextApiRequest, NextApiResponse } from "next";
import handleFetchApiUser from "../../../lib/server/handleFetchApiUser";
import db from "../../../lib/db";

async function RegisterApi(req: NextApiRequest, res: NextApiResponse) {
  const { loginId, username, email, pass } = req.body;
  // console.log(loginId);
  const findUser = await db.user.findUnique({
    where: {
      loginId,
    },
  });
  await db.user.upsert({
    where: {
      loginId,
    },
    create: {
      loginId,
      username,
      email,
      password: pass,
    },
    update: {},
  });

  const existUser = findUser
    ? `${loginId}는 사용중인 ID 입니다.`
    : `${loginId} 회원 가입 완료`;

  if (findUser) {
    return res.json({ existUser, success: false });
  } else if (!findUser) {
    return res.json({ existUser, success: true });
  }
}

export default handleFetchApiUser("POST", RegisterApi);
