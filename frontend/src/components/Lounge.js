import { Link } from 'react-router-dom';
import Users from '../routes/users';
import { Routes, Route } from 'react-router-dom';
import User from '../routes/user';

const Lounge = () => {
  return (
    <section>
      <h1>The Lounge</h1>
      <br />
      <Users />
      {/* <Routes>
        <Route path=":id" element={<User />} />
      </Routes> */}
      <p>Admins and Editors can hang out here.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Lounge;
