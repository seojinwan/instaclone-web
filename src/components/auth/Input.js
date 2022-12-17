import styled from "styled-components";
const Input = styled.input`
  border-radius: 3px;
  padding: 7px;
  width: 100%;
  background-color: #fafafa;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;

export default Input;
