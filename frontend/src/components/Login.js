import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/login';

const Login = () => {
  const { setAuth } = useAuth();

  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      username: data.username,
      password: data.password,
    };

    axios.post(LOGIN_URL, userData).then((response) => {
      console.log(response.data);
      console.log(response.data.user[0].role);
      setData({});
      const token = response.data.token;
      const role = response.data.user[0].role;
      setAuth({ role, token });
      navigate(from, { replace: true });
    });
  };

  return (
    <section>
      <h1>Login Account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="username">
          username
          <input
            type="text"
            name="username"
            value={data.username || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={data.password || ''}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};
export default Login;
