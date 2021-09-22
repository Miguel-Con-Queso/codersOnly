import React from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import FriendList from '../components/FriendList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = (props) => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <div className="flex-row justify-center justify-space-between-md">
        <div className="navbar-left col-12 col-md-3">
          <ul className="nav nav-pills flex column">
            <li className="nav-item">
              <Link to="/Profile">
                <h1>{user.username}</h1>
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
            <h2 className="bg-dark text-secondary p-3 display-inline-block">
              {userParam ? `${user.username}'s` : `${user.username}`}
            </h2>

            {userParam && (
              <button className="btn ml-auto" onClick={handleClick}>
                Add Friend
              </button>
            )}
      
      <div className="ml-auto">{!userParam && <PostForm />}</div>
          <PostList
            posts={user.posts}
            title={`${user.username}'s Posts...`}
          />



          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />

          </div>
        </div>
      </div>
  );
};

export default Profile;
