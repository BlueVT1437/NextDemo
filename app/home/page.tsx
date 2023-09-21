"use client";

import Navbar from "@/components/Navbar";
import "./index.scss";
import MenuNavigation from "@/components/Menu";
import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import UserList from "@/components/UserList";
import Profile from "@/components/Profile";
import { useSearchParams } from "next/navigation";
import PermissionForm from "@/components/PermissionForm";

const Home = () => {
  const searchParams = useSearchParams();

  const [showPage, setShowPage] = useState("Todos");

  const PAGE_CONSTANT = {
    TODO: "Todos",
    USER: "Users",
    PROFILE: "Profile",
    PERMISSION: "Permission",
  };

  const getToken = searchParams.get("token");

  useEffect(() => {
    if (getToken) {
      localStorage.setItem("token", getToken);

      window.history.replaceState(null, "", "/home");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="content">
        <MenuNavigation setShowPage={setShowPage} />
        {showPage === PAGE_CONSTANT.USER ? (
          <UserList />
        ) : showPage === PAGE_CONSTANT.TODO ? (
          <TodoList />
        ) : showPage === PAGE_CONSTANT.PROFILE ? (
          <Profile />
        ) : (
          <PermissionForm />
        )}
      </div>
    </>
  );
};

export default Home;
