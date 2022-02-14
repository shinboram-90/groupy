import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  //   return auth?.find((role) => allowedRoles?.includes(admin)) ? (
  //     <Outlet />
  //   ) : auth?.user ? (
  //     <Navigate to="/unauthorized" state={{ from: location }} replace />
  //   ) : (
  //     <Navigate to="/login" state={{ from: location }} replace />
  //   );
  // };

  return auth.role === 'admin' || auth.role === 'user' ? (
    <Outlet />
  ) : auth.role === 'user' ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
