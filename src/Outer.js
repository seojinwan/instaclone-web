import { useReactiveVar } from "@apollo/client";
import React from "react";

import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import Layout from "./components/Layout";

/**
 * @title 구조 적인 문제로 App 과 같은 인증 없이 사용할수 있는 레이아웃 컴포넌트 생성
 */
function Outer(props) {
  const isDarkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}

export default Outer;
