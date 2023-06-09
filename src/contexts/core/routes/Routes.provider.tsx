// react
import { Suspense, memo } from 'react';
import { RouterProvider } from 'react-router-dom';
// routes
import { routes } from './routes';
// components
import Fallback from './Fallback';

const RoutesProvider = memo(() => {
    return (
        <Suspense fallback={<Fallback />}>
            <RouterProvider router={routes} />
        </Suspense>
    );
});

export default RoutesProvider;
