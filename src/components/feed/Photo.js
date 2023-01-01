import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import {
  faBookmark,
  faComment,
  faPaperPlane,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";
import { FEED_QUERY } from "../../screen/Home";

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const Comments = styled.div`
  margin-top: 20px;
`;
const Comment = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
`;
const CommentCount = styled.span`
  display: block;
  opacity: 0.7;
  font-weight: 600;
  font-size: 10px;
  margin: 10px 0;
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation ToggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string,
  isLiked: PropTypes.bool,
  likes: PropTypes.number,
  caption: PropTypes.string,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.number.isRequired,
      isMe: PropTypes.bool.isRequired,
      payload: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
  commentNumber: PropTypes.number,
};

function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  comments,
  commentNumber,
}) {
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: FEED_QUERY }],
    update: (cache, result) => {
      const {
        data: {
          toggleLike: { ok, error },
        },
      } = result;
      if (ok) {
        const { isLiked, likes } = cache.readFragment({
          id: `Photo:${id}`,
          fragment: gql`
            fragment BSName on Photo {
              isLiked
              likes
            }
          `,
        });

        cache.writeFragment({
          id: `Photo:${id}`,
          fragment: gql`
            fragment BSName on Photo {
              isLiked
              likes
            }
          `,
          data: {
            isLiked: !isLiked,
            likes: isLiked ? likes - 1 : likes + 1,
          },
        });
      }
    },
  });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={user.avatar} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        <Comments>
          <Comment>
            <FatText>{user.username}</FatText>
            <CommentCaption>{caption}</CommentCaption>
            <CommentCount>
              {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
            </CommentCount>
          </Comment>
        </Comments>
      </PhotoData>
    </PhotoContainer>
  );
}

export default Photo;
