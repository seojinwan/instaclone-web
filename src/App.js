import { ApolloProvider, useReactiveVar } from "@apollo/client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { client } from "./apollo";

function App(props) {
  const isDarkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Outlet />
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
