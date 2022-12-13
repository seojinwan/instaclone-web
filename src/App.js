import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import Login from "./screen/Login";

function App(props) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return <div>{isLoggedIn ? <Outlet /> : <Login />}</div>;
}

export default App;
