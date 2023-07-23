import { NextApiRequest, NextApiResponse } from "next";
import handleFetchApiUser from "../../../lib/server/handleFetchApiUser";
import db from "../../../lib/db";

async function LoginApi(req: NextApiRequest, res: NextApiResponse) {
  const { loginId, pass } = req.body;
  let user;
  user = await db.user.findFirst({
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
  if (user) {
    // console.log(`유저를 찾았습니다.${JSON.stringify(user)}`);
    return res.status(200).json({ userValid: true });
    // 여기부터 시작.. 로그인 시 유저 정보가 DB에 존재하면 토큰을 부여하고 로그인 상태로 만든다.
  } else if (!user) {
    // console.log("없는 유저입니다.");
    return res.status(200).json({ userValid: false });
  }
}

export default handleFetchApiUser("POST", LoginApi);
