import { Outlet, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Post = () => {
  const params = useParams();
  const id = params.id;
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = () => {
      axios
        .get(`/posts/${id}`)
        .then((response) => {
          console.log(response.data.post[0]);
          setPost(response.data.post[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPost();
  }, [id]);

  return (
    <section>
      <h1>Post Page</h1>
      <br />
      <p>{post.content}</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
      <hr />

      <Outlet />
    </section>
  );
};

export default Post;
