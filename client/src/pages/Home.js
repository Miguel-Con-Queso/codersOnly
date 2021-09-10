import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_COMMENTS } from "../utils/queries";
import CommentList from "../components/CommentList";
import { QUERY_COMMENTS, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import FriendList from "../components/FriendList";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_COMMENTS);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const comments = data?.comments || [];
  console.log(comments);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CommentList
              comments={comments}
              title="Some Feed for Comment(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
