// src/components/RequireAuth.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { JSX } from 'react';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAppSelector((s) => s.auth.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
}
