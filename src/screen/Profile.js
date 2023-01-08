import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { FatText } from "../components/shared";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import useUser from "../hooks/useUser";
const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0;
`;

const SEE_PROFILE_QUERY = gql`
  query SeeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      email
      password
      bio
      avatar
      totalFollowing
      totalFollowers
      isMe
      isFollowing
      photos {
        file
        likes
        commentNumber
      }
    }
  }
`;

const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($username: String) {
    followUser(username: $username) {
      ok
      error
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation UnfollowUser($username: String) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

function Profile(props) {
  const client = useApolloClient();
  const { data: userData } = useUser();
  const { username } = useParams();

  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    // Update로 캐시 업데이트 하는 경우
    update: (cache, result) => {
      const {
        data: {
          followUser: { ok },
        },
      } = result;
      if (!ok) return;
      // 팔로우 대상 유저 캐시 변경
      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing: (prev) => true,
          totalFollowers: (prev) => prev + 1,
        },
      });
      // 유저 자신 캐시 정보 변경 (팔로잉 수 증가)
      cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          totalFollowing: (prev) => prev + 1,
        },
      });
    },
  });
  const [unFollowUserMutation] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    // onComplete로 캐시 업데이트 하는 경우
    onCompleted: (data) => {
      const {
        unfollowUser: { ok },
      } = data;
      if (!ok) return;
      // 언팔로우 대상 유저 캐시 변경
      client.cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing: (prev) => false,
          totalFollowers: (prev) => prev - 1,
        },
      });
      // 유저 자신 캐시 정보 변경 (팔로잉 수 감소)
      client.cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          totalFollowing: (prev) => prev - 1,
        },
      });
    },
  });

  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) return <ProfileBtn>SeeProfile</ProfileBtn>;
    return isFollowing ? (
      <ProfileBtn onClick={unFollowUserMutation}>UnFollow</ProfileBtn>
    ) : (
      <ProfileBtn onClick={followUserMutation}>Follow</ProfileBtn>
    );
  };

  return (
    <div>
      <Header>
        <PageTitle
          title={
            loading
              ? "now loading.."
              : `${data?.seeProfile?.username}'s Profile`
          }
        />
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile && getButton(data.seeProfile)}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {"  "}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos?.map((photo, idx) => (
          <Photo bg={photo.file} key={`photo${idx}`}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo.commentNumber}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
}

export default Profile;
