import styled from "styled-components";
const Button = styled.input`
  width: 100%;
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.fontColor};
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export default Button;
