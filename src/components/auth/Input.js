import styled from "styled-components";
const Input = styled.input`
  border-radius: 3px;
  padding: 7px;
  width: 100%;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => props.theme.accent};
    transition: border-color 800ms ease;
  }
`;

export default Input;
