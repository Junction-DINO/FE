import { createBrowserRouter, Outlet } from 'react-router-dom';
import RootErrorBoundary from '@/pages/common/components/RootErrorHandler';
import RootSuspense from '@/pages/common/components/RootSuspense';
import ErrorPage from '@/pages/error/components/ErrorPage';
import NotFoundPage from '@/pages/error/components/NotFoundPage';
import Home from '@/pages/home';

import { Toaster } from './components/ui/toaster';
import Login from './pages/login';
import Join from './pages/join';
import ImageClassifier from './pages/camera';
import SearchResults from './pages/search/SearchResult';
import SearchDetail from './pages/SearchDetail';
import Redirect from './pages/redirect';
import Score from './pages/score';

const pageRoutes = {
  main: '/',
  redirect : '/redirect',
  example: '/example',
  example2: '/example2',
  login: '/login',
  join: '/join',
  camera: '/camera',
  search: '/search/:query',
  searchDetail: '/search/detail/:query',
  score : '/score'
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
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.redirect, element: <Redirect />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.join, element: <Join />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.searchDetail, element: <SearchDetail />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.score, element: <Score />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
