// react
import { createBrowserRouter } from 'react-router-dom';
// routes
import Root from './Root';
import { authRoutes } from '@/contexts/auth';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [authRoutes],
    },
]);
