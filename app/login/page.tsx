"use client";

import LoginForm from "@/components/LoginForm/LoginForm";
import backGround from "../../public/background.jpeg";
import Image from "next/image";
import "./index.scss";
import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login">
      <Image className="background" alt="" src={backGround} />
      <div className="float-right mt-48 relative">
        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} />
        ) : (
          <RegisterForm setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
}
