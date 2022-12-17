import styled from "styled-components";
import { BaseBox } from "../shared";

const SFormBox = styled(BaseBox)`
  display: flex;
  justifiy-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 20px 40px;
  margin-bottom: 10px;

  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

function FormBox({ children }) {
  return <SFormBox>{children}</SFormBox>;
}

export default FormBox;
