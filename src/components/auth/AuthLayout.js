import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
  font-size: 25px;
  margin-top: 20px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
  background-color: white;
  border-radius: 15px;
  padding: 6px;
`;

export function AuthLayout({ children }) {
  const isDarkMode = useReactiveVar(darkModeVar);

  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={isDarkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}
