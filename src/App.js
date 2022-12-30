import { useReactiveVar } from "@apollo/client";
import React from "react";

import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import Login from "./screen/Login";
import Layout from "./components/Layout";

function App(props) {
  const isDarkMode = useReactiveVar(darkModeVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />

      {isLoggedIn ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Login />
      )}
    </ThemeProvider>
  );
}

export default App;
