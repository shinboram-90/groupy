import 'semantic-ui-css/semantic.min.css';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import ProfilePosts from './ProfilePosts';
import ProfileComments from './ProfileComments';
import User from '../routes/user';
import Feed from './Feed';
import Post from './Post';
import Comments from './Comments';
import Admin from './Admin';
import Missing from './Missing';
import Unauthorized from './Unauthorized';
import Lounge from './Lounge';

import RequireAuth from './RequireAuth';
import { Routes, Route, Link } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useCookies } from 'react-cookie';
// import { Outlet, Link } from 'react-router-dom';

// const ROLES = {
//   'user': 1,
//   'admin': 2,
// };

export default function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const cookie = Cookies.get('user');
  // });

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* public routes */}
      {/* <Route path="login" element={<Login />} /> */}
      <Route path="signup" element={<Signup />} />

      <Route path="unauthorized" element={<Unauthorized />} />

      <Route element={<RequireAuth allowedRoles />}>
        <Route path="profile" element={<Profile />}>
          <Route path=":edit" element={<ProfileEdit />} />
          <Route path=":posts" element={<ProfilePosts />}>
            <Route path=":comments" element={<ProfileComments />} />
          </Route>
        </Route>
      </Route>

      <Route element={<RequireAuth allowedRoles="admin" />}>
        <Route path="feed" element={<Feed />}>
          <Route path=":id" element={<Post />}>
            {/* <Route path=":comments" element={<Comments />} /> */}
            <Route path=":comments" element={<Comments />} />
          </Route>
        </Route>
      </Route>

      <Route element={<RequireAuth allowedRoles="admin" />}>
        <Route path="admin" element={<Admin />} />
      </Route>

      <Route element={<RequireAuth allowedRoles="user" />}>
        <Route path="users" element={<Lounge />}>
          <Route path=":id" element={<User />} />
        </Route>
      </Route>

      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}
