import { Link } from 'react-router-dom';

const Comments = () => {
  return (
    <section>
      <h1>Comments Page</h1>
      <br />
      <p>Fetch comments.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Comments;
