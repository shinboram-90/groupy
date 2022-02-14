import { Link } from 'react-router-dom';

const ProfileEdit = () => {
  return (
    <section>
      <h1>ProfileEdit Page</h1>
      <br />
      <p>Fetch ProfileEdit.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default ProfileEdit;
