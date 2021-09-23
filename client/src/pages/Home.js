import React from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import FriendList from "../components/FriendList";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS, QUERY_ME_BASIC } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const posts = data?.posts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main className="container">
      <div className="flex-row justify-center justify-space-between-md">
        <div className="navbar-left col-12 col-md-3">
          <ul className="nav nav-pills flex column">
            <li className="nav-item">
              <Link to="/Profile">
                <h1>Profile</h1>
              </Link>
            </li>
            <li className="nav-item">
              <Link to=" <FriendList />">
                <h1>Forums</h1>
              </Link>
            </li>

            <li className="nav-item">
              <Link to=" <FriendList />">
                <h1>Friends</h1>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right col-12 col-md-9 p-4">
          <div>
          <PostForm />
            <div className={`${loggedIn}`}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <PostList posts={posts} title="codersOnly Forum" />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
