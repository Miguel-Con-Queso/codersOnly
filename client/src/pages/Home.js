import React from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import FriendList from '../components/FriendList';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const posts = data?.posts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main className="container">
      <div className="flex-row justify-center justify-space-between-md align-stretch">
        <div className="col-12 col-md-3">
          <ul className="nav nav-pills flex column">
            <li className="nav-item">
              <Link to="/">
                <h1>Home</h1>
              </Link>

            </li>

            <li className="nav-item">
              <Link to="/">
                <h1>test</h1>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/">
                <h1>FriendsList</h1>
              </Link>
            </li>
          </ul>

          </div>
          <div className="col-12 col-md-9">
      <div >
        
        <div className={`${loggedIn}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              posts={posts}
              title="codersOnly Forum"
            />
          )}
        </div>
        {loggedIn && userData ? (
          
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
       
        ) : null}
        </div>
      </div>
      </div>
    </main>
  );
};

export default Home;
