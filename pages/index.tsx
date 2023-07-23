import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="MainContainer bg-purple-400 w-full h-screen p-2 flex flex-col">
        <div className="TopBar w-full flex justify-between">
          <Link href="login">
            <button>HOME</button>
          </Link>
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
