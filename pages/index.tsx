import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import useUser from "../lib/client/useUser";
import Upload from "./upload";

interface userProfileType {
  success: boolean;
  user: profileType;
}

interface profileType {
  [any: string]: any;
}

export default function Home() {
  const { user, isLoading } = useUser();
  console.log("인덱스 페이지", user);
  const [profile, setProfile] = useState<userProfileType>();
  useEffect(() => {
    const getProfile = async () => {
      const userProfile = await fetch("/api/user/profile").then((res) =>
        res.json().catch((error) => {
          error;
        })
      );
      setProfile(() => userProfile);
    };
    getProfile();
  }, [user]);
  const logout = () => {
    fetch("api/user/logoutUser", { method: "POST" });
    location.reload();
  };
  return (
    <>
      <div className="MainContainer bg-purple-400 w-full h-screen p-2 flex flex-col items-center">
        <div className="TopBar w-full flex justify-between">
          <Link href="login">
            <button>HOME</button>
          </Link>
          {profile?.user ? (
            <span>{profile.user?.username}님 안녕하세요</span>
          ) : null}
          <Link href="profile">
            <button>Profile</button>
          </Link>
          {profile?.user ? <button onClick={logout}>logout</button> : null}
        </div>
        <div className="MsgContainer"></div>
        <div className="fixed bottom-0 p-4 m-10 text-white hover:bg-purple-500 border-[1px] rounded-md border-white flex w-[70%] justify-center">
          <button>upload</button>
        </div>
      </div>
    </>
  );
}
