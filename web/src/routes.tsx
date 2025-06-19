import { lazy } from 'react';

const WebLayout = lazy(() => import('./components/templates/WebLayout'));
const AppLayout = lazy(() => import('./components/templates/AppLayout'));
const AuthLayout = lazy(() => import('./components/templates/AuthLayout'));

const HomePage = lazy(() => import('./pages/web/Home'));
const PricingPage = lazy(() => import('./pages/web/Pricing'));
const DocsPage = lazy(() => import('./pages/web/Docs'));

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

const Dashboard = lazy(() => import('./pages/app/Dashboard'));

export const getRoutes = () => [
  {
    path: "/",
    element: <WebLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "docs", element: <DocsPage /> }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ]
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [

      {path: "resume/templates", element: <Dashboard />},
      {path: "resume/list", element: <Dashboard />},
      {path: "resume/edit/:id", element: <Dashboard />},
      {path: "resume/preview/:id", element: <Dashboard />},
    ]
  }
]