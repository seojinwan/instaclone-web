import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments {
        id
        user {
          username
          avatar
        }
        isMe
        payload
        createdAt
      }
      commentNumber
      createdAt
      isMe
      isLiked
    }
  }
`;

function Home() {
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      <PageTitle title={"FEEDS"} />
      {data?.seeFeed?.map((photo) => (
        <Photo key={`photo-${photo.id}`} {...photo} />
      ))}
    </div>
  );
}
export default Home;
