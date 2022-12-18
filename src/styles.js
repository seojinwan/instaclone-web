import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
export const lightTheme = {
  accent: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
  fontColor: "rgb(39, 39, 39)",

  backgroundColor: "#fafafa",
};

export const darkTheme = {
  accent: "#7f8c8d",
  fontColor: "rgb(39, 39, 39)",

  backgroundColor: "#2c2c2c",
};
export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
      box-sizing : border-box
    }
    input {
      all : unset;
    }
    body {
      background-color: ${(props) => props.theme.backgroundColor};
      color: ${(props) => props.theme.fontColor};
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
    }
    a {
      text-decoration: none; 
    }
`;
