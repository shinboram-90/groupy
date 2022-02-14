import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import useAuth from '../hooks/useAuth';
import AuthContext from '../context/AuthProvider';

const Home = () => {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  //   function displayAvatar{
  // const avatar = auth.user.avatar;

  // if   (avatar === null) {
  // return ""
  // }
  //   }

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate('/');
  };

  return (
    <section>
      <Outlet />
      <h1>My Profile</h1>
      <br />
      <img src="../assets/rachel.png" alt="avatar" />
      <p>You are logged in as {auth.user.username}</p>
      <br />
      <Link to="/edit">Update my profile</Link>
      <br />
      <Link to="/feed">Feed</Link>
      <br />
      <Link to="/users">Users</Link>
      <br />

      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
