import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import "./styles/index.css";
import App from './components/App';
import Users from './routes/users';
import Dashboard from './routes/dashboard';
import Login from './routes/login';
import Signup from './routes/signup';
import User from './routes/user';
import NotFound from './routes/notFound';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<Users />}>
        <Route
          index
          element={
            <main style={{ padding: '1rem' }}>
              <p>Select a user</p>
            </main>
          }
        />
        <Route path=":id" element={<User />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
