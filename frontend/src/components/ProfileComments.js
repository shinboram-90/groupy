import { Link } from 'react-router-dom';

const ProfileComments = () => {
  return (
    <section>
      <h1>ProfileComments Page</h1>
      <br />
      <p>Fetch Profilecomments.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default ProfileComments;
