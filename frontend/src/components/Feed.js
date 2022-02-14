import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useLocation, NavLink } from 'react-router-dom';
import Post from '../components/Post';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  function QueryNavLink({ to, ...props }) {
    let location = useLocation();
    return <NavLink to={to + location.search} {...props} />;
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get('/posts')
      .then((response) => {
        console.log(response.data.postList);
        setPosts(response.data.postList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <h2>Posts list</h2>
      <br />
      <p>All the gossip happening here.</p>
      <div style={{ display: 'flex' }}>
        <nav
          style={{
            padding: '1rem',
          }}
        ></nav>

        <ul>
          {posts.map(
            ({ title, id, content, created_at, updated_at, status }) => (
              <li key={id}>
                <Link to={`/feed/${id}`}>{title}</Link>
                <p>{content}</p>
                <span>{created_at}</span>
                <br />
                <span>{updated_at}</span>
                <br />
                <span>
                  <small>{status}</small>
                </span>
                <p>likes:</p>
                <p>Author:</p>
                <p>Number of comments</p>
              </li>
            )
          )}
        </ul>

        <hr />

        <Outlet />
        {/* <Routes>
        <Route path=":postId/*" element={<Post />} />
      </Routes> */}
      </div>
    </section>
  );
};

export default Feed;
