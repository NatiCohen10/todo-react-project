import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios"; // Import Axios
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import TodoDetailsPage from "./pages/TodoDetailsPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import NotFoundPage from "./pages/NotFoundPage";
import TodoLayout from "./pages/TodoLayout";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <NavBar />
      <div className="contet-wrapper test-div">
        <div className="content-card">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todo" element={<TodoLayout />}>
              <Route index element={<TodoPage />} />
              <Route path="create" element={<TodoPage />}>
                <Route index element={<CreateTodoPage />} />
              </Route>
              <Route path=":todoId" element={<TodoDetailsPage />} />
            </Route>
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
