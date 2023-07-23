import Link from "next/link";
import { useEffect, useState } from "react";

interface userProfileType {
  success: boolean;
  user: profileType;
}

interface profileType {
  [any: string]: any;
}

export default function Home() {
  const [profile, setProfile] = useState<userProfileType>();
  useEffect(() => {
    const getProfile = async () => {
      const userProfile = await fetch("/api/user/profile").then((response) =>
        response.json()
      );
      setProfile(() => userProfile);
    };
    getProfile();
  }, []);
  return (
    <>
      <div className="MainContainer bg-purple-400 w-full h-screen p-2 flex flex-col">
        <div className="TopBar w-full flex justify-between">
          <Link href="login">
            <button>HOME</button>
          </Link>
          {profile ? <span>{profile.user?.loginId}님 안녕하세요</span> : null}
          <Link href="signup">
            <button>Profile</button>
          </Link>
        </div>
        <div className="MsgContainer"></div>
        <div className="fixed bottom-0 p-4 flex w-full justify-center">
          <Link href="upload">
            <button>ADD MESSAGE</button>
          </Link>
        </div>
      </div>
    </>
  );
}
