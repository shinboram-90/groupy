import Register from './Register';
import Login from './Login';
import Home from './Home';
import Layout from './Layout';
import Editor from './Editor';
import Admin from './Admin';
import Missing from './Missing';
import Unauthorized from './Unauthorized';
import Lounge from './Lounge';
import LinkPage from './LinkPage';
import RequireAuth from './RequireAuth';
import { Routes, Route } from 'react-router-dom';
// import { Outlet, Link } from 'react-router-dom';

const ROLES = {
  'user': 1,
  'admin': 2,
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.dmin]} />}
        >
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
