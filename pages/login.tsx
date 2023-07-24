import Link from "next/link";
import { useForm } from "react-hook-form";
import fetchApiUser from "../lib/client/fetchApiUser";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "../lib/client/useUser";

interface LoginFormType {
  loginId: string;
  pass: string;
}

interface loginDataType {
  loginSuccess: boolean;
}

export default function Login() {
  const { user, isLoading } = useUser();
  console.log(user);
  const [loginFn, { loading, error, data: loginData }] =
    fetchApiUser<loginDataType>("api/login/loginapi");
  const { register, handleSubmit } = useForm<LoginFormType>();
  const onValid = (validForm: LoginFormType) => {
    loginFn(validForm);
  };
  const router = useRouter();
  useEffect(() => {
    if (loginData?.loginSuccess) {
      alert("로그인 성공");
      router.replace("/");
    }
  }, [loginData, router]);
  console.log(loading, error, loginData);
  return (
    <>
      <div className="LoginMainContainer bg-purple-400 w-full h-screen p-2 flex flex-col">
        <h1>Login Form</h1>
        <form className="w-full flex flex-col" onSubmit={handleSubmit(onValid)}>
          <div>ID</div>
          <input {...register("loginId", { required: true })} type="text" />
          <div>PASSWORD</div>
          <input {...register("pass", { required: true })} type="password" />
          <button>Login</button>
        </form>
        <Link href="signup">
          <button>Are you not Register?</button>
        </Link>
      </div>
    </>
  );
}
