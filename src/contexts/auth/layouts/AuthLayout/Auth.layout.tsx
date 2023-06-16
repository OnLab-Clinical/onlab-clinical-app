// react
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = memo(() => {
    return <Outlet />;
});

export default AuthLayout;
