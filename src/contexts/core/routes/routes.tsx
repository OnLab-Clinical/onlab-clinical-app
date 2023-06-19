// react
import { createBrowserRouter } from 'react-router-dom';
// components
import Root from './Root';
import NotFound from './NotFound';
// routes
import { authRoutes } from '@/contexts/auth';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [authRoutes],
    },
]);
