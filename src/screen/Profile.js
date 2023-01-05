import { gql } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

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
    }
  }
`;

function Profile(props) {
  const { username } = useParams();
  return <div>Profile : {username}</div>;
}

export default Profile;
