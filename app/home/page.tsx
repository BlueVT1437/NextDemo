"use client";

import Navbar from "@/components/Navbar";
import "./index.scss";
import MenuNavigation from "@/components/Menu";
import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import UserList from "@/components/UserList";

const Home = () => {
  const [showPage, setShowPage] = useState("todos");

  const PAGE_CONSTANT = {
    TODO: "Todos",
    USER: "Users",
  };

  useEffect(() => {
    console.log("showPage", showPage);
  }, [showPage]);

  return (
    <>
      <Navbar />
      <div className="content">
        <MenuNavigation setShowPage={setShowPage} />
        {showPage === PAGE_CONSTANT.TODO ? <TodoList /> : <UserList />}
      </div>
    </>
  );
};

export default Home;
