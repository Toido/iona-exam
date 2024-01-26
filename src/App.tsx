import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppProvider from './providers/AppProvider';
import PathConstants from './routes/pathConstants';
import { lazy } from 'react';
import Layout from './components/Layout/Layout';

const Home = lazy(() => import('./views/Home/Home'));
const Details = lazy(() => import('./views/Details/Details'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: PathConstants.HOME,
        element: <Home />,
      },
      {
        path: PathConstants.HOMEQUERY,
        element: <Home />,
      },
      {
        path: PathConstants.DETAILS,
        element: <Details />,
      },
    ],
  },
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
