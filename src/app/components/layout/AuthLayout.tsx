import { Outlet, Navigate } from 'react-router';
import { useApp } from '../../context/AppContext';

export function AuthLayout() {
  const { isAuthenticated, userRole } = useApp();

  if (isAuthenticated) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/broker'} replace />;
  }

  return <Outlet />;
}
