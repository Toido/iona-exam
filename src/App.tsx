import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppProvider from './providers/AppProvider';
import PathConstants from './routes/pathConstants';
import { lazy } from 'react';
import Layout from './components/Layout/Layout';
import AlertProvider from './providers/AlertProvider';
import AlertComponent from './components/Alert/Alert';

const Home = lazy(() => import('./views/Home/Home'));
const Details = lazy(() => import('./views/Details/Details'));
const NotFound = lazy(() => import('./views/NotFound/NotFound'));

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
    errorElement: <NotFound />,
  },
]);

function App() {
  return (
    <AppProvider>
      <AlertProvider>
        <AlertComponent />
        <RouterProvider router={router} />
      </AlertProvider>
    </AppProvider>
  );
}

export default App;
