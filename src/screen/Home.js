import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import Login from "./Login";

function Home(props) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <React.Fragment>
      {isLoggedIn ? (
        <div>
          <h1>Home</h1>
          <button onClick={logUserOut}>Log out now</button>
        </div>
      ) : (
        <Login />
      )}
    </React.Fragment>
  );
}

export default Home;
