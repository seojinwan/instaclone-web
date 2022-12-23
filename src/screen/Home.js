import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import Layout from "../components/Layout";
import Login from "./Login";
import Header from "../components/Header";
import Avatar from "../components/Avatar";

const FEED_QUERY = gql`
  query Query {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMe
    }
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;
  margin-top: 10;
`;

const PhotoHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

function Home(props) {
  const { data } = useQuery(FEED_QUERY);
  const navigator = useNavigate();

  useEffect(() => {
    if (data?.seeFeed === null) navigator("/auth/login");
    console.log(data);
  }, [data]);

  return (
    <React.Fragment>
      <Layout>
        <PhotoContainer>
          {data?.seeFeed?.map((feed) => (
            <PhotoHeader key={feed.id}>
              <Avatar url={feed?.file} />
              {feed?.user?.username}
            </PhotoHeader>
          ))}
        </PhotoContainer>
      </Layout>
    </React.Fragment>
  );
}

export default Home;
