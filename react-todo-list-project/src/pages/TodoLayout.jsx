import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function TodoLayout() {
  return (
    <div className="todo-layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default TodoLayout;
