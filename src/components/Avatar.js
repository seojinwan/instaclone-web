import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";

const SAvatar = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
`;
const Img = styled.img`
  max-width: 100%;
`;

function Avatar({ url = "", lg = false }) {
  const navigate = useNavigate();
  return (
    <SAvatar
      onClick={() => {
        if (window.confirm("로그아웃?")) {
          logUserOut(navigate);
        }
      }}
      lg={lg}
    >
      {url !== "" ? <Img src={url} /> : null}
    </SAvatar>
  );
}

export default Avatar;
