import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import Login from "./screen/Login";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App(props) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDarkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      {isLoggedIn ? <Outlet /> : <Login />}
    </ThemeProvider>
  );
}

export default App;
