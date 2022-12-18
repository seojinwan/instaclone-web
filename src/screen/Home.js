import { useReactiveVar } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "../apollo";
import Login from "./Login";

function Home(props) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const navigator = useNavigate();
  return (
    <React.Fragment>
      {isLoggedIn ? (
        <div>
          <h1>Home</h1>
          <button onClick={() => logUserOut(navigator)}>Log out now</button>
        </div>
      ) : (
        <Login />
      )}
    </React.Fragment>
  );
}

export default Home;
