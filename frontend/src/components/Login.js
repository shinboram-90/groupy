import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
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
    sendDataToAPI();
  };

  const sendDataToAPI = () => {
    const userData = {
      ...data,
    };

    axios.post(LOGIN_URL, userData).then((response) => {
      setData({});
      const user = response.data.user[0];
      const token = response.data.token;
      const role = response.data.user[0].role;
      setAuth({ user, role, token });
      localStorage.setItem('token', token);
      // navigate(from, { replace: true });
      navigate('/profile');
    });
  };

  return (
    <section>
      <h1>WELCOME TO GROUPOMANIA</h1>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Username"
                placeholder="Username"
                type="text"
                name="username"
                value={data.username || ''}
                onChange={handleChange}
                required
              />

              <Form.Input
                icon="mail"
                iconPosition="left"
                label="Email"
                placeholder="Email"
                type="email"
                name="email"
                value={data.email || ''}
                onChange={handleChange}
                required
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Password"
                placeholder="Password"
                type="password"
                name="password"
                value={data.password || ''}
                onChange={handleChange}
                required
              />

              <Button content="Login" primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <button content="Sign up" icon="signup" size="big">
              <Link to="/signup">Sign Up</Link>
            </button>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>

      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
    </section>
  );
};

export default Login;
