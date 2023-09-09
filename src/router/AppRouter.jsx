import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Detail from "../pages/Detail";
import PrivateRouter from "./PrivateRouter";
import NotFound from "../pages/NotFound";
import FooTer from "../components/FooTer";
import MyBlogs from "../pages/MyBlogs";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="/newblog" element={<NewBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooTer />
    </BrowserRouter>
  );
};

export default AppRouter;
