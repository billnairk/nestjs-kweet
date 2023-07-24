import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("api/user/profile");
  console.log("유즈유저1", data, Boolean(data));
  const router = useRouter();
  useEffect(() => {
    console.log("유즈유저2", data, Boolean(data));
    if (!data?.user) router.replace("/login");
    else if (data?.user) router.replace("/");
  }, [data]);
  return { user: data?.user, isLoading: !data && !error };
}
