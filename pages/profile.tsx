import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Profile() {
  const { data, error } = useSWR("api/user/profile");
  console.log(data);
  const router = useRouter();
  useEffect(() => {
    if (!data?.user) {
      router.replace("login");
    }
  }, [data, router]);
  return (
    <div className="profileMainContainer bg-purple-400 w-full h-screen p-10 flex flex-col items-center">
      <h1 className="mb-10 text-white text-lg font-thin">내 정보</h1>
      <div className="profileCard border-[1px] border-white w-[90%] h-[90%] rounded-md">
        <div className="flex p-3 text-sm text-white border-white border-b-[1px]">
          <div className="mr-3">아이디</div>
          <div>{data?.user?.loginId}</div>
        </div>
        <div className="flex p-3 text-sm text-white border-white border-b-[1px]">
          <div className="mr-3">닉네임</div>
          <div>{data?.user?.username}</div>
        </div>
        <div className="flex p-3 text-sm text-white border-white border-b-[1px]">
          <div className="mr-3">이메일</div>
          <div>{data?.user?.email}</div>
        </div>
        <div className="flex p-3 text-sm text-white border-white border-b-[1px]">
          <div className="mr-3">가입일</div>
          <div>{data?.user?.createAt?.slice(0, 10)}</div>
        </div>
      </div>
    </div>
  );
}
