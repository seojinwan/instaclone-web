import { useReactiveVar } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "../apollo";
import Layout from "../components/Layout";
import Login from "./Login";

function Home(props) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const navigator = useNavigate();
  return (
    <React.Fragment>
      {isLoggedIn ? (
        <Layout>
          <button onClick={() => logUserOut(navigator)}>Log out now</button>
        </Layout>
      ) : (
        <Layout>
          <Login />
        </Layout>
      )}
    </React.Fragment>
  );
}

export default Home;
