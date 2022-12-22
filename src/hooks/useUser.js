import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query Me {
    me {
      username
      avatar
    }
  }
`;

function useUser() {
  const navigator = useNavigate();
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut(navigator);
    }
  }, [data]);
  return {
    data,
  };
}

export default useUser;
