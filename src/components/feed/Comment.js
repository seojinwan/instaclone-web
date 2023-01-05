import React from "react";
import { FatText } from "../shared";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($deleteCommentId: Int!) {
    deleteComment(id: $deleteCommentId) {
      ok
    }
  }
`;

Comment.propTypes = {
  id: PropTypes.number,
  photoId: PropTypes.number,
  author: PropTypes.string,
  payload: PropTypes.string,
};

function Comment({ id, author, payload, photoId }) {
  // Delete Comment
  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      deleteCommentId: id,
    },
    update: (cache, result) => {
      const {
        data: {
          deleteComment: { ok },
        },
      } = result;
      if (ok) {
        cache.evict({ id: `Comment:${id}` });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            commentNumber: (prev) => prev - 1,
          },
        });
      }
    },
  });

  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
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
      {id && !loading && (
        <FontAwesomeIcon
          icon={faClose}
          size={"1x"}
          style={{ cursor: "pointer" }}
          onClick={deleteComment}
        />
      )}
    </CommentContainer>
  );
}

export default Comment;
