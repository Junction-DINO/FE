import { createBrowserRouter, Outlet } from 'react-router-dom';
import RootErrorBoundary from '@/pages/common/components/RootErrorHandler';
import RootSuspense from '@/pages/common/components/RootSuspense';
import ErrorPage from '@/pages/error/components/ErrorPage';
import NotFoundPage from '@/pages/error/components/NotFoundPage';
import Home from '@/pages/home';

import { Toaster } from './components/ui/toaster';
import Example from './pages/exmaple';
import Example2 from './pages/example2';
import Login from './pages/login';
import ImageClassifier from './pages/camera';
import SearchResults from './pages/search/SearchResult';

const pageRoutes = {
  main: '/',
  example: '/example',
  example2: '/example2',
  login: '/login',
  camera: '/camera',
  search: '/search/:query',
};

const CommonLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Outlet />
      <Toaster />
    </RootSuspense>
  </RootErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.main, element: <Home />, errorElement: <ErrorPage /> },
      { path: pageRoutes.search, element: <SearchResults />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.example, element: <Example />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.example2, element: <Example2 />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.camera, element: <ImageClassifier />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.login, element: <Login />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
