import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toastWarnNotify } from "../helper/ToastNotify";

const PrivateRouter = () => {
  const { currentUser } = useSelector(state => state.auth);

  if (!currentUser?.username) {
    toastWarnNotify("You need to login first");
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRouter;
