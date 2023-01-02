import React from "react";
import { FatText } from "../shared";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

Comment.propTypes = {
  author: PropTypes.string,
  payload: PropTypes.string,
};

function Comment({ author, payload }) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload?.split(" ")?.map((word, idx) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={word + idx}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={idx}>{word + " "}</React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
