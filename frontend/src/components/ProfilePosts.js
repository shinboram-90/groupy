import { Link } from 'react-router-dom';

const ProfilePosts = () => {
  return (
    <section>
      <h1>ProfilePosts Page</h1>
      <br />
      <p>Fetch ProfilePosts.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default ProfilePosts;
