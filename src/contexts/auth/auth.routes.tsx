// react
import { RouteObject } from 'react-router-dom';
// layouts
import { AuthLayout } from './layouts';
// views
import { SignInView, SignUpView } from './views';

export const authRoutes: RouteObject = {
    path: '/auth',
    element: <AuthLayout />,
    children: [
        {
            path: 'sign-in',
            element: <SignInView />,
        },
        {
            path: 'sign-up',
            element: <SignUpView />,
        },
    ],
};
