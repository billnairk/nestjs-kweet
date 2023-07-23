import Link from "next/link";
import { useForm } from "react-hook-form";
import fetchApiUser from "../lib/client/fetchApiUser";

interface LoginFormType {
  loginId: string;
  pass: string;
}

export default function Login() {
  const [loginFn, { loading, error, data: loginData }] =
    fetchApiUser("api/login/loginapi");
  const { register, handleSubmit } = useForm<LoginFormType>();
  const onValid = (validForm: LoginFormType) => {
    loginFn(validForm);
  };
  console.log(loading, error, loginData);
  return (
    <>
      <div className="LoginMainContainer bg-purple-400 w-full h-screen p-2 flex flex-col">
        <h1>Login Form</h1>
        <form className="w-full" onSubmit={handleSubmit(onValid)}>
          <div>ID</div>
          <input {...register("loginId")} type="text" />
          <div>PASSWORD</div>
          <input {...register("pass")} type="password" />
          <button>Login</button>
        </form>
        <Link href="signup">
          <button>Are you not Register?</button>
        </Link>
      </div>
    </>
  );
}
