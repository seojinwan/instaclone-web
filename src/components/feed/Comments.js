import React from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import useUser from "../../hooks/useUser";

import Comment from "./Comment";
import { useForm } from "react-hook-form";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.span`
  display: block;
  opacity: 0.7;
  font-weight: 600;
  font-size: 12px;
  margin: 10px 0;
`;
const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      id
      ok
      error
    }
  }
`;

function Comments({ photoId, author, caption, commentNumber, comments }) {
  const {
    data: { me: userInfo },
  } = useUser();
  // Create Comment
  const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  // CreateComment
  const onSubmit = (data) => {
    if (loading || !data?.payload) return;
    createComment({
      variables: {
        photoId,
        payload: data.payload,
      },
      update: (cache, result) => {
        const {
          data: {
            createComment: { error, ok, id: newCommentId },
          },
        } = result;
        if (!ok) {
          console.error(error);
          return;
        }
        const newCache = cache.writeFragment({
          fragment: gql`
            fragment BSName on Comment {
              __typename
              id
              user {
                __typename
                username
                avatar
              }
              isMe
              payload
              createdAt
            }
          `,
          data: {
            __typename: "Comment",
            id: newCommentId,
            user: {
              __typename: "User",
              username: userInfo.username,
              avatar: userInfo.avatar,
            },
            isMe: true,
            payload: data.payload,
            createdAt: String(Date.now()),
          },
        });

        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            comments: (prev, { readField }) => {
              return [...prev, newCache];
            },
            commentNumber: (prev) => prev + 1,
          },
        });

        setValue("payload", "");
      },
    });
  };
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment, idx) => (
        <Comment
          key={`comment-${idx}`}
          id={comment.id}
          author={comment.user.username}
          payload={comment.payload}
          photoId={photoId}
        />
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        ></div>
        <input
          {...register("payload", {
            required: {
              value: true,
              message: "코멘트를 입력하세요",
            },
          })}
          placeholder="please write comment..."
        />

        {errors?.payload?.message}
      </form>
    </CommentsContainer>
  );
}

export default Comments;
