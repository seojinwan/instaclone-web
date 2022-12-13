import React from "react";
import { isLoggedInVar } from "../apollo";
function Home(props) {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Log out now!</button>
    </div>
  );
}

export default Home;
