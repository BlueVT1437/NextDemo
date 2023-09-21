"use client";

import { Button } from "antd";
import "./index.scss";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="navbar">
      <h3 className="text-white">CyberLogitec</h3>
      <Button ghost onClick={handleLogOut}>
        Log Out
      </Button>
    </div>
  );
};

export default Navbar;
