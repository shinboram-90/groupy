import { Outlet, Link } from 'react-router-dom';

const LinkPage = () => {
  return (
    <>
      <section>
        <h1>Welcome to Groupomania</h1>
        <br />
        <p>In order to continue, please log in</p>
        <Link to="/login">Login</Link>
        <Link to="/signup">Register</Link>
        {/* <br />
      <h2>Private</h2>
      <Link to="/profile">My profile</Link>
      <Link to="/editor">Editors Page</Link>
      <Link to="/admin">Admin Page</Link> */}
      </section>
      <Outlet />
    </>
  );
};

export default LinkPage;
