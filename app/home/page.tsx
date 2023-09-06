"use client";

import Navbar from "@/components/Navbar";
import "./index.scss";
import MenuNavigation from "@/components/Menu";
import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import UserList from "@/components/UserList";
import Profile from "@/components/Profile";

const Home = () => {
  const [showPage, setShowPage] = useState("Todos");

  const PAGE_CONSTANT = {
    TODO: "Todos",
    USER: "Users",
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <MenuNavigation setShowPage={setShowPage} />
        {showPage === PAGE_CONSTANT.USER ? (
          <UserList />
        ) : showPage === PAGE_CONSTANT.TODO ? (
          <TodoList />
        ) : (
          <Profile />
        )}
      </div>
    </>
  );
};

export default Home;
