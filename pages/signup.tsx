import Link from "next/link";
import { useForm } from "react-hook-form";
import fetchApiUser from "../lib/client/fetchApiUser";
import LoadingModal from "../components/LoadingModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface SignUpProps {
  loginId: string;
  username: string;
  email: string;
  pass: string;
}

interface registerDataType {
  success: boolean;
  existUser: string;
}

export default function SignUp() {
  const router = useRouter();
  const [registerFn, { loading, error, data: registerData }] =
    fetchApiUser<registerDataType>("api/register/registerapi");
  const { register, handleSubmit } = useForm<SignUpProps>({ mode: "onChange" });
  const [existUser, setExistUser] = useState<string>("");
  const onValid = (validForm: SignUpProps) => {
    registerFn(validForm);
  };
  useEffect(() => {
    if (registerData?.success) {
      router.replace("/login");
    } else if (registerData?.success === false) {
      setExistUser(JSON.stringify(registerData.existUser).replace(/"/g, ""));
    }
  }, [registerData]);
  useEffect(() => {
    if (error) console.log(error);
  }, [error]);
  const resetErrorMsg = () => {
    if (registerData?.success === false) {
      setExistUser("");
    }
  };
  return (
    <>
      <div className="LoginMainContainer bg-purple-400 w-full h-screen p-2 flex flex-col">
        <h1>Register Form</h1>
        <form className="w-full" onSubmit={handleSubmit(onValid)}>
          <div>ID</div>
          {existUser ? (
            <div className="text-xs text-red-500">{existUser}</div>
          ) : null}
          <input
            {...register("loginId", {
              required: true,
              // onChange: handleSubmit(resetErrorMsg),
            })}
            type="text"
          />
          <div>USERNAME</div>
          <input {...register("username", { required: true })} type="text" />

          <div>EMAIL</div>
          <input {...register("email", { required: true })} type="email" />
          <div>PASSWORD</div>
          <input {...register("pass", { required: true })} type="password" />
          <button>register</button>
        </form>
        {loading ? <LoadingModal /> : null}
        <Link href="login">
          <button>Are you Registered?</button>
        </Link>
      </div>
    </>
  );
}
