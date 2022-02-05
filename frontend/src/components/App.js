import Banner from './Banner';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Banner />
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/users">Users</Link> | <Link to="/login">Login</Link>{' '}
        <Link to="/signup">Signup</Link>
      </nav>
      <Outlet />
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}
