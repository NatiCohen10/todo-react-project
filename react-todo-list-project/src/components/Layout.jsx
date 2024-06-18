import React from "react";
import TodoLayout from "../pages/TodoLayout";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  const showSidebar = window.location.pathname.startsWith("/todo");
  return (
    <>
      {showSidebar && <Sidebar />}

      <Outlet />
    </>
  );
}

export default Layout;
