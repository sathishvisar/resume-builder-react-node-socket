import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// layouts
const WebLayout = lazy(() => import('./components/templates/WebLayout'));
const AuthLayout = lazy(() => import('./components/templates/AuthLayout'));
const AppLayout = lazy(() => import('./components/templates/AppLayout'));

// web pages
const HomePage = lazy(() => import('./pages/web/Home'));
const AboutUsPage = lazy(() => import('./pages/web/About'));
const DocsPage = lazy(() => import('./pages/web/Docs'));

// auth pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

// dashboard pages
const Dashboard = lazy(() => import('./pages/app/Dashboard'));
const Resumes = lazy(() => import('./pages/app/Resumes'));
const Resume = lazy(() => import('./pages/app/Resume'));


export const getRoutes = () => [
  {
    path: "/",
    element: <WebLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "contact", element: <AboutUsPage /> },
      { path: "about-us", element: <AboutUsPage /> },
      { path: "docs", element: <DocsPage /> },
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace />},
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ]
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace />},
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'resumes', element: <Resumes /> },
      {path: "resume/templates", element: <Resume />},
      {path: "resume/list", element: <Resume />},
      {path: "resume/edit/:id", element: <Resume />},
      {path: "resume/preview/:id", element: <Resume />},
    ]
  }
]