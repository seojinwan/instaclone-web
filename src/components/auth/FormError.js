import styled from "styled-components";

const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  padding-top: 5px;
`;
function FormError({ message }) {
  return message ? <SFormError>{message}</SFormError> : <></>;
}
export default FormError;
